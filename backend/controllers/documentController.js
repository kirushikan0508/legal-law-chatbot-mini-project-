import Document from "../models/documentModel.js";
import axios from "axios";

const TEMPLATE_GENERATOR_URL =
  process.env.TEMPLATE_GENERATOR_URL || "http://localhost:8081";

// Generate document using AI
const generateDocument = async (req, res) => {
  const { agreementType, userDetails, userId } = req.body;

  try {
    if (!agreementType || !userDetails) {
      return res.status(400).json({
        success: false,
        message: "Agreement type and user details are required",
      });
    }

    // Call Python template generator service
    const response = await axios.post(`${TEMPLATE_GENERATOR_URL}/generate`, {
      agreement_type: agreementType,
      user_details: userDetails,
      user_id: userId,
    });

    const { document_content, document_title } = response.data;

    // Save to database
    const savedDocument = new Document({
      user: userId,
      agreementType,
      documentTitle: document_title,
      documentContent: document_content,
      metadata: userDetails,
      generatedAt: new Date(),
    });

    await savedDocument.save();

    res.json({
      success: true,
      message: "Document generated successfully",
      document: document_content,
      documentId: savedDocument._id,
      title: document_title,
      generatedAt: savedDocument.generatedAt,
    });
  } catch (error) {
    console.error("Error in generateDocument:", error.message);

    if (error.code === "ECONNREFUSED") {
      return res.status(503).json({
        success: false,
        message: "Document generation service is unavailable",
      });
    }

    if (error.response) {
      return res.status(error.response.status).json({
        success: false,
        message: error.response.data.message || "Document generation failed",
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error during document generation",
    });
  }
};

// Convert document to PDF
const convertToPDF = async (req, res) => {
  const { content, agreementType, metadata } = req.body;

  try {
    const response = await axios.post(
      `${TEMPLATE_GENERATOR_URL}/convert-pdf`,
      {
        content,
        agreement_type: agreementType,
        metadata,
      },
      {
        responseType: "arraybuffer",
      }
    );

    // Set headers for PDF download
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${agreementType.replace(/\s+/g, "_")}.pdf"`
    );

    // Send PDF buffer
    res.send(response.data);
  } catch (error) {
    console.error("Error converting to PDF:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to convert document to PDF",
    });
  }
};

// Convert document to DOCX
const convertToDOCX = async (req, res) => {
  const { content, agreementType } = req.body;

  try {
    const response = await axios.post(
      `${TEMPLATE_GENERATOR_URL}/convert-docx`,
      {
        content,
        agreement_type: agreementType,
      },
      {
        responseType: "arraybuffer",
      }
    );

    // Set headers for DOCX download
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${agreementType.replace(/\s+/g, "_")}.docx"`
    );

    // Send DOCX buffer
    res.send(response.data);
  } catch (error) {
    console.error("Error converting to DOCX:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to convert document to DOCX",
    });
  }
};

// Get user's document history
const getUserDocuments = async (req, res) => {
  const userId = req.body.userId;

  try {
    const documents = await Document.find({
      user: userId,
      isActive: true,
    })
      .select("agreementType documentTitle generatedAt downloads")
      .sort({ generatedAt: -1 })
      .limit(50);

    res.json({
      success: true,
      message: "Documents retrieved successfully",
      documents: documents.map((doc) => ({
        id: doc._id,
        agreementType: doc.agreementType,
        title: doc.documentTitle,
        generatedAt: doc.generatedAt,
        downloads: doc.downloads,
      })),
      total: documents.length,
    });
  } catch (error) {
    console.error("Error in getUserDocuments:", error);
    res.status(500).json({
      success: false,
      message: "Error retrieving documents",
    });
  }
};

// Get specific document
const getDocument = async (req, res) => {
  const { documentId } = req.params;
  const userId = req.body.userId;

  try {
    const document = await Document.findOne({
      _id: documentId,
      user: userId,
      isActive: true,
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    // Increment download count
    document.downloads += 1;
    document.lastDownloaded = new Date();
    await document.save();

    res.json({
      success: true,
      message: "Document retrieved successfully",
      document: {
        id: document._id,
        agreementType: document.agreementType,
        title: document.documentTitle,
        content: document.documentContent,
        metadata: document.metadata,
        generatedAt: document.generatedAt,
        downloads: document.downloads,
      },
    });
  } catch (error) {
    console.error("Error in getDocument:", error);
    res.status(500).json({
      success: false,
      message: "Error retrieving document",
    });
  }
};

// Delete document
const deleteDocument = async (req, res) => {
  const { documentId } = req.params;
  const userId = req.body.userId;

  try {
    const document = await Document.findOneAndUpdate(
      { _id: documentId, user: userId },
      { isActive: false },
      { new: true }
    );

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    res.json({
      success: true,
      message: "Document deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteDocument:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting document",
    });
  }
};

export {
  generateDocument,
  convertToPDF,
  convertToDOCX,
  getUserDocuments,
  getDocument,
  deleteDocument,
};
