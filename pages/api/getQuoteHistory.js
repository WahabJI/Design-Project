import connectMongo from "../../database/conn.js";
import History from "../../model/historySchema";
import { getSession } from "next-auth/react";

export default async function getQuoteHistory(req, res) {
    //get session
    const session = await getSession({ req });
    //conn to database
    if(!session){
        return res.status(401).json({message: "Unauthorized"})
    }
    await connectMongo().catch(err => console.log(err));
    //find user data
    const result = await History.findOne({
        email: session.user.email,
    })
    // console.log(result.quoteHistory)
    //respond sending data to frontend
    res.status(200).json(result.quoteHistory)
}