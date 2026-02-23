import DocumentFile from '../models/documentFileModel.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import userModel from '../models/userModel.js';

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/documents/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

// File filter for allowed types
const fileFilter = (req, file, cb) => {
  const allowedTypes = /pdf|doc|docx|txt/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Only PDF, DOC, DOCX, and TXT files are allowed'));
  }
};

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limit
  }
}).single('document');

// Upload document file
export const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded"
      });
    }

    const { title } = req.body;
    const userId = req.body.userId || 'admin'; // Default to admin if not set
    const userType = req.body.userType || 'admin';

    console.log("DEBUG - Uploading document:", {
      title,
      userId,
      userType,
      filename: req.file.originalname,
      fileSize: req.file.size
    });

    if (!title || !title.trim()) {
      // Delete uploaded file if title is missing
      fs.unlinkSync(req.file.path);
      return res.status(400).json({
        success: false,
        message: "Document title is required"
      });
    }

    // Create document file record
    const documentFile = new DocumentFile({
      title: title.trim(),
      originalFilename: req.file.originalname,
      storageFilename: req.file.filename,
      fileSize: req.file.size,
      mimeType: req.file.mimetype,
      uploadedBy: userId,
      uploadedByType: userType,
      pineconeStatus: 'completed' // Auto-complete for admin uploads
    });

    await documentFile.save();
    console.log("Document saved successfully:", documentFile._id);

    res.json({
      success: true,
      message: "Document uploaded successfully",
      document: {
        id: documentFile._id,
        title: documentFile.title,
        filename: documentFile.originalFilename,
        fileSize: documentFile.fileSize,
        uploadedAt: documentFile.uploadedAt,
        status: documentFile.pineconeStatus,
        uploadedByType: documentFile.uploadedByType
      }
    });

  } catch (error) {
    console.error("Error in uploadDocument:", error);
    
    // Clean up uploaded file if error occurred
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      success: false,
      message: "Error uploading document",
      error: error.message
    });
  }
};

// Get all uploaded documents
export const getAllDocuments = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const status = req.query.status;
    const userType = req.body.userType || 'admin';

    let query = { isActive: true };
    if (status) {
      query.pineconeStatus = status;
    }

    // If not admin, only show user's documents
    if (userType !== 'admin') {
      query.uploadedBy = req.body.userId;
    }

    const documents = await DocumentFile.find(query)
      .select('title originalFilename fileSize mimeType uploadedAt pineconeStatus uploadedBy uploadedByType')
      .sort({ uploadedAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalDocuments = await DocumentFile.countDocuments(query);

    res.json({
      success: true,
      documents,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalDocuments / limit),
        totalDocuments,
        hasNextPage: page * limit < totalDocuments,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    console.error("Error in getAllDocuments:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching documents"
    });
  }
};

// Get specific document
export const getDocumentById = async (req, res) => {
  const { documentId } = req.params;

  try {
    const document = await DocumentFile.findById(documentId);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found"
      });
    }

    res.json({
      success: true,
      document
    });
  } catch (error) {
    console.error("Error in getDocumentById:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching document"
    });
  }
};

// Delete document
export const deleteDocumentFile = async (req, res) => {
  const { documentId } = req.params;
  const userId = req.body.userId;
  const userType = req.body.userType || 'admin';

  try {
    const document = await DocumentFile.findById(documentId);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found"
      });
    }

    // Check permission (admin can delete any, users only their own)
    if (userType !== 'admin' && document.uploadedBy.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this document"
      });
    }

    // Delete physical file
    const filePath = `uploads/documents/${document.storageFilename}`;
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Soft delete from database
    document.isActive = false;
    await document.save();

    res.json({
      success: true,
      message: "Document deleted successfully"
    });
  } catch (error) {
    console.error("Error in deleteDocumentFile:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting document"
    });
  }
};

// Update document status
export const updateDocumentStatus = async (req, res) => {
  const { documentId, status, vectorId, error } = req.body;

  try {
    const updateData = {
      pineconeStatus: status,
      isProcessed: status === 'completed'
    };

    if (vectorId) {
      updateData.vectorId = vectorId;
    }

    const document = await DocumentFile.findByIdAndUpdate(
      documentId,
      updateData,
      { new: true }
    );

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found"
      });
    }

    res.json({
      success: true,
      message: "Document status updated"
    });
  } catch (error) {
    console.error("Error in updateDocumentStatus:", error);
    res.status(500).json({
      success: false,
      message: "Error updating document status"
    });
  }
};

// Get document statistics
export const getDocumentStats = async (req, res) => {
  try {
    const total = await DocumentFile.countDocuments({ isActive: true });
    const byStatus = await DocumentFile.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: "$pineconeStatus", count: { $sum: 1 } } }
    ]);
    
    const byType = await DocumentFile.aggregate([
      { $match: { isActive: true } },
      { 
        $group: { 
          _id: { $arrayElemAt: [{ $split: ["$mimeType", "/"] }, 1] },
          count: { $sum: 1 } 
        } 
      }
    ]);

    const recentUploads = await DocumentFile.countDocuments({
      isActive: true,
      uploadedAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
    });

    res.json({
      success: true,
      stats: {
        total,
        byStatus: byStatus.reduce((acc, curr) => {
          acc[curr._id] = curr.count;
          return acc;
        }, {}),
        byType: byType.reduce((acc, curr) => {
          acc[curr._id] = curr.count;
          return acc;
        }, {}),
        recentUploads
      }
    });
  } catch (error) {
    console.error("Error in getDocumentStats:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching document statistics"
    });
  }
};