import express from "express";
import dotenv from "dotenv";
import connectDb from "./db";
import { Router } from "express";
import userRoute from "./routes/user";
dotenv.config();

const app = express();
const port = process.env.PORT;

connectDb();

app.use(express.json());

app.use("/user",userRoute);

app.use((err,req,res,next)=>{
    const statuscode = err.statuscode || 500;
    res.status(statuscode).json({
        success:false,
        message:err.message || "Server Error",
    });
});

app.listen(port,()=>{
    console.log(`The server is listing on port ${port}`);
})