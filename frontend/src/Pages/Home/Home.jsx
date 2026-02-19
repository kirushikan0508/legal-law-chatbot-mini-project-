import Navbar from "../../Components/Navbar/Navbar";
import "./home.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import {
  FaBalanceScale,
  FaLock,
  FaFileAlt,
  FaArrowRight,
  FaShieldAlt,
  FaGavel,
  FaRobot,
  FaScroll,
} from "react-icons/fa";
import { MdSpeed, MdSecurity } from "react-icons/md";

function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
      alert("Please log in first!");
      navigate("/");
    } else {
      setUser(loggedInUser);
    }
    setLoading(false);
  }, [navigate]);

  const name = user ? user.email.split("@")[0] : "";

  if (loading)
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );

  return (
    <div className="home-container">
      <Navbar />

      {/* Hero Section with Modern Design */}
      <section className="hero-section-modern">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-pulse"></span>
            AI-Powered Legal Assistant
          </div>

          <h1 className="hero-title-modern">
            <span className="gradient-text">Intelligent Legal</span>
            <br />
            Guidance for Sri Lanka
          </h1>

          <p className="hero-description">
            Access accurate legal information, generate documents, and
            understand your rights with our advanced AI assistant, specialized
            in Sri Lankan law.
          </p>

          <div className="hero-cta">
            <button
              className="cta-primary"
              onClick={() => navigate("/chatting")}
            >
              Start Legal Query
              <FaArrowRight className="cta-icon" />
            </button>
            <button
              className="cta-secondary"
              onClick={() => navigate("/document")}
            >
              Browse Templates
            </button>
          </div>

          {user && (
            <div className="welcome-message">
              <FaRobot className="welcome-icon" />
              <span>
                Welcome back, <strong>{name}</strong>! Ready to assist you
                today.
              </span>
            </div>
          )}
        </div>

        <div className="hero-visual">
          <div className="floating-card card-1">
            <FaGavel className="card-icon" />
            <span>Case Law</span>
          </div>
          <div className="floating-card card-2">
            <FaScroll className="card-icon" />
            <span>Documents</span>
          </div>
          <div className="floating-card card-3">
            <FaBalanceScale className="card-icon" />
            <span>Rights</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2>Why Choose LexAssist AI?</h2>
          <p>
            Experience the future of legal assistance with our cutting-edge
            features
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card-modern">
            <div className="feature-icon-wrapper">
              <FaLock className="feature-icon-modern" />
            </div>
            <h3>Bank-Level Security</h3>
            <p>
              Your legal queries and documents are protected with
              enterprise-grade encryption.
            </p>
          </div>

          <div className="feature-card-modern">
            <div className="feature-icon-wrapper">
              <FaBalanceScale className="feature-icon-modern" />
            </div>
            <h3>Sri Lankan Law Expert</h3>
            <p>
              Specialized knowledge of local legal framework, acts, and judicial
              precedents.
            </p>
          </div>

          <div className="feature-card-modern">
            <div className="feature-icon-wrapper">
              <FaFileAlt className="feature-icon-modern" />
            </div>
            <h3>Smart Templates</h3>
            <p>
              Generate professional legal documents in minutes with AI-powered
              templates.
            </p>
          </div>

          <div className="feature-card-modern">
            <div className="feature-icon-wrapper">
              <MdSpeed className="feature-icon-modern" />
            </div>
            <h3>Instant Responses</h3>
            <p>
              Get accurate legal information within seconds, 24/7 availability.
            </p>
          </div>

          <div className="feature-card-modern">
            <div className="feature-icon-wrapper">
              <FaShieldAlt className="feature-icon-modern" />
            </div>
            <h3>Confidential & Private</h3>
            <p>
              Your conversations are completely private and never shared with
              third parties.
            </p>
          </div>

          <div className="feature-card-modern">
            <div className="feature-icon-wrapper">
              <MdSecurity className="feature-icon-modern" />
            </div>
            <h3>Verified Information</h3>
            <p>
              All legal information is verified against official Sri Lankan
              legal sources.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="section-header">
          <h2>How It Works</h2>
          <p>Get started with LexAssist AI in three simple steps</p>
        </div>

        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Ask Your Question</h3>
            <p>Type your legal question or describe the document you need.</p>
          </div>

          <div className="step-connector"></div>

          <div className="step">
            <div className="step-number">2</div>
            <h3>AI Analysis</h3>
            <p>
              Our AI analyzes your request against Sri Lankan legal framework.
            </p>
          </div>

          <div className="step-connector"></div>

          <div className="step">
            <div className="step-number">3</div>
            <h3>Get Results</h3>
            <p>
              Receive accurate legal guidance or your generated document
              instantly.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to simplify your legal journey?</h2>
          <p>
            Join thousands of satisfied users who trust Legal Assistant AI for
            their legal needs.
          </p>
          <button className="cta-primary" onClick={() => navigate("/chatting")}>
            Get Started Now
            <FaArrowRight className="cta-icon" />
          </button>
        </div>
      </section>

      {/* Legal Notice Section */}
      <section className="legal-notice-section-modern">
        <div className="legal-notice-content">
          <FaShieldAlt className="legal-icon" />
          <p>
            <strong>Important Notice:</strong> Legal Assistant AI provides
            general legal information and document templates based on Sri Lankan
            law. This is not a substitute for professional legal advice. For
            specific legal matters, please consult a qualified attorney.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
