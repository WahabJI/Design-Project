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
}