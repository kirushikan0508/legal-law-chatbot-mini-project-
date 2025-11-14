import express from "express";
import { chatWithAI, getChatHistory } from "../controllers/chatController.js";
import authMiddleware from "../middleware/auth.js";

const chatRouter = express.Router();

// Protect all chat routes with authentication
chatRouter.use(authMiddleware);

// Routes
chatRouter.post("/chat", chatWithAI);
chatRouter.get("/history", getChatHistory);

export default chatRouter;