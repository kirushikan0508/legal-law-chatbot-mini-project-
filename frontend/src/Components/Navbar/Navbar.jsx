import "./navbar.css";
import { Link } from "react-router-dom";
import { FiLogOut, FiSettings } from "react-icons/fi";
import { FaBalanceScale } from "react-icons/fa";
import { MdAssignment } from "react-icons/md";


function Navbar() {

  return (
    <nav className="navbar">
      {/* Left Section - Logo + Title */}
      <div className="navbar-left">
        <div className="logo-box">
          <FaBalanceScale className="logo-icon" />
        </div>
        <div className="title-box">
            <h2> Legal Assistant AI</h2>
            <p>Sri Lanka Law Guidance</p>
        </div>
      </div>

      {/* Center Section - Navigation Links */}
      <div className="navbar-right">

        <Link to="/templates" className="nav-btn templates-btn">
          <MdAssignment className="btn-icon" /> Templates
        </Link>
      
        <Link to="/" className="nav-btn login-btn">
          Log in
        </Link>

        <Link to="/signup" className="nav-btn signup-btn">
          Sign up
        </Link>

        <button className="nav-btn settings-btn" title="Settings">
          <FiSettings className="btn-icon"  />
        </button>

        <Link to="/" className="nav-btn logout-btn">
           <FiLogOut className="btn-icon"/> Logout
        </Link>
       
      </div>
    </nav>
  );
}

export default Navbar;
