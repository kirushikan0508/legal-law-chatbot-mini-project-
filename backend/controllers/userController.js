import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User doesn't exist" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        // Create token and send response
        const token = createToken(user._id);
        res.json({
            success: true,
            token,
            message: "Login successful",
            user: { id: user._id, name: user.name, email: user.email }
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error during login" });
    }
}

// Create JWT token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

// Register user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        // Validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        // Checking the password length 
        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters long" });
        }

        // Optional: Add more password validation
        if (!validator.isStrongPassword(password)) {
            return res.json({ 
                success: false, 
                message: "Please enter a stronger password (include uppercase, lowercase, number, and symbol)" 
            });
        }

        // Hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new userModel({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password: hashedPassword
        });

        // Save the new user in database
        const user = await newUser.save();
        const token = createToken(user._id);
        
        res.json({
            success: true,
            token,
            message: "User registered successfully",
            user: { id: user._id, name: user.name, email: user.email }
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error during registration" });
    }
}

export { loginUser, registerUser };