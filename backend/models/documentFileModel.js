import mongoose from "mongoose";

const documentFileSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  originalFilename: {
    type: String,
    required: true
  },
  storageFilename: {
    type: String,
    required: true,
    unique: true
  },
  fileSize: {
    type: Number,
    required: true
  },
  mimeType: {
    type: String,
    required: true
  },
  uploadedBy: {
    type: String, // Changed from ObjectId to String to accept 'admin'
    required: true,
    default: 'admin'
  },
  uploadedByType: {
    type: String,
    enum: ['user', 'admin'],
    default: 'admin'
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  },
  pineconeStatus: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed'],
    default: 'pending'
  },
  vectorId: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

// Indexes for faster queries
documentFileSchema.index({ uploadedBy: 1, uploadedAt: -1 });
documentFileSchema.index({ pineconeStatus: 1 });
documentFileSchema.index({ isActive: 1 });

const DocumentFile = mongoose.models.documentfile || mongoose.model("documentfile", documentFileSchema);
export default DocumentFile;