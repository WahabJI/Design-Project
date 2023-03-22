

export default function getQuoteHistory(req, res) {
    
    //conn to database
    //check if user
    //find user data
    const Data = [
        //add email to check for whose data it is
        { date: '2022-01-01', gallons: 100, pricePerGallon: 2.50, totalCost: 250 },
        { date: '2022-02-01', gallons: 200, pricePerGallon: 2.75, totalCost: 550 },
        { date: '2022-03-01', gallons: 150, pricePerGallon: 3.00, totalCost: 450 },
    ]
    //respond sending data to frontend
    res.status(200).json(Data)
}