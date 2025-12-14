import express from "express";
import { adminLogin, getAdminStats } from "../controllers/adminController.js";
import { adminMiddleware } from "../middleware/auth.js";

const adminRouter = express.Router();

// Public admin login route
adminRouter.post("/login", adminLogin);

// Protected admin routes
adminRouter.use(adminMiddleware);
adminRouter.get("/stats",adminMiddleware, getAdminStats);

export default adminRouter;