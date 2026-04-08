import express from "express";
import { 
  adminLogin, 
  getAdminStats, 
  getAllUsers, 
  deleteUser 
} from "../controllers/adminController.js";
import { 
  uploadDocument, 
  getAllDocuments, 
  getDocumentById, 
  deleteDocumentFile,
  getDocumentStats,
  updateDocumentStatus,
  upload
} from "../controllers/documentUploadController.js";
import { adminMiddleware } from "../middleware/auth.js";

const adminRouter = express.Router();

// Public admin login route
adminRouter.post("/login", adminLogin);

// Protected admin routes
adminRouter.use(adminMiddleware);

// Dashboard stats
adminRouter.get("/stats", getAdminStats);

// User management
adminRouter.get("/users", getAllUsers);
adminRouter.delete("/users/:userId", deleteUser);

// Document management
adminRouter.post("/documents/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }
    uploadDocument(req, res);
  });
});

adminRouter.get("/documents", getAllDocuments);
adminRouter.get("/documents/stats", getDocumentStats);
adminRouter.get("/documents/:documentId", getDocumentById);
adminRouter.delete("/documents/:documentId", deleteDocumentFile);

// Internal endpoint for processing service
adminRouter.post("/documents/update-status", updateDocumentStatus);

export default adminRouter;