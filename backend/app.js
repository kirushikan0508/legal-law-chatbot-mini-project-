import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import chatRouter from "./routes/chatRoute.js";
import historyRouter from "./routes/historyRoute.js";
import adminRouter from "./routes/adminRoute.js";
import documentRouter from "./routes/documentRoute.js";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables
dotenv.config();

// app config
const app = express();
const port = process.env.PORT || 4000;

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// db connection
connectDB();

// Create uploads directory if it doesn't exist
import fs from 'fs';
const uploadDir = path.join(__dirname, 'uploads', 'documents');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log("Created uploads directory:", uploadDir);
}

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);
app.use("/api/history", historyRouter);
app.use("/api/admin", adminRouter);
app.use("/api/document", documentRouter);

app.get("/", (req, res) => {
  res.send("Legal Chatbot Backend is running!");
});

app.listen(port, () => {
  console.log(`✅ Server started on http://localhost:${port}`);
});