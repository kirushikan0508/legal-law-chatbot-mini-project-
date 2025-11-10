import Navbar from "../../Components/Navbar/Navbar";
import "./home.css";
import ChatWindow from "../../Components/Chat/ChatWindow";
import DocumentGenerator from "../../Components/Document Generator/DocumentGenerator";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
      alert("Please log in first!");
      navigate("/");
    } else {
      setUser(loggedInUser);
    }
  }, [navigate]);

  // ✅ Compute name only after user is loaded
  const name = user ? user.email.split("@")[0] : "";
 
  if (!user) return <div className="loading">Loading...</div>;

return (
    <div className="home-container">

       <Navbar /> 

       <header>
          {user && (
            <p className="welcome-text">
              Welcome, <strong>{name}</strong> 
            </p>
          )}
       </header>

      {/* Chat Section */}
      <section className="chat-section">
         <ChatWindow />
      </section>


      {/* Document Generator Section */}
      <section className="document-generator">
          <DocumentGenerator />
      </section>


    </div>
  );
}

export default Home;
