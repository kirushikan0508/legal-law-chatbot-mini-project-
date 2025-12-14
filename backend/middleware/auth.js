import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.json({ success: false, message: "Not Authorized. Login Again." });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    
    // Initialize req.body if it's undefined (for GET requests)
    if (!req.body) {
      req.body = {};
    }
    
    req.body.userId = token_decode.id;
    req.body.userType = token_decode.userType || 'user'; // Add user type
    
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Token verification failed" });
  }

};

  // Separate middleware for admin-only routes
const adminMiddleware = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.json({ success: false, message: "Not Authorized. Login Again." });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if user is admin
    if (token_decode.userType !== 'admin') {
      return res.json({ success: false, message: "Access denied. Admin only." });
    }
    
    if (!req.body) {
      req.body = {};
    }
    
    req.body.userId = token_decode.id;
    req.body.userType = 'admin';
    
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Token verification failed" });
  }
};



export default authMiddleware;
export { adminMiddleware };