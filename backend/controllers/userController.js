import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

//login user
const loginUser = async (req, res) =>{

}

//create JWT token
const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//register user
const registerUser =async (req,res) =>{
    try{
        //checking is user already exists
        const exists = await userModel.findOne({email});
        if (exists){
            return res.json({success:false,message:"user already exist"})
        }

        // validating email formate and strong password
        if (!validator.isEmail(email)) {
            return res.json({success:false,message:"please enter valid email"})
        }

        //checking the password lenth 
        if (password.length<8){
            return res.json({success:false,message:"please enter strong password"})
        }

        //hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        //new users
        const newUser = new userModel({
            name,
            email,
            password:hashedPassword
        })

        

    }catch (error){
        console.log(error)
        res.json({success:false,message:"Error"})
    }

}
export {loginUser,registerUser};