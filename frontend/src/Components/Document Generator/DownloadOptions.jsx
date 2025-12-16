import "./downloadOptions.css";

export default function DownloadOptions({
  documentContent,
  agreementType,
  onDownloadPDF,
  onDownloadDOCX,
  onCopyText,
  loading,
}) {
  return (
    <div className="download-options">
      <h4>Download Options</h4>

      <div className="download-buttons">
        <button
          className="download-btn pdf-btn"
          onClick={() => onDownloadPDF(documentContent, agreementType)}
          disabled={loading}
        >
          <span className="btn-icon">📄</span>
          <span className="btn-text">Download PDF</span>
        </button>

        <button
          className="download-btn docx-btn"
          onClick={() => onDownloadDOCX(documentContent, agreementType)}
          disabled={loading}
        >
          <span className="btn-icon">📝</span>
          <span className="btn-text">Download DOCX</span>
        </button>

        <button
          className="download-btn copy-btn"
          onClick={onCopyText}
          disabled={loading}
        >
          <span className="btn-icon">📋</span>
          <span className="btn-text">Copy Text</span>
        </button>

        <button
          className="download-btn print-btn"
          onClick={() => window.print()}
          disabled={loading}
        >
          <span className="btn-icon">🖨</span>
          <span className="btn-text">Print</span>
        </button>
      </div>

      <div className="file-info">
        <p>
          <strong>Formats available:</strong> PDF, DOCX, Text
        </p>
        <p className="file-size">
          Approximate size: {Math.ceil(documentContent.length / 1024)} KB
        </p>
      </div>
    </div>
  );
}
