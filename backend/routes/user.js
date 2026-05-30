import express, { json } from "express";
import User from "../models/User";
import errorHandler from "../utils/errorHandler";
import otp from "../utils/otp";
import sendOtp from "../utils/sendOtp";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();
router.post("/sign-up",errorHandler(async(req,res)=>{
    const {email,name,password} = req.body;
    if(!email || !name || !password){
        return res.status(400).json({
            success:false,
            message:"All filed are required",
        });
    }
    const existedUser = await User.findOne({email});
    if(existedUser){
        return res.status(400).json({
            success:false,
            message:"The User is already registered",
        });
    }
    const otpToSend = otp();
    await sendOtp(email,otpToSend);
    const hasedPass = await bcrypt.hash(password,10);
    const hasedOtp = await bcrypt.hash(otpToSend,10);
   
    
    const user = await User.create({
        email,
        name,
        password:hasedPass,
        otp:hasedOtp,
        otpExpiry:Date.now()+5*60*1000,
    });
    const token = await jwt.sign({
        id:user._id,
        email:user.id,
    },
    process.env.JWT_SECRET,
    {expiresIn:process.env.JWT_EXPIRY },
);

    return res.status(200).json({
        success:true,
        message:"User Siginnedin Successfully",
        userId:user._id,
        token:token,
    });

}));

router.post("/login",errorHandler(async(req,res)=>{
    const{email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({
            success:false,
            message:"All fildes are required",
        });
    }
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({
            success:false,
            message:"The user is Not Registerd",
        });

    }
    const isMatched  = await bcrypt.compare(password,user.password);
    if(!isMatched){
        return res.status(400).json({
            success:false,
            message:"Password is incorrect",
        });
    }

    const otpTosend = otp();
    await sendOtp(email,otpTosend);
    const hashedOtp = await bcrypt.hash(otpTosend,10);

    user.otp=hashedOtp;
    user.otpExpiry = Date.now()+5*60*1000;
    await user.save();
    const token = await jwt.sign({
        id:user._id,
        email:user.email,
    },
    process.env.JWT_SECRET,
    {expiresIn:process.env.JWT_EXPIRY },
);
    return res.status(200).json({
        success:true,
        message:"Logged in successfully",
        userId = user._id,
        token=token,
    });

}));

