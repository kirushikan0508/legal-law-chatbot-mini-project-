import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

// Admin credentials (in production, store in database)
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@gmail.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

// Admin login
const adminLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if admin credentials match
        if (email !== ADMIN_EMAIL) {
            return res.json({ 
                success: false, 
                message: "Invalid admin credentials" 
            });
        }

        // Compare password (in production, use hashed password from database)
        const isMatch = (password === ADMIN_PASSWORD);
        
        if (!isMatch) {
            return res.json({ 
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
        res.json({ 
            success: false, 
            message: "Error during admin login" 
        });
    }
}

// Get admin dashboard data
const getAdminStats = async (req, res) => {
    try {
        // This is a placeholder - implement actual admin statistics
        res.json({
            success: true,
            stats: {
                totalUsers: 0,
                activeChats: 0,
                documentsGenerated: 0,
                recentActivity: []
            }
        });
    } catch (error) {
        console.log(error);
        res.json({ 
            success: false, 
            message: "Error fetching admin stats" 
        });
    }
}

export { adminLogin, getAdminStats };