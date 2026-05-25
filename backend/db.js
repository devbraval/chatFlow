import mongoose from "mongoose";

const connectDb = async()=>{
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/chatFlow');
        console.log("Connected Successfully");
    }catch(err){
        console.log(err.message || "Db not connected");
        process.exit();
    }
}

export default connectDb;