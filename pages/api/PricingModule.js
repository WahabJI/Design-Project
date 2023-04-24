import connectMongo from "../../database/conn.js";
import History from "../../model/historySchema";
import userSchema from "../../model/schema";
import Profile from "../../model/profileSchema.js";
import { SessionContext, getSession } from "next-auth/react";

export default async function handler(req, res) {
    if(req.method === "GET"){
        //get session
        const session = await getSession({ req });

        //grab data that was passed as query parameters in the url
        const { deliveryDate, gallonsRequested } = req.query;

        //calculate the price based on some data from the database later but for now just hardcode it
        //randomized price for now until last assignment
        const basePricePerGallon = 1.5;
        let loc_factor; //2% for inside texas and 4% for outside texas(EX; .02*1.50 applies to these three variables below)
        let hist_factor; //1%if client requested fuel before, 0% if no history
        let gallons_req_factor; //2% of price if more than 1000 galllons, 3% for less than a thousand
        const comp_prof_factor = .10;
        const result = await History.findOne({
            email: session.user.email
        })

        const user = await Profile.findOne({
            email: session.user.email
        })
        if (user.state === 'TX'){
            loc_factor = .02;
        }
        else{
            loc_factor = .04;
        }
        // if (!result), lets swap over to something like this to account for when a user is first making their quote
        if (!result){
            hist_factor = .01;
        }
        else{
            hist_factor = 0;
        }

        if (gallonsRequested > 1000){
            gallons_req_factor=.02;
        }
        else{
            gallons_req_factor=.03;
        }

        let Margin= basePricePerGallon * (loc_factor - hist_factor + gallons_req_factor + comp_prof_factor);
        let pricePerGallon = basePricePerGallon + Margin;


        // console.log(result.quoteHistory.length)
        // console.log(user)
        // const pricePerGallon = some math
        const totalAmountDue = pricePerGallon * gallonsRequested;

        //send the data back to the frontend
        res.status(200).json({pricePerGallon: pricePerGallon, totalAmountDue: totalAmountDue})
    }
    else if(req.method === "POST"){
        //grab data that was sent from the frontend as part of the request body
        //This data should include the user's email, delivery date, gallons requested, price per gallons, and total amount due.
        //use the email to find the user in the database and grab all the other data from the database
        //then create a new entry to the quote history collection in the database
        //figure out how Im going to store the quote history in the database for later use on the quoteHistory page.

        // grab data from the request body
        const { email, deliveryDate, gallonsRequested, pricePerGallon, totalAmountDue } = req.body;

        //check if the user exists in the database
        const user = await userSchema.findOne({
            email: email
        })
        if(!user){
            return res.status(404).json({message: "User not found"})
        }

        // find the user in the user database and retrieve the user's address and other information
        const userData = await Profile.findOne({
            email: email
        })

        //create the newQuote data object
        const newQuoteData = {
            deliveryDate: deliveryDate,
            address1: userData.address1,
            address2: userData.address2 || "-",
            city: userData.city,
            state: userData.state,
            zipCode: userData.zipCode,
            gallonsRequested: gallonsRequested,
            pricePerGallon: pricePerGallon,
            totalAmountDue: totalAmountDue
        }

        //connect to the database
        connectMongo().catch(err => console.log(err));

        //find the user in the user database and retrieve the user's address and other information
        //replace this later with the profile page schema
        

        //find the user in the history database
        const result = await History.findOne({
            email: email
        })
        if(!result){
            // create a new entry into the collection
            await History.create({
                email: email,
                //add the quote history array with the new quote data that is turned into JSON
                quoteHistory: newQuoteData
            })
            res.status(200).json({message: "Quote history created"})
        }
        else{
            //update the entry in the collection

            await History.findOneAndUpdate(
                { email: email },
                { $push : { quoteHistory: newQuoteData } },
                { new: true }
              )
              .exec()
            .then((updatedHistory) => {
            res.status(200).json({ message: "Quote history updated" });
            })
            .catch((err) => {
            console.error(err);
            res.status(500).json({ message: "Server error" });
            });
        }


    }
    else{
        res.status(405).json({message: "Method Not Allowed"})
    }
}