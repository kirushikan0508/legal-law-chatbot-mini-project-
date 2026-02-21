import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";
import {
  FaBalanceScale,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaYoutube,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaArrowRight,
  FaRegClock,
} from "react-icons/fa";
import { MdGavel } from "react-icons/md";

function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/home" },
    { name: "Legal Query", path: "/chatting" },
    { name: "Document Generator", path: "/document" },
    /*{ name: "Templates", path: "/templates" },
    { name: "Pricing", path: "/pricing" },
    { name: "About Us", path: "/about" },*/
  ];

  return (
    <footer className="footer">
      {/* Main Footer */}
      <div className="footer-main">
        <div className="footer-container">
          {/* Company Info - Takes more space */}
          <div className="footer-section company-info">
            <Link to="/home" className="footer-logo">
              <div className="logo-box">
                <MdGavel className="logo-icon" />
              </div>
              <div className="logo-text">
                <h2>Legal Assistant AI</h2>
                <p>Intelligent Legal Solutions</p>
              </div>
            </Link>

            <p className="company-description">
              Empowering individuals and businesses with AI-powered legal
              assistance tailored to Sri Lankan law. Get accurate information,
              generate documents, and understand your rights with ease.
            </p>

            <div className="contact-info">
              <div className="contact-item">
                <FaMapMarkerAlt className="contact-icon" />
                <span>Colombo 03, Sri Lanka</span>
              </div>
              <div className="contact-item">
                <FaPhone className="contact-icon" />
                <span>+94 11 234 5678</span>
              </div>
              <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <span>support@lexassist.lk</span>
              </div>
              <div className="contact-item">
                <FaRegClock className="contact-icon" />
                <span>Mon-Fri: 9:00 AM - 6:00 PM</span>
              </div>
            </div>
          </div>

          {/* Quick Links - Middle section */}
          <div className="footer-section quick-links">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.path}>
                    <FaArrowRight className="link-icon" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section - Right side */}
          <div className="footer-section newsletter-section">
            <h3 className="footer-title">Stay Updated</h3>
            <div className="newsletter">
              <p className="newsletter-text">
                Subscribe to our newsletter for the latest legal insights and
                updates.
              </p>
              <form className="newsletter-form">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="newsletter-input"
                  aria-label="Email for newsletter"
                />
                <button type="submit" className="newsletter-btn">
                  <FaArrowRight />
                </button>
              </form>

              {/* Privacy notice */}
              <p className="privacy-note">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Bar */}

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p className="copyright">
            &copy; {currentYear} Legal Assistant AI. All rights reserved.
            Powered by Sri Lankan Law.
          </p>
          <div className="bottom-links">
            <Link to="/privacy">Privacy Policy</Link>
            <span className="separator">•</span>
            <Link to="/terms">Terms of Service</Link>
            <span className="separator">•</span>
            <Link to="/cookies">Cookie Policy</Link>
            <span className="separator">•</span>
            <Link to="/disclaimer">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
