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
        // const { firstName, lastName, address1, address2, city, state, zipCode } = req.body;
        //we should technically now be checking our connection to some database and then updating the user's data
        // but for now we'll just log the data to the console to see the changes as the data in the backend is not persistent
        if(req.body.firstName == null || req.body.lastName == null || req.body.address1 == null || req.body.address2 == null || req.body.city == null || req.body.state == null || req.body.zipCode == null || req.body.firstName.length == 0 || req.body.lastName.length == 0 || req.body.address1.length == 0 || req.body.address2.length == 0 || req.body.city.length == 0 || req.body.state.length == 0 || req.body.zipCode.length == 0){
            throw new Error("Please fill out all fields")
        }
        
        if(req.body.firstName.length > 20 || req.body.lastName.length > 20 || req.body.address1.length > 50 || req.body.address2.length > 50 || req.body.city.length > 20 || req.body.state.length > 20 || req.body.zipCode.length > 10){
            throw new Error("Please enter valid data")
        }

        console.log(req.body)
        res.status(200).json({message: "Profile Updated"})
    }
}