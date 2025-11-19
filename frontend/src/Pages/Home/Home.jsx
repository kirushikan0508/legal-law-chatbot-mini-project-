import Navbar from "../../Components/Navbar/Navbar";
import "./home.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBalanceScale, FaLock, FaFileAlt} from "react-icons/fa";


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

  const handleClick = () => {
    navigate("/chatting");
  };

  const handleClickDocument = () => {
    navigate("/document");
  } 

return (
    <div className="home-container">

       <Navbar /> 

       <header>
          {user && (
            <p className="welcome-text">
              Welcome, <span>{name}</span> 
            </p>
          )}
       </header>


        {/* Hero Section */}
       <div className="hero-section">
          <div className="hero-icon"><FaBalanceScale /></div>
          <span className="hero-badge">Powered by AI . Free for everyone</span>
          <h1 className="hero-title">Legal Guidance <br /> <span>Democratized</span></h1>
          <p className="hero-subtext">Get instant, accurate legal information tailored to Sri Lankan law. Understanding your rights has never been easier</p>
            
          {/* Home section */}
          <section className="hero-buttons">
                <button className="start-btn" onClick={handleClick} >Start Your Legal Query</button> 
                <button className="learn-btn" onClick = {handleClickDocument}>Generate your Document</button>
          </section>
       </div>

        {/* Feature Cards */}
        <section className="feature-section">
          <div className="feature-card">
            <FaLock className="feature-icon" />
            <h3>Confidential & Secure</h3>
            <p>Your queries are private and encrypted</p>
          </div>

          <div className="feature-card">
            <FaBalanceScale className="feature-icon" />
            <h3>Sri Lankan Law</h3>
            <p>Specialized in local legal framework</p>
          </div>

          <div className="feature-card">
            <FaFileAlt className="feature-icon" />
            <h3>Document Templates</h3>
            <p>Generate legal documents instantly</p>
          </div>
        </section>

          {/* Legal Notice */}
          <section className="legal-notice-section">
           <p className="legal-notice">
            <strong>Important Notice:</strong> This AI assistant provides general legal 
            information and is not a substitute for professional legal advice. 
            For specific legal matters, please consult a qualified attorney.
           </p>
          </section>

        </div>
  
  );
}

export default Home;
