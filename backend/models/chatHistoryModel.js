import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ['user', 'assistant'],
        required: true
    },
    content: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const chatHistorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        index: true
    },
    sessionId: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
        default: "New Chat"
    },
    messages: [messageSchema],
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update updatedAt before saving
chatHistorySchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    
    // Generate title from first user message if not set
    if (this.title === "New Chat" && this.messages.length > 0) {
        const firstUserMessage = this.messages.find(msg => msg.role === 'user');
        if (firstUserMessage) {
            this.title = firstUserMessage.content.substring(0, 50) + 
                        (firstUserMessage.content.length > 50 ? '...' : '');
        }
    }
    next();
});

// Static method to get user's chat sessions - ORDER BY LATEST FIRST
chatHistorySchema.statics.getUserSessions = function(userId) {
    return this.find({ user: userId, isActive: true })
        .select('sessionId title createdAt updatedAt messages')
        .sort({ updatedAt: -1 }); // -1 for descending order (newest first)
};

// Static method to get specific session
chatHistorySchema.statics.getSession = function(sessionId, userId) {
    return this.findOne({ sessionId, user: userId, isActive: true });
};

const ChatHistory = mongoose.models.chathistory || mongoose.model("chathistory", chatHistorySchema);
export default ChatHistory;