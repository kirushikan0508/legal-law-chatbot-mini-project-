import mongoose from "mongoose";

const adminStatSchema = new mongoose.Schema({
  totalUsers: {
    type: Number,
    default: 0
  },
  totalDocuments: {
    type: Number,
    default: 0
  },
  totalTemplates: {
    type: Number,
    default: 13
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

const AdminStat = mongoose.models.AdminStat || mongoose.model("AdminStat", adminStatSchema);
export default AdminStat;