import "./agreementSelector.css";

export default function AgreementSelector({ agreements, selected, onSelect }) {
  const categories = {
    Employment: [
      "Employment Contract",
      "Termination Letter",
      "Non-Disclosure Agreement",
    ],
    Business: [
      "Business Contract",
      "Service Agreement",
      "Commission Agreement",
    ],
    Sales: [
      "Bill Of Sale",
      "Asset Purchase Agreement",
      "Consignment Agreement",
    ],
    Legal: ["Contract", "Confidentiality Statement", "Collaboration Agreement"],
    Rental: ["Car Rental Agreement"],
  };

  return (
    <div className="agreement-selector">
      <h3>Select Agreement Type</h3>
      <p className="agreement-subtitle">
        Choose the legal document you need to generate
      </p>

      <div className="agreement-categories">
        {Object.entries(categories).map(([category, docs]) => (
          <div key={category} className="category-section">
            <h4 className="category-title">{category}</h4>
            <div className="category-docs">
              {docs.map((doc) => (
                <button
                  key={doc}
                  className={`agreement-btn ${
                    selected === doc ? "selected" : ""
                  }`}
                  onClick={() => onSelect(doc)}
                >
                  <span className="doc-icon">📄</span>
                  <span className="doc-name">{doc}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
