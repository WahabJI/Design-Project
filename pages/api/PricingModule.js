import connectMongo from "../../database/conn.js";
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

    }
    else{
        res.status(405).json({message: "Method not allowed"})
    }
}