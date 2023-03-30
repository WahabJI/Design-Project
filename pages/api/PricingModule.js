import connectMongo from "../../database/conn.js";
import History from "../../model/historySchema";
import userSchema from "../../model/schema";

export default async function handler(req, res) {
    if(req.method === "GET"){
        //grab data that was passed as query parameters in the url
        const { deliveryDate, gallonsRequested } = req.query;

        //calculate the price based on some data from the database later but for now just hardcode it
        //randomized price for now until last assignment
        const pricePerGallon = (Math.random()*7 + 1);
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

        const { email, deliveryDate, gallonsRequested, pricePerGallon, totalAmountDue } = req.body;

        //create the newQuote data object
        const newQuoteData = {
            deliveryDate: deliveryDate,
            address1: "5098 Jacksonville Rd",
            address2: "Apartment 1960",
            city: "Houston",
            state: "TX",
            zipCode: "77034",
            gallonsRequested: gallonsRequested,
            pricePerGallon: pricePerGallon,
            totalAmountDue: totalAmountDue
        }
        console.log(totalAmountDue)

        //connect to the database
        connectMongo().catch(err => console.log(err));

        //find the user in the user database and retrieve the user's address and other information
        //replace this later with the profile page schema
        const user = await userSchema.findOne({
            email: email
        })
        if(!user){
            return res.status(404).json({message: "User not found"})
        }

        //find the user in the database
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
        res.status(405).json({message: "Method not allowed"})
    }
}