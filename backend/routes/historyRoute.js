import express from "express";
import {
    saveChatMessage,
    getUserChatSessions,
    getChatSession,
    updateSessionTitle,
    deleteChatSession,
    clearAllChatHistory
} from "../controllers/historyController.js";
import authMiddleware from "../middleware/auth.js";

const historyRouter = express.Router();

// Protect all history routes with authentication
historyRouter.use(authMiddleware);

// Routes
historyRouter.post("/save", saveChatMessage); // Save chat message
historyRouter.get("/sessions", getUserChatSessions); // Get all user sessions
historyRouter.get("/session/:sessionId", getChatSession); // Get specific session
historyRouter.put("/session/:sessionId/title", updateSessionTitle); // Update session title
historyRouter.delete("/session/:sessionId", deleteChatSession); // Delete specific session
historyRouter.delete("/clear-all", clearAllChatHistory); // Clear all history

export default historyRouter;