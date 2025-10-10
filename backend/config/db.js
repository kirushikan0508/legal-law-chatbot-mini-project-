//use for cannective database and write logic here
import mongoose from "mongoose";

export const connectDB =async () =>{
    try{
        (await mongoose.connect('mongodb+srv://legalchatbot:uie7egk7gfQqwTa1@cluster0.sdvkvcl.mongodb.net/legal-chatbot'));
        console.log("DB connected");
    } catch(err){
        console.error("DB connection failed",err.message);
        process.exit(1);
    }
}
