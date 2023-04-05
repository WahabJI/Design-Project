import connectMongo from "../../database/conn.js";
import userSchema from "../../model/schema.js";
import { hash } from "bcryptjs";

export default async function handler(req, res) {
    

    //add the POST to create a new user in the databse
    if (req.method == "POST") {
        connectMongo().catch(err => console.error(err));
        if(Object.keys(req.body).length === 0){
            return res.status(404).json({message: "No data sent"})
        }
        const {email, password, confirmedPassword} = req.body;
        //CHECK IF DATA IS VALID


        //check for duplicate users
        const check = await userSchema.findOne({email: email});
        if(check){
            return res.status(422).json({message: "User already exists"})
        }

        //add user to database
        const hashedPassword = await hash(password, 12);
        const add = await userSchema.create({
            email: email,
            password: hashedPassword,
            profileSet: false
        })
        res.status(200).json({message: "User created", user: add})
    }   
    else{
        return res.status(405).json({message: "Method Not Allowed"})
    }
}