export default function getProfilePage(req, res) {

    //conn to database
    //check if user
    //find user data
    let Data = {
        firstName: "Joe", lastName: "Shmoe", address1: "5098 Jacksonville Rd",
        address2: "Apartment 1960", city: "Houston", state: "TX", zipCode: "77034"
    }
    //respond sending data to frontend
    if (req.method === "GET") {
        res.status(200).json(Data)
    }
    else if(req.method === "POST"){
        //update user data by getting updated user data from the frontend
        const { firstName, lastName, address1, address2, city, state, zipCode } = req.body;
        //we should technically now be checking our connection to some database and then updating the user's data
        // but for now we'll just log the data to the console to see the changes as the data in the backend is not persistent
        console.log(req.body)
        res.status(200).json({message: "Profile Updated"})
    }
}