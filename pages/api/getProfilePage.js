import connectMongo from "../../database/conn.js";
import Profile from "../../model/profileSchema";
import { getSession } from "next-auth/react";

export default async function getProfilePage(req, res) {
    const session = await getSession({ req });
    //conn to database
    await connectMongo().catch(err => console.log(err));
    //find user data
    const result = await Profile.findOne({
        email: session.user.email,
    })
    //respond sending data to frontend
    res.status(200).json(result)
}