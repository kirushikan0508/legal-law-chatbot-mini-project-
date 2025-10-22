import Navbar from "../../Components/Navbar/Navbar";
import ChatInput from "../../Components/ChatInput/ChatInput";
import "./home.css";
import { FaBalanceScale, FaFileAlt, FaUser, FaCalendarAlt, FaDollarSign, FaBuilding, FaEdit, FaEye, FaDownload, FaPrint } from "react-icons/fa";
import { useState } from "react";

function Home() {
  const [activeTab, setActiveTab] = useState('template');
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    employerName: '',
    employeeName: '',
    terminationDate: '',
    noticePeriod: '',
    severanceAmount: '',
    date: ''
  });

  const handleUserQuery = (query) => {
    console.log("User question:", query);
    // later connect this with your chatbot backend
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleDownload = () => {
    console.log('Downloading document...');
    // Handle document download logic here
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="home-container">

       <Navbar /> {/* 👈 add this here */}
       
      {/* Header */}
      <header className="home-header">
        <h1> <FaBalanceScale/> Legal Assistant AI</h1>
        <p>Sri Lanka Law Guidance</p>
      </header>

      {/* Disclaimer */}
      <section className="disclaimer">
        <p>
          <strong>Legal Disclaimer:</strong> This AI provides general legal
          information only. For specific legal advice, consult a qualified Sri
          Lankan attorney.
        </p>
      </section>

      {/* Chat Section */}
      <section className="chat-section">
        <ChatInput onSend={handleUserQuery} />
      </section>

      {/* Document Generator Section */}
      <section className="document-generator">
        <div className="doc-generator-header">
          <h2><FaFileAlt /> Legal Document Generator</h2>
        </div>

        {/* Tab Navigation */}
        <div className="tab-navigation">
          <button 
            className={`tab-btn ${activeTab === 'template' ? 'active' : ''}`}
            onClick={() => setActiveTab('template')}
          >
            <FaFileAlt /> Select Template
          </button>
          <button 
            className={`tab-btn ${activeTab === 'customize' ? 'active' : ''}`}
            onClick={() => setActiveTab('customize')}
          >
            <FaEdit /> Customize
          </button>
          <button 
            className={`tab-btn ${activeTab === 'preview' ? 'active' : ''}`}
            onClick={() => setActiveTab('preview')}
          >
            <FaEye /> Preview Documents
          </button>
        </div>

        {/* Template Selection Tab */}
        {activeTab === 'template' && (
          <div className="template-section">
            <h3>Choose a Document Template</h3>
            <div className="template-grid">
              <div className="template-card">
                <FaFileAlt className="template-icon" />
                <h4>Employment Contract</h4>
                <p>Standard employment agreement template</p>
                <button className="select-btn">Select Template</button>
              </div>
              <div className="template-card">
                <FaFileAlt className="template-icon" />
                <h4>Termination Letter</h4>
                <p>Employee termination notice template</p>
                <button className="select-btn">Select Template</button>
              </div>
              <div className="template-card">
                <FaFileAlt className="template-icon" />
                <h4>Non-Disclosure Agreement</h4>
                <p>Confidentiality agreement template</p>
                <button className="select-btn">Select Template</button>
              </div>
              <div className="template-card">
                <FaFileAlt className="template-icon" />
                <h4>Service Agreement</h4>
                <p>Service provider contract template</p>
                <button className="select-btn">Select Template</button>
              </div>
            </div>
          </div>
        )}

        {/* Customize Tab */}
        {activeTab === 'customize' && (
          <div className="customize-section">
            <h3>Customize Your Document</h3>
            <form onSubmit={handleSubmit} className="customize-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="employerName">
                    <FaBuilding /> Employer Name
                  </label>
                  <input
                    type="text"
                    id="employerName"
                    name="employerName"
                    value={formData.employerName}
                    onChange={handleInputChange}
                    placeholder="Enter employer name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="employeeName">
                    <FaUser /> Employee Name
                  </label>
                  <input
                    type="text"
                    id="employeeName"
                    name="employeeName"
                    value={formData.employeeName}
                    onChange={handleInputChange}
                    placeholder="Enter employee name"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="terminationDate">
                    <FaCalendarAlt /> Termination Date
                  </label>
                  <input
                    type="date"
                    id="terminationDate"
                    name="terminationDate"
                    value={formData.terminationDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="noticePeriod">
                    <FaCalendarAlt /> Notice Period
                  </label>
                  <input
                    type="text"
                    id="noticePeriod"
                    name="noticePeriod"
                    value={formData.noticePeriod}
                    onChange={handleInputChange}
                    placeholder="e.g., 30 days"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="severanceAmount">
                    <FaDollarSign /> Severance Amount
                  </label>
                  <input
                    type="number"
                    id="severanceAmount"
                    name="severanceAmount"
                    value={formData.severanceAmount}
                    onChange={handleInputChange}
                    placeholder="Enter amount"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="date">
                    <FaCalendarAlt /> Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="generate-btn">
                  <FaFileAlt /> Generate Document
                </button>
                <button type="button" className="preview-btn" onClick={handlePreview}>
                  <FaEye /> Preview Document
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Preview Documents Tab */}
        {activeTab === 'preview' && (
          <div className="preview-section">
            <h3>Document Preview</h3>
            <div className="preview-container">
              <div className="preview-toolbar">
                <button className="toolbar-btn" onClick={handleDownload}>
                  <FaDownload /> Download
                </button>
                <button className="toolbar-btn" onClick={handlePrint}>
                  <FaPrint /> Print
                </button>
                <button className="toolbar-btn" onClick={() => setShowPreview(false)}>
                  Close Preview
                </button>
              </div>
              
              <div className="document-preview">
                <div className="document-header">
                  <h2>EMPLOYMENT TERMINATION NOTICE</h2>
                  <div className="document-meta">
                    <p><strong>Date:</strong> {formData.date || new Date().toLocaleDateString()}</p>
                    <p><strong>Document ID:</strong> ETN-{Date.now().toString().slice(-6)}</p>
                  </div>
                </div>

                <div className="document-body">
                  <div className="document-section">
                    <h3>To:</h3>
                    <p><strong>Employee Name:</strong> {formData.employeeName || '[Employee Name]'}</p>
                    <p><strong>Address:</strong> [Employee Address]</p>
                  </div>

                  <div className="document-section">
                    <h3>From:</h3>
                    <p><strong>Employer:</strong> {formData.employerName || '[Employer Name]'}</p>
                    <p><strong>Address:</strong> [Employer Address]</p>
                  </div>

                  <div className="document-section">
                    <h3>Subject: Notice of Employment Termination</h3>
                    <p>Dear {formData.employeeName || '[Employee Name]'},</p>
                    
                    <p>This letter serves as formal notice of the termination of your employment with {formData.employerName || '[Employer Name]'}, effective {formData.terminationDate || '[Termination Date]'}.</p>

                    <p>As per your employment agreement, you are entitled to a notice period of {formData.noticePeriod || '[Notice Period]'}. During this period, you will continue to receive your regular salary and benefits.</p>

                    <p>Additionally, you will receive a severance payment of ${formData.severanceAmount || '[Severance Amount]'} as outlined in your employment contract.</p>

                    <p>Please ensure that all company property is returned by your last working day. Your final paycheck will be processed according to company policy.</p>

                    <p>We thank you for your service and wish you the best in your future endeavors.</p>
                  </div>

                  <div className="document-signature">
                    <div className="signature-line">
                      <p>_________________________</p>
                      <p><strong>Authorized Signature</strong></p>
                      <p>{formData.employerName || '[Employer Name]'}</p>
                      <p>Date: {formData.date || new Date().toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
