import "./PreviewDocuments.css";
import { FaDownload, FaPrint } from "react-icons/fa";

function formatLabel(label) {
  return label
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .replace(/^\w|\s\w/g, (match) => match.toUpperCase())
    .trim();
}

function PreviewDocuments({ formData = {}, onDownload, onPrint, onClose }) {
  const now = new Date();
  const documentTitle =
    formData.documentTitle ||
    formData.subject ||
    formData.agreementTitle ||
    "Sample Legal Document";

  const partyOne =
    formData.partyOneName ||
    formData.companyName ||
    formData.employerName ||
    formData.senderName ||
    "[Party One Name]";

  const partyTwo =
    formData.partyTwoName ||
    formData.clientName ||
    formData.employeeName ||
    formData.recipientName ||
    "[Party Two Name]";

  const effectiveDate =
    formData.effectiveDate ||
    formData.startDate ||
    formData.terminationDate ||
    formData.date ||
    now.toLocaleDateString();

  const signatureName =
    formData.authorizedSigner ||
    formData.signatoryName ||
    formData.employerName ||
    formData.companyName ||
    "[Authorized Representative]";

  const excludedKeys = [
    "documentTitle",
    "subject",
    "agreementTitle",
    "partyOneName",
    "companyName",
    "employerName",
    "senderName",
    "partyTwoName",
    "clientName",
    "employeeName",
    "recipientName",
    "effectiveDate",
    "startDate",
    "terminationDate",
    "date",
    "authorizedSigner",
    "signatoryName",
  ];

  const detailEntries = Object.entries(formData).filter(
    ([key, value]) =>
      value &&
      typeof value !== "object" &&
      !excludedKeys.includes(key)
  );

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
            <p className="document-subheading">Example Layout</p>
            <h2>{documentTitle.toUpperCase()}</h2>
            <div className="document-meta">
              <p>
                <strong>Effective Date:</strong> {effectiveDate}
              </p>
              <p>
                <strong>Document ID:</strong> DOC-
                {now.getTime().toString().slice(-6)}
              </p>
            </div>
          </div>

          <div className="document-body">
            <div className="document-section document-intro">
              <p>
                This preview shows a neutral example of how your document will
                be structured once you complete the form. Replace the placeholder
                text with your own details to generate a customized legal
                document tailored to your scenario.
              </p>
            </div>

            <div className="document-section">
              <h3>Parties Involved</h3>
              <p>
                This agreement is made between <strong>{partyOne}</strong> and{" "}
                <strong>{partyTwo}</strong>. Both parties acknowledge their
                intent to enter into a legally binding arrangement as of (date).
              </p>
            </div>

            <div className="document-section">
              <h3>Key Clauses</h3>
              <ul className="document-list">
                <li>
                  <strong>Purpose:</strong> Define the objective, scope, and
                  deliverables to ensure both parties share the same
                  expectations.
                </li>
                <li>
                  <strong>Responsibilities:</strong> Outline duties,
                  timelines, and performance standards for each party.
                </li>
                <li>
                  <strong>Terms &amp; Conditions:</strong> Capture payment
                  terms, confidentiality, dispute resolution, and termination
                  procedures.
                </li>
              </ul>
            </div>

            {detailEntries.length > 0 && (
              <div className="document-section">
                <h3>Additional Details From Form</h3>
                <div className="details-grid">
                  {detailEntries.map(([key, value]) => (
                    <div className="details-card" key={key}>
                      <p className="details-label">{formatLabel(key)}</p>
                      <p className="details-value">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="document-section">
              <h3>Closing Statement</h3>
              <p>
                By finalizing this document, the parties agree to uphold the
                terms above and acknowledge that the final generated document
                will reflect the information provided in the customization
                form.
              </p>
            </div>

            <div className="document-signature">
              <div className="signature-line">
                <p>_________________________</p>
                <p>
                  <strong>Authorized Representative</strong>
                </p>
                <p>{signatureName}</p>
                <p>Date: {formData.date || now.toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreviewDocuments;

