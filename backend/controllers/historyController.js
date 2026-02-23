import ChatHistory from '../models/chatHistoryModel.js';

// Save chat message to history
const saveChatMessage = async (req, res) => {
    const { sessionId, message, response, title } = req.body;
    const userId = req.body.userId;

    try {
        if (!sessionId || !message) {
            return res.status(400).json({
                success: false,
                message: "Session ID and message are required"
            });
        }

        let chatHistory = await ChatHistory.findOne({ 
            sessionId, 
            user: userId 
        });

        if (!chatHistory) {
            // Create new chat session
            chatHistory = new ChatHistory({
                user: userId,
                sessionId: sessionId,
                title: title || message.substring(0, 50) + (message.length > 50 ? '...' : ''),
                messages: []
            });
        }

        // Add user message
        chatHistory.messages.push({
            role: 'user',
            content: message
        });

        // Add AI response if provided
        if (response) {
            chatHistory.messages.push({
                role: 'assistant',
                content: response
            });
        }

        await chatHistory.save();

        res.json({
            success: true,
            message: "Chat saved successfully",
            sessionId: chatHistory.sessionId,
            title: chatHistory.title
        });

    } catch (error) {
        console.error("Error in saveChatMessage:", error);
        res.status(500).json({
            success: false,
            message: "Error saving chat history"
        });
    }
};

// Get all chat sessions for user
const getUserChatSessions = async (req, res) => {
    const userId = req.body.userId;

    try {
        const sessions = await ChatHistory.getUserSessions(userId);

        const formattedSessions = sessions.map(session => {
            const messageCount = session.messages.length;
            const lastMessage = messageCount > 0 ? 
                session.messages[messageCount - 1] : null;

            return {
                sessionId: session.sessionId,
                title: session.title,
                createdAt: session.createdAt,
                updatedAt: session.updatedAt,
                messageCount: messageCount,
                lastMessage: lastMessage ? {
                    content: lastMessage.content.substring(0, 100) + 
                            (lastMessage.content.length > 100 ? '...' : ''),
                    role: lastMessage.role,
                    timestamp: lastMessage.timestamp
                } : null
            };
        });

        res.json({
            success: true,
            message: "Chat sessions retrieved successfully",
            sessions: formattedSessions,
            totalSessions: formattedSessions.length
        });

    } catch (error) {
        console.error("Error in getUserChatSessions:", error);
        res.status(500).json({
            success: false,
            message: "Error retrieving chat sessions"
        });
    }
};

// Get specific chat session with all messages
const getChatSession = async (req, res) => {
    const { sessionId } = req.params;
    const userId = req.body.userId;

    try {
        const session = await ChatHistory.getSession(sessionId, userId);

        if (!session) {
            return res.status(404).json({
                success: false,
                message: "Chat session not found"
            });
        }

        res.json({
            success: true,
            message: "Chat session retrieved successfully",
            session: {
                sessionId: session.sessionId,
                title: session.title,
                createdAt: session.createdAt,
                updatedAt: session.updatedAt,
                messages: session.messages.map(msg => ({
                    role: msg.role,
                    content: msg.content,
                    timestamp: msg.timestamp
                }))
            }
        });

    } catch (error) {
        console.error("Error in getChatSession:", error);
        res.status(500).json({
            success: false,
            message: "Error retrieving chat session"
        });
    }
};

// Update chat session title
const updateSessionTitle = async (req, res) => {
    const { sessionId } = req.params;
    const { title } = req.body;
    const userId = req.body.userId;

    try {
        if (!title || title.trim() === '') {
            return res.status(400).json({
                success: false,
                message: "Title is required"
            });
        }

        const session = await ChatHistory.findOneAndUpdate(
            { sessionId, user: userId },
            { title: title.trim() },
            { new: true }
        );

        if (!session) {
            return res.status(404).json({
                success: false,
                message: "Chat session not found"
            });
        }

        res.json({
            success: true,
            message: "Session title updated successfully",
            title: session.title
        });

    } catch (error) {
        console.error("Error in updateSessionTitle:", error);
        res.status(500).json({
            success: false,
            message: "Error updating session title"
        });
    }
};

// Delete chat session (soft delete)
const deleteChatSession = async (req, res) => {
    const { sessionId } = req.params;
    const userId = req.body.userId;

    try {
        const session = await ChatHistory.findOneAndUpdate(
            { sessionId, user: userId },
            { isActive: false },
            { new: true }
        );

        if (!session) {
            return res.status(404).json({
                success: false,
                message: "Chat session not found"
            });
        }

        res.json({
            success: true,
            message: "Chat session deleted successfully"
        });

    } catch (error) {
        console.error("Error in deleteChatSession:", error);
        res.status(500).json({
            success: false,
            message: "Error deleting chat session"
        });
    }
};

// Clear all chat history for user
const clearAllChatHistory = async (req, res) => {
    const userId = req.body.userId;

    try {
        await ChatHistory.updateMany(
            { user: userId },
            { isActive: false }
        );

        res.json({
            success: true,
            message: "All chat history cleared successfully"
        });

    } catch (error) {
        console.error("Error in clearAllChatHistory:", error);
        res.status(500).json({
            success: false,
            message: "Error clearing chat history"
        });
    }
};

export {
    saveChatMessage,
    getUserChatSessions,
    getChatSession,
    updateSessionTitle,
    deleteChatSession,
    clearAllChatHistory
};