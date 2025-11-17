import "./PreviewDocuments.css";
import { FaDownload, FaPrint } from "react-icons/fa";

function PreviewDocuments({ formData, onDownload, onPrint, onClose }) {
  return (
    <div className="preview-section">
      <h3>Document Preview</h3>
      <div className="preview-container">
        <div className="preview-toolbar">
          <button className="toolbar-btn" onClick={onDownload}>
            <FaDownload /> Download
          </button>
          <button className="toolbar-btn" onClick={onPrint}>
            <FaPrint /> Print
          </button>
          <button className="toolbar-btn" onClick={onClose}>
            Close Preview
          </button>
        </div>

        <div className="document-preview">
          <div className="document-header">
            <h2>EMPLOYMENT TERMINATION NOTICE</h2>
            <div className="document-meta">
              <p>
                <strong>Date:</strong>{" "}
                {formData.date || new Date().toLocaleDateString()}
              </p>
              <p>
                <strong>Document ID:</strong> ETN-
                {Date.now().toString().slice(-6)}
              </p>
            </div>
          </div>

          <div className="document-body">
            <div className="document-section">
              <h3>To:</h3>
              <p>
                <strong>Employee Name:</strong>{" "}
                {formData.employeeName || "[Employee Name]"}
              </p>
              <p>
                <strong>Address:</strong> [Employee Address]
              </p>
            </div>

            <div className="document-section">
              <h3>From:</h3>
              <p>
                <strong>Employer:</strong>{" "}
                {formData.employerName || "[Employer Name]"}
              </p>
              <p>
                <strong>Address:</strong> [Employer Address]
              </p>
            </div>

            <div className="document-section">
              <h3>Subject: Notice of Employment Termination</h3>
              <p>Dear {formData.employeeName || "[Employee Name]"},</p>

              <p>
                This letter serves as formal notice of the termination of your
                employment with {formData.employerName || "[Employer Name]"},
                effective {formData.terminationDate || "[Termination Date]"}.
              </p>

              <p>
                As per your employment agreement, you are entitled to a notice
                period of {formData.noticePeriod || "[Notice Period]"}. During
                this period, you will continue to receive your regular salary
                and benefits.
              </p>

              <p>
                Additionally, you will receive a severance payment of $
                {formData.severanceAmount || "[Severance Amount]"} as outlined
                in your employment contract.
              </p>

              <p>
                Please ensure that all company property is returned by your last
                working day. Your final paycheck will be processed according to
                company policy.
              </p>

              <p>
                We thank you for your service and wish you the best in your
                future endeavors.
              </p>
            </div>

            <div className="document-signature">
              <div className="signature-line">
                <p>_________________________</p>
                <p>
                  <strong>Authorized Signature</strong>
                </p>
                <p>{formData.employerName || "[Employer Name]"}</p>
                <p>
                  Date: {formData.date || new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreviewDocuments;

