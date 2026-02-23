import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = "http://localhost:4000";
  const templateGeneratorUrl = "http://localhost:8081";
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // --- Admin Login ---
  const adminLogin = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post(`${url}/api/admin/login`, {
        email,
        password,
      });
      const data = response.data;

      if (data.success) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem("token", data.token);
        localStorage.setItem("loggedInUser", JSON.stringify(data.user));
      }

      return data;
    } catch (error) {
      console.error(
        "Admin login failed:",
        error.response?.data || error.message
      );
      return (
        error.response?.data || {
          success: false,
          message: "Network error or server unavailable",
        }
      );
    } finally {
      setLoading(false);
    }
  };

  // --- Register User ---
  const registerUser = async (name, email, password) => {
    setLoading(true);
    try {
      const response = await axios.post(`${url}/api/user/register`, {
        name,
        email,
        password,
      });
      const data = response.data;

      if (data.success) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem("token", data.token);
        localStorage.setItem("loggedInUser", JSON.stringify(data.user));
      }

      return data;
    } catch (error) {
      console.error("Register failed:", error.response?.data || error.message);
      return (
        error.response?.data || {
          success: false,
          message: "Network error or server unavailable",
        }
      );
    } finally {
      setLoading(false);
    }
  };

  // --- Login User ---
  const loginUser = async (email, password) => {
    setLoading(true);
    try {
      // Check if it's admin login
      if (email === "admin@gmail.com" || email === "admin") {
        return await adminLogin(email, password);
      }

      // Regular user login
      const response = await axios.post(`${url}/api/user/login`, {
        email,
        password,
      });
      const data = response.data;

      if (data.success) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem("token", data.token);
        localStorage.setItem("loggedInUser", JSON.stringify(data.user));
      }

      return data;
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      return (
        error.response?.data || {
          success: false,
          message: "Network error or server unavailable",
        }
      );
    } finally {
      setLoading(false);
    }
  };

  // --- Check if user is admin ---
  const isAdmin = () => {
    if (!user) return false;
    return user.role === "admin" || user.email === "admin@gmail.com";
  };

  // --- Chat with AI ---
  const sendChatMessage = async (message, sessionId = null) => {
    if (!token) {
      return {
        success: false,
        message: "Please login to chat with AI",
      };
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${url}/api/chat/chat`,
        { message, sessionId },
        {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Chat failed:", error.response?.data || error.message);
      return (
        error.response?.data || {
          success: false,
          message: "Failed to connect to AI service",
        }
      );
    } finally {
      setLoading(false);
    }
  };

  // --- CHAT HISTORY FUNCTIONS ---

  // Save chat message to history
  const saveChatHistory = async (
    sessionId,
    userMessage,
    aiResponse,
    title = null
  ) => {
    if (!token)
      return { success: false, message: "Please login to save chat history" };

    try {
      const response = await axios.post(
        `${url}/api/history/save`,
        {
          sessionId,
          message: userMessage,
          response: aiResponse,
          title,
        },
        {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Save history failed:",
        error.response?.data || error.message
      );
      return (
        error.response?.data || {
          success: false,
          message: "Failed to save chat history",
        }
      );
    }
  };

  // Get user's chat sessions
  const getChatSessions = async () => {
    if (!token)
      return { success: false, message: "Please login to get chat history" };

    try {
      const response = await axios.get(`${url}/api/history/sessions`, {
        headers: {
          token: token,
        },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Get sessions failed:",
        error.response?.data || error.message
      );
      return (
        error.response?.data || {
          success: false,
          message: "Failed to load chat sessions",
        }
      );
    }
  };

  // Get specific chat session with messages
  const getChatSession = async (sessionId) => {
    if (!token)
      return { success: false, message: "Please login to get chat session" };

    try {
      const response = await axios.get(
        `${url}/api/history/session/${sessionId}`,
        {
          headers: {
            token: token,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Get session failed:",
        error.response?.data || error.message
      );
      return (
        error.response?.data || {
          success: false,
          message: "Failed to load chat session",
        }
      );
    }
  };

  // Update session title
  const updateSessionTitle = async (sessionId, title) => {
    if (!token)
      return { success: false, message: "Please login to update title" };

    try {
      const response = await axios.put(
        `${url}/api/history/session/${sessionId}/title`,
        { title },
        {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Update title failed:",
        error.response?.data || error.message
      );
      return (
        error.response?.data || {
          success: false,
          message: "Failed to update title",
        }
      );
    }
  };

  // Delete chat session
  const deleteChatSession = async (sessionId) => {
    if (!token)
      return { success: false, message: "Please login to delete chat" };

    try {
      const response = await axios.delete(
        `${url}/api/history/session/${sessionId}`,
        {
          headers: {
            token: token,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Delete session failed:",
        error.response?.data || error.message
      );
      return (
        error.response?.data || {
          success: false,
          message: "Failed to delete chat session",
        }
      );
    }
  };

  // --- ADMIN FUNCTIONS ---

  // Get admin dashboard statistics
  const getAdminStats = async () => {
    if (!token) {
      return {
        success: false,
        message: "Please login to access admin panel",
      };
    }

    try {
      const response = await axios.get(`${url}/api/admin/stats`, {
        headers: {
          token: token,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Get admin stats failed:", error.response?.data || error.message);
      return (
        error.response?.data || {
          success: false,
          message: "Failed to load admin statistics",
        }
      );
    }
  };

  // Get all users (admin only)
  const getAllUsers = async (page = 1, limit = 10) => {
    if (!token) {
      return {
        success: false,
        message: "Please login to access admin panel",
      };
    }

    try {
      const response = await axios.get(
        `${url}/api/admin/users?page=${page}&limit=${limit}`,
        {
          headers: {
            token: token,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Get all users failed:", error.response?.data || error.message);
      return (
        error.response?.data || {
          success: false,
          message: "Failed to load users",
        }
      );
    }
  };

  // Delete user (admin only)
  const deleteUser = async (userId) => {
    if (!token) {
      return {
        success: false,
        message: "Please login to access admin panel",
      };
    }

    try {
      const response = await axios.delete(`${url}/api/admin/users/${userId}`, {
        headers: {
          token: token,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Delete user failed:", error.response?.data || error.message);
      return (
        error.response?.data || {
          success: false,
          message: "Failed to delete user",
        }
      );
    }
  };

  // Upload document as admin
  const uploadAdminDocument = async (title, file) => {
    if (!token) {
      return {
        success: false,
        message: "Please login to upload documents",
      };
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("document", file);

      const response = await axios.post(
        `${url}/api/admin/documents/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: token,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Upload document failed:", error.response?.data || error.message);
      return (
        error.response?.data || {
          success: false,
          message: "Failed to upload document",
        }
      );
    } finally {
      setLoading(false);
    }
  };

  // Get all uploaded documents (admin only)
  const getAdminDocuments = async (page = 1, limit = 10, status = "") => {
    if (!token) {
      return {
        success: false,
        message: "Please login to access documents",
      };
    }

    try {
      let apiUrl = `${url}/api/admin/documents?page=${page}&limit=${limit}`;
      if (status) {
        apiUrl += `&status=${status}`;
      }

      const response = await axios.get(apiUrl, {
        headers: {
          token: token,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Get admin documents failed:", error.response?.data || error.message);
      return (
        error.response?.data || {
          success: false,
          message: "Failed to load documents",
        }
      );
    }
  };

  // Get document statistics (admin only)
  const getDocumentStats = async () => {
    if (!token) {
      return {
        success: false,
        message: "Please login to access document statistics",
      };
    }

    try {
      const response = await axios.get(`${url}/api/admin/documents/stats`, {
        headers: {
          token: token,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Get document stats failed:", error.response?.data || error.message);
      return (
        error.response?.data || {
          success: false,
          message: "Failed to load document statistics",
        }
      );
    }
  };

  // Delete document (admin only)
  const deleteAdminDocument = async (documentId) => {
    if (!token) {
      return {
        success: false,
        message: "Please login to delete documents",
      };
    }

    try {
      const response = await axios.delete(
        `${url}/api/admin/documents/${documentId}`,
        {
          headers: {
            token: token,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Delete document failed:", error.response?.data || error.message);
      return (
        error.response?.data || {
          success: false,
          message: "Failed to delete document",
        }
      );
    }
  };

  // --- DOCUMENT GENERATION FUNCTIONS ---

  // Generate legal document
  const generateDocument = async (agreementType, userDetails) => {
    if (!token) {
      return {
        success: false,
        message: "Please login to generate documents",
      };
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${templateGeneratorUrl}/generate`,
        {
          agreement_type: agreementType,
          user_details: userDetails,
          user_id: user?.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        return response.data;
      } else {
        return {
          success: false,
          message: response.data.error || "Failed to generate document",
        };
      }
    } catch (error) {
      console.error("Document generation failed:", error.message);
      return {
        success: false,
        message:
          "Failed to connect to document generation service. Make sure the Python template generator is running on port 8081.",
      };
    } finally {
      setLoading(false);
    }
  };

  // Convert document to PDF
  const convertToPDF = async (content, agreementType, metadata = {}) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${templateGeneratorUrl}/convert-pdf`,
        {
          content,
          agreement_type: agreementType,
          metadata,
        },
        {
          responseType: "blob", // Important for file download
        }
      );

      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `${agreementType.replace(/\s+/g, "_")}_${Date.now()}.pdf`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      return { success: true, message: "PDF downloaded successfully" };
    } catch (error) {
      console.error("PDF conversion failed:", error.message);
      return {
        success: false,
        message:
          "Failed to generate PDF. Make sure the template generator is running.",
      };
    } finally {
      setLoading(false);
    }
  };

  // Convert document to DOCX
  const convertToDOCX = async (content, agreementType) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${templateGeneratorUrl}/convert-docx`,
        {
          content,
          agreement_type: agreementType,
        },
        {
          responseType: "blob",
        }
      );

      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `${agreementType.replace(/\s+/g, "_")}_${Date.now()}.docx`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      return { success: true, message: "DOCX downloaded successfully" };
    } catch (error) {
      console.error("DOCX conversion failed:", error.message);
      return {
        success: false,
        message:
          "Failed to generate DOCX. Make sure the template generator is running.",
      };
    } finally {
      setLoading(false);
    }
  };

  // Get user's document history from backend
  const getDocumentHistory = async () => {
    if (!token) {
      return {
        success: false,
        message: "Please login to view document history",
      };
    }

    try {
      const response = await axios.get(`${url}/api/document/history`, {
        headers: {
          token: token,
        },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Get document history failed:",
        error.response?.data || error.message
      );
      return (
        error.response?.data || {
          success: false,
          message: "Failed to load document history",
        }
      );
    }
  };

  // Get specific document from backend
  const getDocument = async (documentId) => {
    if (!token) {
      return {
        success: false,
        message: "Please login to view document",
      };
    }

    try {
      const response = await axios.get(`${url}/api/document/${documentId}`, {
        headers: {
          token: token,
        },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Get document failed:",
        error.response?.data || error.message
      );
      return (
        error.response?.data || {
          success: false,
          message: "Failed to load document",
        }
      );
    }
  };

  // Delete document
  const deleteDocument = async (documentId) => {
    if (!token) {
      return {
        success: false,
        message: "Please login to delete document",
      };
    }

    try {
      const response = await axios.delete(`${url}/api/document/${documentId}`, {
        headers: {
          token: token,
        },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Delete document failed:",
        error.response?.data || error.message
      );
      return (
        error.response?.data || {
          success: false,
          message: "Failed to delete document",
        }
      );
    }
  };

  // --- Get Agreement Templates (for frontend forms) ---
  const getAgreementTemplates = () => {
    return [
      "Employment Contract",
      "Termination Letter",
      "Non-Disclosure Agreement",
      "Bill Of Sale",
      "Service Agreement",
      "Asset Purchase Agreement",
      "Business Contract",
      "Car Rental Agreement",
      "Collaboration Agreement",
      "Commission Agreement",
      "Confidentiality Statement",
      "Contract",
      "Consignment Agreement",
    ];
  };

  // --- Get Form Fields for Agreement Type ---
  const getFormFieldsForAgreement = (agreementType) => {
    const formTemplates = {
      "Employment Contract": [
        {
          name: "employeeName",
          label: "Employee Name",
          type: "text",
          required: true,
        },
        {
          name: "employerName",
          label: "Employer Name",
          type: "text",
          required: true,
        },
        {
          name: "employeeAddress",
          label: "Employee Address",
          type: "text",
          required: true,
        },
        {
          name: "employerAddress",
          label: "Employer Address",
          type: "text",
          required: true,
        },
        { name: "jobTitle", label: "Job Title", type: "text", required: true },
        {
          name: "startDate",
          label: "Start Date",
          type: "date",
          required: true,
        },
        {
          name: "salary",
          label: "Monthly Salary (LKR)",
          type: "number",
          required: true,
        },
        {
          name: "probationPeriod",
          label: "Probation Period (months)",
          type: "number",
          default: 3,
        },
        {
          name: "workHours",
          label: "Weekly Work Hours",
          type: "number",
          default: 45,
        },
        {
          name: "noticePeriod",
          label: "Notice Period (days)",
          type: "number",
          default: 30,
        },
        {
          name: "annualLeave",
          label: "Annual Leave Days",
          type: "number",
          default: 14,
        },
        { name: "jobDescription", label: "Job Description", type: "textarea" },
      ],
      "Termination Letter": [
        {
          name: "employeeName",
          label: "Employee Name",
          type: "text",
          required: true,
        },
        {
          name: "employeeAddress",
          label: "Employee Address",
          type: "text",
          required: true,
        },
        {
          name: "companyName",
          label: "Company Name",
          type: "text",
          required: true,
        },
        {
          name: "terminationDate",
          label: "Termination Date",
          type: "date",
          required: true,
        },
        {
          name: "lastWorkingDay",
          label: "Last Working Day",
          type: "date",
          required: true,
        },
        {
          name: "reason",
          label: "Reason for Termination",
          type: "textarea",
          required: true,
        },
        { name: "referenceNumber", label: "Reference Number", type: "text" },
        { name: "settlementDate", label: "Settlement Date", type: "date" },
        { name: "handoverPerson", label: "Handover Person", type: "text" },
        {
          name: "authorizedSignatory",
          label: "Authorized Signatory",
          type: "text",
        },
      ],
      "Non-Disclosure Agreement": [
        {
          name: "disclosingParty",
          label: "Disclosing Party",
          type: "text",
          required: true,
        },
        {
          name: "receivingParty",
          label: "Receiving Party",
          type: "text",
          required: true,
        },
        {
          name: "disclosingAddress",
          label: "Disclosing Party Address",
          type: "text",
          required: true,
        },
        {
          name: "receivingAddress",
          label: "Receiving Party Address",
          type: "text",
          required: true,
        },
        {
          name: "purpose",
          label: "Purpose of Disclosure",
          type: "textarea",
          required: true,
        },
        {
          name: "confidentialInfo",
          label: "Confidential Information",
          type: "textarea",
        },
        {
          name: "duration",
          label: "Agreement Duration (years)",
          type: "number",
          required: true,
          default: 2,
        },
        {
          name: "effectiveDate",
          label: "Effective Date",
          type: "date",
          required: true,
        },
      ],
      "Bill Of Sale": [
        {
          name: "sellerName",
          label: "Seller Name",
          type: "text",
          required: true,
        },
        {
          name: "buyerName",
          label: "Buyer Name",
          type: "text",
          required: true,
        },
        {
          name: "sellerAddress",
          label: "Seller Address",
          type: "text",
          required: true,
        },
        {
          name: "buyerAddress",
          label: "Buyer Address",
          type: "text",
          required: true,
        },
        {
          name: "sellerID",
          label: "Seller ID Number",
          type: "text",
          required: true,
        },
        {
          name: "buyerID",
          label: "Buyer ID Number",
          type: "text",
          required: true,
        },
        {
          name: "itemDescription",
          label: "Item Description",
          type: "textarea",
          required: true,
        },
        { name: "serialNumber", label: "Serial/Model Number", type: "text" },
        { name: "condition", label: "Item Condition", type: "text" },
        { name: "accessories", label: "Accessories Included", type: "text" },
        {
          name: "purchasePrice",
          label: "Purchase Price (LKR)",
          type: "number",
          required: true,
        },
        {
          name: "dateOfSale",
          label: "Date of Sale",
          type: "date",
          required: true,
        },
        { name: "deliveryAddress", label: "Delivery Address", type: "text" },
        { name: "deliveryDate", label: "Delivery Date", type: "date" },
      ],
      "Service Agreement": [
        {
          name: "serviceProvider",
          label: "Service Provider",
          type: "text",
          required: true,
        },
        { name: "client", label: "Client", type: "text", required: true },
        {
          name: "providerAddress",
          label: "Provider Address",
          type: "text",
          required: true,
        },
        {
          name: "clientAddress",
          label: "Client Address",
          type: "text",
          required: true,
        },
        {
          name: "providerRegNumber",
          label: "Provider Registration Number",
          type: "text",
        },
        {
          name: "clientRegNumber",
          label: "Client Registration Number",
          type: "text",
        },
        {
          name: "serviceDescription",
          label: "Service Description",
          type: "textarea",
          required: true,
        },
        {
          name: "serviceFee",
          label: "Service Fee (LKR)",
          type: "number",
          required: true,
        },
        { name: "paymentTerms", label: "Payment Terms", type: "textarea" },
        {
          name: "startDate",
          label: "Start Date",
          type: "date",
          required: true,
        },
        { name: "endDate", label: "End Date", type: "date" },
        {
          name: "noticePeriod",
          label: "Notice Period (days)",
          type: "number",
          default: 30,
        },
        {
          name: "serviceSpecifications",
          label: "Service Specifications",
          type: "textarea",
        },
        { name: "ipOwner", label: "Intellectual Property Owner", type: "text" },
      ],
      "Asset Purchase Agreement": [
        {
          name: "sellerCompany",
          label: "Seller Company Name",
          type: "text",
          required: true,
        },
        {
          name: "buyerCompany",
          label: "Buyer Company Name",
          type: "text",
          required: true,
        },
        {
          name: "sellerAddress",
          label: "Seller Company Address",
          type: "text",
          required: true,
        },
        {
          name: "buyerAddress",
          label: "Buyer Company Address",
          type: "text",
          required: true,
        },
        {
          name: "sellerRegNumber",
          label: "Seller Registration Number",
          type: "text",
          required: true,
        },
        {
          name: "buyerRegNumber",
          label: "Buyer Registration Number",
          type: "text",
          required: true,
        },
        {
          name: "assetList",
          label: "Asset List Description",
          type: "textarea",
          required: true,
        },
        {
          name: "purchasePrice",
          label: "Purchase Price (LKR)",
          type: "number",
          required: true,
        },
        {
          name: "depositAmount",
          label: "Deposit Amount (LKR)",
          type: "number",
        },
        {
          name: "closingDate",
          label: "Closing Date",
          type: "date",
          required: true,
        },
        { name: "closingLocation", label: "Closing Location", type: "text" },
        { name: "taxBearer", label: "Taxes Borne By", type: "text" },
      ],
      "Business Contract": [
        {
          name: "partyAName",
          label: "First Party Name",
          type: "text",
          required: true,
        },
        {
          name: "partyBName",
          label: "Second Party Name",
          type: "text",
          required: true,
        },
        {
          name: "partyAAddress",
          label: "First Party Address",
          type: "text",
          required: true,
        },
        {
          name: "partyBAddress",
          label: "Second Party Address",
          type: "text",
          required: true,
        },
        {
          name: "partyARegNumber",
          label: "First Party Registration Number",
          type: "text",
        },
        {
          name: "partyBRegNumber",
          label: "Second Party Registration Number",
          type: "text",
        },
        {
          name: "contractPurpose",
          label: "Contract Purpose",
          type: "textarea",
          required: true,
        },
        {
          name: "contractValue",
          label: "Contract Value (LKR)",
          type: "number",
          required: true,
        },
        {
          name: "contractTerm",
          label: "Contract Term (months)",
          type: "number",
          required: true,
        },
        {
          name: "partyAObligations",
          label: "First Party Obligations",
          type: "textarea",
          required: true,
        },
        {
          name: "partyBObligations",
          label: "Second Party Obligations",
          type: "textarea",
          required: true,
        },
        {
          name: "paymentSchedule",
          label: "Payment Schedule",
          type: "textarea",
        },
        { name: "deliverables", label: "Deliverables", type: "textarea" },
        {
          name: "terminationNotice",
          label: "Termination Notice (days)",
          type: "number",
          default: 30,
        },
      ],
      "Car Rental Agreement": [
        {
          name: "ownerName",
          label: "Owner Name",
          type: "text",
          required: true,
        },
        {
          name: "renterName",
          label: "Renter Name",
          type: "text",
          required: true,
        },
        {
          name: "ownerAddress",
          label: "Owner Address",
          type: "text",
          required: true,
        },
        {
          name: "renterAddress",
          label: "Renter Address",
          type: "text",
          required: true,
        },
        {
          name: "ownerPhone",
          label: "Owner Phone Number",
          type: "text",
          required: true,
        },
        {
          name: "renterPhone",
          label: "Renter Phone Number",
          type: "text",
          required: true,
        },
        {
          name: "licenseNumber",
          label: "Renter Driving License Number",
          type: "text",
          required: true,
        },
        {
          name: "vehicleMake",
          label: "Vehicle Make",
          type: "text",
          required: true,
        },
        {
          name: "vehicleModel",
          label: "Vehicle Model",
          type: "text",
          required: true,
        },
        {
          name: "vehicleYear",
          label: "Vehicle Year",
          type: "text",
          required: true,
        },
        {
          name: "regNumber",
          label: "Registration Number",
          type: "text",
          required: true,
        },
        { name: "vehicleColor", label: "Vehicle Color", type: "text" },
        {
          name: "startDate",
          label: "Rental Start Date",
          type: "date",
          required: true,
        },
        {
          name: "endDate",
          label: "Rental End Date",
          type: "date",
          required: true,
        },
        { name: "startTime", label: "Start Time", type: "time" },
        { name: "endTime", label: "End Time", type: "time" },
        {
          name: "dailyRate",
          label: "Daily Rate (LKR)",
          type: "number",
          required: true,
        },
        {
          name: "securityDeposit",
          label: "Security Deposit (LKR)",
          type: "number",
        },
        { name: "kmLimit", label: "Daily Kilometer Limit", type: "number" },
        {
          name: "excessRate",
          label: "Excess Kilometer Rate (LKR/km)",
          type: "number",
        },
        { name: "returnLocation", label: "Return Location", type: "text" },
        {
          name: "deductible",
          label: "Insurance Deductible (LKR)",
          type: "number",
        },
      ],
      "Collaboration Agreement": [
        {
          name: "partyAName",
          label: "First Party Name",
          type: "text",
          required: true,
        },
        {
          name: "partyBName",
          label: "Second Party Name",
          type: "text",
          required: true,
        },
        {
          name: "partyAAddress",
          label: "First Party Address",
          type: "text",
          required: true,
        },
        {
          name: "partyBAddress",
          label: "Second Party Address",
          type: "text",
          required: true,
        },
        {
          name: "projectName",
          label: "Project Name",
          type: "text",
          required: true,
        },
        {
          name: "collaborationPurpose",
          label: "Collaboration Purpose",
          type: "textarea",
          required: true,
        },
        {
          name: "partyAResponsibilities",
          label: "First Party Responsibilities",
          type: "textarea",
          required: true,
        },
        {
          name: "partyBResponsibilities",
          label: "Second Party Responsibilities",
          type: "textarea",
          required: true,
        },
        {
          name: "resourcesContributed",
          label: "Resources Contributed",
          type: "textarea",
        },
        {
          name: "ipOwnershipTerms",
          label: "IP Ownership Terms",
          type: "textarea",
        },
        {
          name: "costSharingTerms",
          label: "Cost Sharing Terms",
          type: "textarea",
        },
        {
          name: "startDate",
          label: "Start Date",
          type: "date",
          required: true,
        },
        { name: "endDate", label: "End Date", type: "date" },
        {
          name: "terminationNotice",
          label: "Termination Notice (days)",
          type: "number",
          default: 30,
        },
      ],
      "Commission Agreement": [
        {
          name: "companyName",
          label: "Company Name",
          type: "text",
          required: true,
        },
        {
          name: "agentName",
          label: "Agent Name",
          type: "text",
          required: true,
        },
        {
          name: "companyAddress",
          label: "Company Address",
          type: "text",
          required: true,
        },
        {
          name: "agentAddress",
          label: "Agent Address",
          type: "text",
          required: true,
        },
        {
          name: "agentNIC",
          label: "Agent NIC Number",
          type: "text",
          required: true,
        },
        {
          name: "productsServices",
          label: "Products/Services",
          type: "textarea",
          required: true,
        },
        {
          name: "territory",
          label: "Sales Territory",
          type: "text",
          required: true,
        },
        {
          name: "commissionRate",
          label: "Commission Rate (%)",
          type: "number",
          required: true,
        },
        {
          name: "paymentDays",
          label: "Payment Days After Sale",
          type: "number",
          default: 30,
        },
        {
          name: "termMonths",
          label: "Agreement Term (months)",
          type: "number",
          required: true,
        },
        {
          name: "startDate",
          label: "Start Date",
          type: "date",
          required: true,
        },
        {
          name: "terminationNotice",
          label: "Termination Notice (days)",
          type: "number",
          default: 30,
        },
      ],
      "Confidentiality Statement": [
        {
          name: "employeeName",
          label: "Employee Name",
          type: "text",
          required: true,
        },
        {
          name: "employeePosition",
          label: "Employee Position",
          type: "text",
          required: true,
        },
        {
          name: "companyName",
          label: "Company Name",
          type: "text",
          required: true,
        },
        {
          name: "effectiveDate",
          label: "Effective Date",
          type: "date",
          required: true,
        },
        { name: "witnessName", label: "Witness Name", type: "text" },
      ],
      Contract: [
        {
          name: "partyAName",
          label: "First Party Name",
          type: "text",
          required: true,
        },
        {
          name: "partyBName",
          label: "Second Party Name",
          type: "text",
          required: true,
        },
        {
          name: "partyAAddress",
          label: "First Party Address",
          type: "text",
          required: true,
        },
        {
          name: "partyBAddress",
          label: "Second Party Address",
          type: "text",
          required: true,
        },
        {
          name: "contractBackground",
          label: "Contract Background",
          type: "textarea",
          required: true,
        },
        {
          name: "partyAObligations",
          label: "First Party Obligations",
          type: "textarea",
          required: true,
        },
        {
          name: "partyBObligations",
          label: "Second Party Obligations",
          type: "textarea",
          required: true,
        },
        {
          name: "paymentTerms",
          label: "Payment Terms",
          type: "textarea",
          required: true,
        },
        {
          name: "otherDefinitions",
          label: "Other Definitions",
          type: "textarea",
        },
        {
          name: "startDate",
          label: "Start Date",
          type: "date",
          required: true,
        },
        { name: "endDate", label: "End Date", type: "date" },
        {
          name: "noticePeriod",
          label: "Notice Period (days)",
          type: "number",
          default: 30,
        },
      ],
      "Consignment Agreement": [
        {
          name: "consignorName",
          label: "Consignor Name",
          type: "text",
          required: true,
        },
        {
          name: "consigneeName",
          label: "Consignee Name",
          type: "text",
          required: true,
        },
        {
          name: "consignorAddress",
          label: "Consignor Address",
          type: "text",
          required: true,
        },
        {
          name: "consigneeAddress",
          label: "Consignee Address",
          type: "text",
          required: true,
        },
        {
          name: "goodsDescription",
          label: "Goods Description",
          type: "textarea",
          required: true,
        },
        {
          name: "sellingPrice",
          label: "Selling Price (LKR)",
          type: "number",
          required: true,
        },
        {
          name: "commissionRate",
          label: "Commission Rate (%)",
          type: "number",
          required: true,
        },
        {
          name: "discountLimit",
          label: "Maximum Discount (%)",
          type: "number",
          default: 10,
        },
        {
          name: "paymentDays",
          label: "Payment Days After Sale",
          type: "number",
          default: 7,
        },
        {
          name: "termMonths",
          label: "Agreement Term (months)",
          type: "number",
          required: true,
        },
        {
          name: "startDate",
          label: "Start Date",
          type: "date",
          required: true,
        },
        { name: "riskBearer", label: "Risk of Loss Borne By", type: "text" },
        {
          name: "terminationNotice",
          label: "Termination Notice (days)",
          type: "number",
          default: 30,
        },
      ],
    };

    return formTemplates[agreementType] || [];
  };

  // --- Get sample data for testing ---
  const getSampleDataForAgreement = (agreementType) => {
    const samples = {
      "Employment Contract": {
        employeeName: "John Smith",
        employerName: "ABC Technologies Ltd",
        employeeAddress: "123 Main Street, Colombo 05",
        employerAddress: "456 Business Avenue, Colombo 03",
        jobTitle: "Senior Software Engineer",
        startDate: "2024-01-15",
        salary: "250000",
        probationPeriod: "6",
        workHours: "45",
        noticePeriod: "30",
        annualLeave: "21",
        jobDescription:
          "Develop and maintain web applications using React and Node.js",
      },
      "Termination Letter": {
        employeeName: "Jane Doe",
        employeeAddress: "789 Worker Lane, Kandy",
        companyName: "XYZ Corporation",
        terminationDate: "2024-03-31",
        lastWorkingDay: "2024-03-31",
        reason: "Company restructuring and position elimination",
        referenceNumber: "HR/TL/2024/001",
        settlementDate: "2024-04-07",
        handoverPerson: "Manager - IT Department",
        authorizedSignatory: "Director of Human Resources",
      },
      "Non-Disclosure Agreement": {
        disclosingParty: "Innovate Solutions Pvt Ltd",
        receivingParty: "Tech Partners Inc",
        disclosingAddress: "123 Innovation Drive, Colombo 07",
        receivingAddress: "456 Tech Park, Colombo 10",
        purpose:
          "Evaluation of potential business partnership and technology sharing",
        duration: "3",
        effectiveDate: "2024-02-01",
      },
      "Bill Of Sale": {
        sellerName: "David Perera",
        buyerName: "Samantha Silva",
        sellerAddress: "78 Seller Street, Galle",
        buyerAddress: "45 Buyer Road, Matara",
        sellerID: "781234567V",
        buyerID: "851234567V",
        itemDescription:
          "Dell Latitude Laptop, Model E7440, 8GB RAM, 256GB SSD",
        purchasePrice: "125000",
        dateOfSale: "2024-02-15",
      },
    };

    return samples[agreementType] || {};
  };

  // --- Copy text to clipboard ---
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      return { success: true, message: "Text copied to clipboard!" };
    } catch (err) {
      console.error("Failed to copy text:", err);
      return { success: false, message: "Failed to copy text to clipboard" };
    }
  };

  // --- Logout User ---
  const logoutUser = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
  };

  // --- Load user session from localStorage on refresh ---
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("loggedInUser");

    if (savedToken) {
      setToken(savedToken);
    }
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const contextValue = {
    url,
    templateGeneratorUrl,
    token,
    user,
    setUser,
    loading,

    // Authentication
    adminLogin,
    registerUser,
    loginUser,
    logoutUser,
    isAdmin,

    // Chat Functions
    sendChatMessage,

    // Chat History Functions
    saveChatHistory,
    getChatSessions,
    getChatSession,
    updateSessionTitle,
    deleteChatSession,

    // Admin Functions
    getAdminStats,
    getAllUsers,
    deleteUser,
    uploadAdminDocument,
    getAdminDocuments,
    getDocumentStats,
    deleteAdminDocument,

    // Document Generation Functions
    generateDocument,
    convertToPDF,
    convertToDOCX,
    getDocumentHistory,
    getDocument,
    deleteDocument,
    getAgreementTemplates,
    getFormFieldsForAgreement,
    getSampleDataForAgreement,
    copyToClipboard,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;