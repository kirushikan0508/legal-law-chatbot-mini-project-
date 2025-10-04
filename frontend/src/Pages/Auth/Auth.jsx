import { useState } from "react";
import AuthForm from "../../Components/AuthForm/AuthForm";
import "./auth.css";


function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-container">
      <header className="auth-header">
        <h1>⚖️ Legal Assistant AI</h1>
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
