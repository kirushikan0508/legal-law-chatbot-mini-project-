import axios from 'axios';

// Service URL - adjust port if different
const SERVICE_URL = process.env.SERVICE_URL || 'http://localhost:8080';

const chatWithAI = async (req, res) => {
    const { message } = req.body;
    const { userId } = req.body; // From auth middleware

    try {
        // Validate input
        if (!message || message.trim() === '') {
            return res.status(400).json({
                success: false,
                message: "Message is required"
            });
        }

        // Send request to Python service
        const formData = new URLSearchParams();
        formData.append('msg', message.trim());

        const response = await axios.post(`${SERVICE_URL}/get`, formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            timeout: 30000 // 30 seconds timeout
        });

        // Return the AI response
        res.json({
            success: true,
            message: "Response generated successfully",
            response: response.data,
            userMessage: message
        });

    } catch (error) {
        console.error("Error in chatWithAI:", error.message);

        // Handle different types of errors
        if (error.code === 'ECONNREFUSED') {
            return res.status(503).json({
                success: false,
                message: "AI service is currently unavailable. Please try again later."
            });
        }

        if (error.response) {
            // Service returned an error
            return res.status(error.response.status).json({
                success: false,
                message: "AI service error",
                error: error.response.data
            });
        }

        if (error.request) {
            // Request was made but no response received
            return res.status(504).json({
                success: false,
                message: "No response from AI service. Please try again."
            });
        }

        // Other errors
        res.status(500).json({
            success: false,
            message: "Internal server error during chat processing"
        });
    }
};

// Optional: Get chat history
const getChatHistory = async (req, res) => {
    const { userId } = req.body;

    try {
        res.json({
            success: true,
            message: "Chat history retrieved successfully",
            history: []
        });
    } catch (error) {
        console.error("Error in getChatHistory:", error);
        res.status(500).json({
            success: false,
            message: "Error retrieving chat history"
        });
    }
};

export { chatWithAI, getChatHistory };