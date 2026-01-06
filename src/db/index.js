import mongoose from "mongoose"

const connectDB = async (mongoURL) => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("connected to db successfully");
    }
    catch(error){
        console.log("error while connecting to db", error);
        process.exit(1)
    }
}

export default connectDB;