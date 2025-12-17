import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
  const token = req.headers.token || req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ success: false, message: "Not Authorized. Login Again." });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    
    // Initialize req.body if it's undefined
    if (!req.body) {
      req.body = {};
    }
    
    req.body.userId = token_decode.id;
    req.body.userType = token_decode.userType || 'user';
    
    next();
  } catch (error) {
    console.log("Token verification failed:", error.message);
    res.status(401).json({ success: false, message: "Token verification failed" });
  }
};

// Separate middleware for admin-only routes
const adminMiddleware = async (req, res, next) => {
  const token = req.headers.token || req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ success: false, message: "Not Authorized. Login Again." });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if user is admin
    if (token_decode.userType !== 'admin') {
      return res.status(403).json({ success: false, message: "Access denied. Admin only." });
    }
    
    // Initialize req.body if it's undefined
    if (!req.body) {
      req.body = {};
    }
    
    // Set admin credentials
    req.body.userId = 'admin';
    req.body.userType = 'admin';
    
    next();
  } catch (error) {
    console.log("Admin token verification failed:", error.message);
    res.status(401).json({ success: false, message: "Token verification failed" });
  }
};

export default authMiddleware;
export { adminMiddleware };