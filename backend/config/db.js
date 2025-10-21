import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://legalchatbot:uie7egk7gfQqwTa1@cluster0.sdvkvcl.mongodb.net/legal-chatbot');
        console.log("DB connected");
    } catch(err) {
        console.error("DB connection failed", err.message);
        process.exit(1);
    }
}