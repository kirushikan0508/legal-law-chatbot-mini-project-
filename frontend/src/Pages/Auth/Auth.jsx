import { useState, useEffect } from "react";
import AuthForm from "../../Components/AuthForm/AuthForm";
import "./auth.css";
import { FaBalanceScale } from "react-icons/fa";
import { useLocation } from "react-router-dom";


function Auth() {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);

  // Detect query parameter to switch modes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const mode = params.get("mode");
    setIsLogin(mode !== "signup"); // if mode=signup → false
  }, [location]);


  return (
    <div className="auth-container">
      <header className="auth-header">
        <h1> <FaBalanceScale/>  Legal Assistant AI</h1>
        <p>Sri Lanka Law Guidance</p>
      </header>

      <div className="auth-box">
        <div className="toggle-buttons">
          <button
            className={isLogin ? "active" : ""}
            onClick={() => setIsLogin(true)}
          >
            Log In
          </button>
          <button
            className={!isLogin ? "active" : ""}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        <AuthForm isLogin={isLogin} />
      </div>
    </div>
  );
}

export default Auth
