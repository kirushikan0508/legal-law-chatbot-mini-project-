import "./navbar.css";
import { Link } from "react-router-dom";
import { FiLogOut, FiSettings, FiMenu } from "react-icons/fi";
import { FaBalanceScale } from "react-icons/fa";
import { MdAssignment } from "react-icons/md";
import { useState } from "react";

function Navbar() {

   const [menuOpen, setMenuOpen] = useState(false);
   const toggleMenu = () => setMenuOpen(!menuOpen);


  return (
    <nav className="navbar">
      {/* Left Section - Logo + Title */}
      <div className="navbar-left">

      <Link to="/home" className="logo-title-link">
        <div className="logo-box">
          <FaBalanceScale className="logo-icon" />
        </div>

        <div className="title-box">
            <h2> Legal Assistant AI</h2>
            <p>Sri Lanka Law Guidance</p>
        </div>
      </Link> 
        
        {/* Hamburger icon (mobile only) */}
        <button className="menu-toggle" onClick={toggleMenu}>
          <FiMenu />
        </button>
        
      </div>

     

      {/* Right Section - Navigation Links */}
      <div className={`navbar-right ${menuOpen ? "show" : ""}`}>

        <Link to="/document" className="nav-btn templates-btn">
          <MdAssignment className="btn-icon" /> Templates
        </Link>

        <Link to="/" className="nav-btn logout-btn">
           <FiLogOut className="btn-icon"/> Logout
        </Link>
       
      </div>
    </nav>
  );
}

export default Navbar;
