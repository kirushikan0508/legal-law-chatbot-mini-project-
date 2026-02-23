import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut, FiLogIn, FiMenu, FiX, FiFileText } from "react-icons/fi";
import { FaBalanceScale, FaRegUserCircle } from "react-icons/fa";
import { MdAssignment, MdGavel } from "react-icons/md";
import { useState, useEffect, useContext } from "react";
import { StoreContext } from "../../context/StoreContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { token, logoutUser } = useContext(StoreContext);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/auth");
  };

  return (
    <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="navbar-left">
        <Link to="/home" className="logo-title-link">
          <div className="logo-box">
            <MdGavel className="logo-icon" />
          </div>
          <div className="title-box">
            <h2>Legal Assistant AI</h2>
            <p>Sri Lanka Law Guidance</p>
          </div>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="navbar-center">
        <Link to="/home" className="nav-link">
          Home
        </Link>
        <a href="/home#how-it-works" className="nav-link">
          How It Works
        </a>
        <Link to="/chatting" className="nav-link">
          Legal Query
        </Link>
        <Link to="/document" className="nav-link">
          Templates
        </Link>
      </div>

      <div className="navbar-right-desktop">
        {token ? (
          <button onClick={handleLogout} className="logout-btn-desktop">
            <FiLogOut /> Logout
          </button>
        ) : (
          <button onClick={handleLogin} className="login-btn-desktop">
            <FiLogIn /> Login
          </button>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <button className="menu-toggle" onClick={toggleMenu}>
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Mobile Navigation */}
      <div className={`mobile-menu ${menuOpen ? "show" : ""}`}>
        <Link to="/home" className="mobile-nav-link" onClick={toggleMenu}>
          <FaBalanceScale className="mobile-icon" /> Home
        </Link>
        <a
          href="/home#how-it-works"
          className="mobile-nav-link"
          onClick={toggleMenu}
        >
          <FaBalanceScale className="mobile-icon" /> How It Works
        </a>
        <Link to="/chatting" className="mobile-nav-link" onClick={toggleMenu}>
          <FiFileText className="mobile-icon" /> Legal Query
        </Link>
        <Link to="/document" className="mobile-nav-link" onClick={toggleMenu}>
          <MdAssignment className="mobile-icon" /> Documents
        </Link>
        {token ? (
          <button onClick={handleLogout} className="mobile-logout-btn">
            <FiLogOut className="mobile-icon" /> Logout
          </button>
        ) : (
          <button onClick={handleLogin} className="mobile-login-btn">
            <FiLogIn className="mobile-icon" /> Login
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
