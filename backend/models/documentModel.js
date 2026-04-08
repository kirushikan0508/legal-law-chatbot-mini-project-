import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      index: true,
    },
    agreementType: {
      type: String,
      required: true,
    },
    documentTitle: {
      type: String,
      required: true,
    },
    documentContent: {
      type: String,
      required: true,
    },
    metadata: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      default: {},
    },
    generatedAt: {
      type: Date,
      default: Date.now,
    },
    downloads: {
      type: Number,
      default: 0,
    },
    lastDownloaded: {
      type: Date,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
documentSchema.index({ user: 1, generatedAt: -1 });
documentSchema.index({ agreementType: 1 });

const Document =
  mongoose.models.document || mongoose.model("document", documentSchema);
export default Document;
