import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./Pages/Auth/Auth.jsx";
import Home from "./Pages/Home/Home.jsx";
import Chatting from "./Pages/Chatting/Chatting.jsx";
import './App.css'

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/home" element={<Home />} />  
        <Route path="/chatting" element={<Chatting/>} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;



