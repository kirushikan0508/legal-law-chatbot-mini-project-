import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import userModel from "../models/userModel.js";
import DocumentFile from "../models/documentFileModel.js";
import AdminStat from "../models/adminModel.js";

// Admin credentials
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@gmail.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

// Admin login
const adminLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if admin credentials match
        if (email !== ADMIN_EMAIL) {
            return res.status(401).json({ 
                success: false, 
                message: "Invalid admin credentials" 
            });
        }

        // Compare password
        const isMatch = (password === ADMIN_PASSWORD);
        
        if (!isMatch) {
            return res.status(401).json({ 
                success: false, 
                message: "Invalid admin credentials" 
            });
        }

        // Create admin token with userType
        const token = jwt.sign(
            { 
                id: 'admin',
                email: ADMIN_EMAIL,
                userType: 'admin' 
            }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1d' }
        );

        res.json({
            success: true,
            token,
            message: "Admin login successful",
            user: { 
                email: ADMIN_EMAIL, 
                name: "Administrator",
                role: "admin" 
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            success: false, 
            message: "Error during admin login" 
        });
    }
}

// Get admin dashboard statistics
const getAdminStats = async (req, res) => {
    try {
        // Get total users
        const totalUsers = await userModel.countDocuments();
        
        // Get total uploaded documents
        const totalDocuments = await DocumentFile.countDocuments({ isActive: true });
        
        // Total templates (fixed for now)
        const totalTemplates = 13;
        
        // Get recent uploaded documents
        const recentDocuments = await DocumentFile.find({ isActive: true })
            .sort({ uploadedAt: -1 })
            .limit(5)
            .select('title originalFilename fileSize uploadedAt pineconeStatus');
        
        // Get recent users
        const recentUsers = await userModel.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select('name email createdAt');

        res.json({
            success: true,
            stats: {
                totalUsers,
                totalTemplates,
                totalDocuments,
                recentDocuments,
                recentUsers,
                documentsByStatus: {
                    pending: await DocumentFile.countDocuments({ pineconeStatus: 'pending', isActive: true }),
                    processing: await DocumentFile.countDocuments({ pineconeStatus: 'processing', isActive: true }),
                    completed: await DocumentFile.countDocuments({ pineconeStatus: 'completed', isActive: true }),
                    failed: await DocumentFile.countDocuments({ pineconeStatus: 'failed', isActive: true })
                }
            }
        });
    } catch (error) {
        console.error("Error in getAdminStats:", error);
        res.status(500).json({ 
            success: false, 
            message: "Error fetching admin stats" 
        });
    }
}

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const users = await userModel.find()
            .select('name email createdAt')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const totalUsers = await userModel.countDocuments();

        res.json({
            success: true,
            users,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalUsers / limit),
                totalUsers,
                hasNextPage: page * limit < totalUsers,
                hasPrevPage: page > 1
            }
        });
    } catch (error) {
        console.error("Error in getAllUsers:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching users"
        });
    }
}

// Delete user (admin only)
const deleteUser = async (req, res) => {
    const { userId } = req.params;

    try {
        // Prevent admin from deleting themselves
        if (userId === 'admin') {
            return res.status(400).json({
                success: false,
                message: "Cannot delete admin user"
            });
        }

        const user = await userModel.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.json({
            success: true,
            message: "User deleted successfully"
        });
    } catch (error) {
        console.error("Error in deleteUser:", error);
        res.status(500).json({
            success: false,
            message: "Error deleting user"
        });
    }
}

export { adminLogin, getAdminStats, getAllUsers, deleteUser };