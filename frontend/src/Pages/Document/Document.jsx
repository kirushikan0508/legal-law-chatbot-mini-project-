import { useState, useContext } from "react";
import "./document.css";
import Navbar from "../../Components/Navbar/Navbar";
import AgreementSelector from "../../Components/Document Generator/AgreementSelector";
import AgreementForm from "../../Components/Document Generator/AgreementForm";
import DocumentPreview from "../../Components/Document Generator/DocumentPreview";
import DownloadOptions from "../../Components/Document Generator/DownloadOptions";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import { FaFileContract, FaDownload, FaMagic } from "react-icons/fa";

const agreements = [
  "Employment Contract",
  "Termination Letter",
  "Non-Disclosure Agreement",
  "Bill Of Sale",
  "Service Agreement",
  "Asset Purchase Agreement",
  "Business Contract",
  "Car Rental Agreement",
  "Collaboration Agreement",
  "Commission Agreement",
  "Confidentiality Statement",
  "Contract",
  "Consignment Agreement",
];

export default function Document() {
  const [selectedAgreement, setSelectedAgreement] = useState(
    "Employment Contract"
  );
  const [step, setStep] = useState(1); // 1: Select, 2: Form, 3: Preview
  const [documentContent, setDocumentContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});

  const { token, user } = useContext(StoreContext);

  const handleAgreementSelect = (agreement) => {
    setSelectedAgreement(agreement);
    setStep(2);
  };

  const handleFormSubmit = async (data) => {
    if (!token || !user) {
      toast.error("Please login to generate documents");
      return;
    }

    setFormData(data);
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:4000/api/document/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          body: JSON.stringify({
            agreementType: selectedAgreement,
            userDetails: data,
            userId: user.id,
          }),
        }
      );

      const result = await response.json();

      if (result.success) {
        setDocumentContent(result.document);
        setStep(3);
        toast.success("Document generated successfully!");
      } else {
        toast.error(result.message || "Failed to generate document");
      }
    } catch (error) {
      console.error("Error generating document:", error);
      toast.error("Failed to generate document. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (step === 3) {
      setStep(2);
    } else if (step === 2) {
      setStep(1);
    }
  };

  const handleClosePreview = () => {
    setStep(2);
  };

  const handleDownloadPDF = async (content, filename) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/document/convert-pdf",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          body: JSON.stringify({
            content: documentContent,
            agreementType: selectedAgreement,
            metadata: formData,
          }),
        }
      );

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${selectedAgreement.replace(
          /\s+/g,
          "_"
        )}_${Date.now()}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        toast.success("PDF downloaded successfully!");
      }
    } catch (error) {
      console.error("Error downloading PDF:", error);
      toast.error("Failed to download PDF");
    }
  };

  const handleDownloadDOCX = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/document/convert-docx",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          body: JSON.stringify({
            content: documentContent,
            agreementType: selectedAgreement,
          }),
        }
      );

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${selectedAgreement.replace(
          /\s+/g,
          "_"
        )}_${Date.now()}.docx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        toast.success("DOCX downloaded successfully!");
      }
    } catch (error) {
      console.error("Error downloading DOCX:", error);
      toast.error("Failed to download DOCX");
    }
  };

  const handleCopyText = () => {
    navigator.clipboard
      .writeText(documentContent)
      .then(() => toast.success("Document copied to clipboard!"))
      .catch(() => toast.error("Failed to copy text"));
  };

  return (
    <div className="document-page">
      <Navbar />

      <div className="document-container">
        <header className="document-header">
          <div className="header-icon">
            <FaFileContract />
          </div>
          <h1>Legal Document Generator</h1>
          <p>
            Create professional legal documents tailored to Sri Lankan law in
            minutes
          </p>
        </header>

        <div className="document-stepper">
          <div className={`stepper-item ${step >= 1 ? "active" : ""}`}>
            <div className="stepper-number">1</div>
            <span className="stepper-label">Select Agreement</span>
          </div>
          <div className={`stepper-line ${step >= 2 ? "active" : ""}`}></div>
          <div className={`stepper-item ${step >= 2 ? "active" : ""}`}>
            <div className="stepper-number">2</div>
            <span className="stepper-label">Enter Details</span>
          </div>
          <div className={`stepper-line ${step >= 3 ? "active" : ""}`}></div>
          <div className={`stepper-item ${step >= 3 ? "active" : ""}`}>
            <div className="stepper-number">3</div>
            <span className="stepper-label">Download</span>
          </div>
        </div>

        <div className="document-content">
          {step === 1 && (
            <AgreementSelector
              agreements={agreements}
              selected={selectedAgreement}
              onSelect={handleAgreementSelect}
            />
          )}

          {step === 2 && (
            <div className="form-section">
              <button className="back-btn" onClick={handleBack}>
                ← Back to Agreements
              </button>
              <AgreementForm
                agreementType={selectedAgreement}
                onSubmit={handleFormSubmit}
                loading={loading}
              />
            </div>
          )}

          {step === 3 && (
            <div className="preview-section">
              <button className="back-btn" onClick={handleBack}>
                ← Edit Details
              </button>

              <div className="preview-container">
                <DocumentPreview
                  content={documentContent}
                  agreementType={selectedAgreement}
                  onClose={handleClosePreview}
                />

                <DownloadOptions
                  documentContent={documentContent}
                  agreementType={selectedAgreement}
                  onDownloadPDF={handleDownloadPDF}
                  onDownloadDOCX={handleDownloadDOCX}
                  onCopyText={handleCopyText}
                  loading={loading}
                />
              </div>
            </div>
          )}
        </div>

        <div className="document-features">
          <div className="feature-card">
            <FaMagic className="feature-icon" />
            <h4>AI-Powered</h4>
            <p>Smart document generation using Gemini AI</p>
          </div>
          <div className="feature-card">
            <FaFileContract className="feature-icon" />
            <h4>Legal Compliance</h4>
            <p>Tailored for Sri Lankan legal framework</p>
          </div>
          <div className="feature-card">
            <FaDownload className="feature-icon" />
            <h4>Multiple Formats</h4>
            <p>Download as PDF, DOCX, or plain text</p>
          </div>
        </div>

        <div className="legal-disclaimer">
          <p>
            <strong>Important:</strong> These documents are generated by AI and
            should be reviewed by a qualified legal professional in Sri Lanka
            before use. The creators are not liable for any legal consequences
            arising from the use of these documents.
          </p>
        </div>
      </div>
    </div>
  );
}
