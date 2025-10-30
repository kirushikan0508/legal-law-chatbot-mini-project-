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

  const navigate = useNavigate(); 

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

    // Fetch existing users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

      if (isLogin) {

          // 🔐 LOGIN MODE
          const user = users.find(
            (u) => u.email === formData.email && u.password === formData.password
          );

          if (user) {
                alert("✅ Login successful!");
                localStorage.setItem("loggedInUser", JSON.stringify(user));
                navigate("/home");
          } else {
                alert("❌ Invalid email or password!");
        }

      } else {
        // 📝 SIGNUP MODE
        const existingUser = users.find((u) =>
               u.email === formData.email);
        if (existingUser) {
          alert("⚠️ Email already registered. Please log in instead.");
          return;
        }

        const newUser = {
          email: formData.email,
          password: formData.password,
        };

        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        alert("✅ Registration successful! Please log in.");
        setFormData({ email: "", password: "", confirmPassword: "" });
        window.location.reload(); // Refresh to show login form
 }

      console.log(formData);
      // Call your API here

      
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
        <FcGoogle className="google-icon"/>
        Login With Google
      </button>
    </form>
  );
}

export default AuthForm;
