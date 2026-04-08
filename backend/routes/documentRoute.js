import express from "express";
import {
  generateDocument,
  convertToPDF,
  convertToDOCX,
  getUserDocuments,
  getDocument,
  deleteDocument,
} from "../controllers/documentController.js";
import authMiddleware from "../middleware/auth.js";

const documentRouter = express.Router();

// Protect all document routes with authentication
documentRouter.use(authMiddleware);

// Routes
documentRouter.post("/generate", generateDocument); // Generate document
documentRouter.post("/convert-pdf", convertToPDF); // Convert to PDF
documentRouter.post("/convert-docx", convertToDOCX); // Convert to DOCX
documentRouter.get("/history", getUserDocuments); // Get user's document history
documentRouter.get("/:documentId", getDocument); // Get specific document
documentRouter.delete("/:documentId", deleteDocument); // Delete document

export default documentRouter;
