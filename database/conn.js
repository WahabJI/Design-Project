import mongoose from "mongoose";

const connectMongo = async () => {
    try{
        const {connection} = await mongoose.connect(process.env.MONGO_URI);
        if(connection.readyState == 1){
            console.log("Connected to MongoDB");
            return Promise.resolve(true);
        }
    }catch(err){
        console.log(err);
        return Promise.reject(err);
    }
}

export default connectMongo;