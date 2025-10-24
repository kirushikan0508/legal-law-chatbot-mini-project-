import { useState } from "react";
import "./authForm.css";
import { FcGoogle } from 'react-icons/fc';
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

<GoogleLogin
  onSuccess={(credentialResponse) => {
    console.log("Google login success:", credentialResponse);
    // Have to send credentialResponse.credential to your backend for verification
  }}
  onError={() => {
    alert("Google login failed"); 
  }}
/>

function AuthForm({ isLogin }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const navigate = useNavigate(); // 👈 hook for navigation

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        alert("Please enter a valid email");
        return;
      }

      if (formData.password.length < 6) {
        alert("Password must be at least 6 characters long");
        return;
      }
      
      if (!isLogin && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
      }

      console.log(formData);
      // Call your API here

      // 👇 After successful login or sign up
    navigate("/home"); // Redirect to main page
  };

  const handleForgotPassword = () => {
      const email = prompt("Enter your email to reset password:");
      if (email) {
        // Call your backend API to send a password reset link
        alert(`Password reset link sent to ${email}`);
      }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />

      {!isLogin && (
        <input
          type="password"
          name="confirmPassword"
          placeholder="Re-Enter Password"
          onChange={handleChange}
          required
        />
      )}

      {isLogin && (
        <a href="#" className="forgot-link" onClick={handleForgotPassword}>
          Forget Password
        </a>
      )}

      <button type="submit" className="submit-btn">
        {isLogin ? "Log In" : "Sign Up"}
      </button>

      <div className="divider">
        <span>OR</span>
      </div>

      <button type="button" className="google-btn">
        <FcGoogle />
        Login With Google
      </button>
    </form>
  );
}

export default AuthForm;
