import { useState, useContext } from "react";
import "./authForm.css";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext.jsx";
import { toast } from "react-toastify";

function AuthForm({ isLogin }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const navigate = useNavigate();
  const { loginUser, registerUser, loading } = useContext(StoreContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted", { isLogin, formData });

    // ---- Basic Validation ----
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      let res;
      if (isLogin) {
        console.log("Attempting login...");
       res = await loginUser(formData.email, formData.password);
        console.log("Login response:", res);
        
        if (res.success) {
          toast.success("Login successful!");

          // Check if user is admin
          if (res.user?.role === 'admin') {
            navigate("/admin"); // Redirect to admin dashboard
          } else {
          navigate("/home"); 
          }
        } else {
          toast.error(res.message || "Login failed!");
        }
        } else {
        // Don't allow registration with admin email
        if (formData.email === "admin@gmail.com") {
          toast.error("Cannot register with admin email");
          return;
        }
     
        console.log("Attempting registration...");
        const res = await registerUser(
          formData.name,
          formData.email,
          formData.password
        );
        console.log("Register response:", res);
        
        if (res.success) {
          toast.success("Registration successful!");
          navigate("/home");
        } else {
          toast.error(res.message || "Registration failed!");
        }
      }
    } catch (err) {
      console.error("Full error:", err);
      toast.error(err.response?.data?.message || "Something went wrong!");
    }
  };

  const handleForgotPassword = () => {
    const email = prompt("Enter your email to reset password:");
    if (email) {
      toast.info(`Password reset link sent to ${email} (Feature coming soon)`);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      {/* Only show name input when signing up */}
      {!isLogin && (
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      )}

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      {!isLogin && (
        <input
          type="password"
          name="confirmPassword"
          placeholder="Re-Enter Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      )}

      {/* {isLogin && (
        <a href="#" className="forgot-link" onClick={handleForgotPassword}>
          Forget Password?
        </a>
      )} */}

      <button 
        className="submit-btn" 
        type="submit"
        disabled={loading}
      >
        {loading ? "Processing..." : (isLogin ? "Log In" : "Sign Up")}
      </button>

    </form>
  );
}

export default AuthForm;
