import connectMongo from "../../database/conn.js";
import Profile from "../../model/profileSchema";
import { getSession } from "next-auth/react";

export default async function getProfilePage(req, res) {
    const session = await getSession({ req });
    //conn to database
    await connectMongo().catch(err => console.log(err));

    // If the user is not logged in, we send an unauthorized response
    if(!session){
        return res.status(401).json({message: "Unauthorized"})
    }

    //find user data
    const result = await Profile.findOne({
        email: session.user.email,
    })

    if(req.method === "GET"){
        // For when the front end requests user data, we respond with the user data in JSON format as a response to the GET request
        // Response sending data to frontend
        res.status(200).json(result)
    }
    else if (req.method === "POST"){
        // For when the front end is sending the user data, we update the user data in the database
        // We grab the information from the request body
        const { firstName, lastName, address1, address2, city, state, zipCode } = req.body;

        // Find and update user data based on email.
        // We first need to check if the user has any data in the database previously. If they do, we update the data. If they don't, we create a new document for them.
        if(result === null){
            // If the user doesn't have any data in the database, we create a new document for them using the create command 
            const result = await Profile.create({
                email: session.user.email,
                firstName: firstName,
                lastName: lastName,
                address1: address1,
                address2: address2,
                city: city,
                state: state,
                zipCode: zipCode
            })
            // It returns a promise from where we just send a response to the front end with the new user created and a message saying that the profile was created
            .then((newProfile) => {
                res.status(200).json({ message: "Profile created", newProfile: newProfile });
            })
            // This is just in case there is an error
            .catch((err) => {
                console.error(err);
                res.status(500).json({ message: "Server error" });
            });
        }
        else{
            // if the user already has data in the database, we update the data using the findOneAndUpdate command
            const result = await Profile.findOneAndUpdate(
                { email: session.user.email },
                {
                    firstName: firstName,
                    lastName: lastName,
                    address1: address1,
                    address2: address2,
                    city: city,
                    state: state,
                    zipCode: zipCode
                },
                { new: true }
            )
            .exec() // This is needed to return a promise and execute the command
            // It returns a promise from where we just send a response to the front end with the new user created and a message saying that the profile was created
            .then((updatedProfile) => {
                res.status(200).json({ message: "Profile updated", updatedProfile: updatedProfile });
            })
            // This is just in case there is an error
            .catch((err) => {
                console.error(err);
                res.status(500).json({ message: "Server error" });
            });
        }

    }
    else{
        // If the request method is not GET or POST, we send a bad request response
        res.status(400).json({message: "Bad Request"})
    }
}