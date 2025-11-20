import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./Pages/Auth/Auth.jsx";
import Home from "./Pages/Home/Home.jsx";
import Chatting from "./Pages/Chatting/Chatting.jsx";
import Document from "./Pages/Document/Document.jsx";
import './App.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  
  return (
    <BrowserRouter>
     <ToastContainer position="top-right" autoClose={2500} />
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/home" element={<Home />} />  
        <Route path="/chatting" element={<Chatting />} />
        <Route path="/document" element={<Document />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;