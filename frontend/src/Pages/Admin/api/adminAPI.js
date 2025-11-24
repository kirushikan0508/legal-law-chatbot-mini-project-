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
      totalChats: load("admin_chats").length,
      totalTemplates: load("admin_templates").length,
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
  let users = load("admin_users");
  users = users.map(u => (u.id === id ? { ...u, ...updatedData } : u));
  save("admin_users", users);
  return { success: true };
};

export const deleteUser = async (id) => {
  const users = load("admin_users").filter(u => u.id !== id);
  save("admin_users", users);
  return { success: true };
};



//                       CHATS

export const getChats = async () => load("admin_chats");

export const deleteChat = async (id) => {
  const chats = load("admin_chats").filter(c => c.id !== id);
  save("admin_chats", chats);
  return { success: true };
};



//                     TEMPLATES

export const getTemplates = async () => load("admin_templates");

export const createTemplate = async (template) => {
  const templates = load("admin_templates");
  templates.push({
    id: Date.now(),
    ...template,
  });
  save("admin_templates", templates);
  return { success: true };
};

export const updateTemplate = async (id, newData) => {
  let templates = load("admin_templates");
  templates = templates.map(t => (t.id === id ? { ...t, ...newData } : t));
  save("admin_templates", templates);
  return { success: true };
};

export const deleteTemplate = async (id) => {
  const templates = load("admin_templates").filter(t => t.id !== id);
  save("admin_templates", templates);
  return { success: true };
};



//                     SETTINGS

export const getSettings = async () => {
  return JSON.parse(localStorage.getItem("admin_settings")) || {};
};

export const saveSettings = async (settings) => {
  localStorage.setItem("admin_settings", JSON.stringify(settings));
  return { success: true };
};
