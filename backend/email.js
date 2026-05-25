import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const transpoter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASS,

    },
});

transpoter.verify((error)=>{
    if(error){
        console.log("Mail tranpoter error: ",error.message);
    }else{
        console.log("Mail transpoter is ready");
    }
});

export default transpoter;