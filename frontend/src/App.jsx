import { BrowserRouter, Routes, Route } from "react-router-dom";
// User Pages
import Auth from "./Pages/Auth/Auth.jsx";
import Home from "./Pages/Home/Home.jsx";
import Chatting from "./Pages/Chatting/Chatting.jsx";
import Document from "./Pages/Document/Document.jsx";
import "./App.css";

// Admin Pages + Layout
import AdminLayout from "./Pages/Admin/AdminLayout/AdminLayout.jsx";
import Dashboard from "./Pages/Admin/Dashboard/Dashboard.jsx";
import Documents from "./Pages/Admin/Documents/Documents.jsx";
import FileHistory from "./Pages/Admin/FileHistory/FileHistory.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={2500} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/chatting" element={<Chatting />} />
        <Route path="/document" element={<Document />} />
        <Route path="/*" element={<h1>404 Not Fund</h1>} />

        {/* Admin Login */}
        <Route path="/admin-login" element={<Auth />} />

        {/* ADMIN ROUTES */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="file-history" element={<FileHistory />} />
          <Route path="documents" element={<Documents />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
