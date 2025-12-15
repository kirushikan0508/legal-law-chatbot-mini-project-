import axios from "axios";


//               BACKEND CONFIG (future ready)

const API_BASE = "http://localhost:5000/api/admin";

const API = axios.create({
  baseURL: API_BASE,
});

// Attach token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


//               LOCAL STORAGE HELPERS

const load = (key) => JSON.parse(localStorage.getItem(key)) || [];
const save = (key, data) => localStorage.setItem(key, JSON.stringify(data));



//               DASHBOARD SUMMARY

export const getSummary = async () => {
  try {
    // Backend version (enable later)
    // const res = await API.get("/summary");
    // return res.data;

    // Local fallback
    return {
      success: true,
      totalUsers: load("admin_users").length,
      totalTemplates: load("admin_templates").length,
      totalDocuments: load("admin_documents").length,  
    };
  } catch (err) {
    return { success: false, message: err.message };
  }
};



//                       USERS

export const getUsers = async () => load("admin_users");

export const addUser = async (user) => {
  const users = load("admin_users");
  users.push({ id: Date.now(), ...user });
  save("admin_users", users);
  return { success: true };
};

export const updateUser = async (id, updatedData) => {
  const users = load("admin_users").map(u =>
    u.id === id ? { ...u, ...updatedData } : u
  );
  save("admin_users", users);
  return { success: true };
};

export const deleteUser = async (id) => {
  const users = load("admin_users").filter(u => u.id !== id);
  save("admin_users", users);
  return { success: true };
};



//                     TEMPLATES

export const getTemplates = async () => load("admin_templates");

export const createTemplate = async (template) => {
  const templates = load("admin_templates");
  templates.push({
    id: Date.now(),
    ...template,
    createdAt: new Date().toISOString(),
  });
  save("admin_templates", templates);
  return { success: true };
};

export const updateTemplate = async (id, newData) => {
  let templates = load("admin_templates").map(t =>
    t.id === id ? { ...t, ...newData } : t
  );
  save("admin_templates", templates);
  return { success: true };
};

export const deleteTemplate = async (id) => {
  const templates = load("admin_templates").filter(t => t.id !== id);
  save("admin_templates", templates);
  return { success: true };
};

// ==================================================
//               LEGAL DOCUMENTS (VECTOR DB META)
// ==================================================
export const getDocuments = async () => load("admin_documents");

export const addDocument = async (document) => {
  const documents = load("admin_documents");
  documents.push({
    id: Date.now(),
    ...document,
    uploadedAt: new Date().toISOString(),
  });
  save("admin_documents", documents);
  return { success: true };
};

export const deleteDocument = async (id) => {
  const documents = load("admin_documents").filter(d => d.id !== id);
  save("admin_documents", documents);
  return { success: true };
};

// ==================================================
//                 FILE HISTORY
// ==================================================
export const getFileHistory = async () => {
  // Same as documents for now
  return load("admin_documents");
};




