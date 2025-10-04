import { useState } from "react";
import "./authForm.css";

function AuthForm({ isLogin }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
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
        <a href="#" className="forgot-link">
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
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
          alt="Google"
        />
        Login With Google
      </button>
    </form>
  );
}

export default AuthForm;
