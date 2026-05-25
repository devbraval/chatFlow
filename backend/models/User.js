const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    userId:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
        lowercase:true,
    },
    name:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        default:null,
    },
    otpExpiry:{
        type:String,
        default:null,
    },
    resetTocken:{
        type:String,
        default:null,
    },
    resetTockenExpiry:{
        type:String,
        default:null,
    }

},{timeStamps:true});

module.exports = mongoose.model("User",userSchema);