import {
  FaFileAlt,
  FaEdit,
  FaEye,
  FaDownload,
  FaPrint,
  FaTimes,
  FaCheckCircle,
} from "react-icons/fa";
import "./documentGenerator.css";
import { useState } from "react";
import CustomizeSection from "../CustomizeSection/CustomizeSection";
import PreviewDocuments from "../DocumentPreview/PreviewDocuments";

// Templates Data
const TEMPLATES_DATA = [
  {
    id: 1,
    name: "Employment Contract",
    description: "Standard employment agreement template",
    tips: [
      {
        title: "Ensure all employment terms",
        content:
          "Ensure all employment terms are clearly stated, including job title, responsibilities, and reporting structure.",
      },
      {
        title: "Define compensation package",
        content:
          "Define compensation package including salary, benefits, bonuses, and any stock options or equity.",
      },
      {
        title: "Include provisions for confidentiality",
        content:
          "Include provisions for confidentiality, non-compete clauses, and intellectual property rights.",
      },
      {
        title: "Specify the employment duration",
        content:
          "Specify the employment duration, whether it's permanent, fixed-term, or at-will employment.",
      },
      {
        title: "Detail termination conditions",
        content:
          "Detail termination conditions, notice period, and severance arrangements to protect both parties.",
      },
    ],
    size: "28.5 KB",
    pages: 2,
    rating: 4.5,
    votes: 328,
    image: "/images/template-1-employment-contract.jpg",
    document: "/documents/Employment_Contract.doc",
  },
  {
    id: 2,
    name: "Termination Letter",
    description: "Employee termination notice template",
    tips: [
      {
        title: "Ensure the termination date",
        content:
          "Ensure the termination date is clearly stated and complies with local labor laws.",
      },
      {
        title: "Include the reason for termination",
        content:
          "Include the reason for termination in a professional and factual manner.",
      },
      {
        title: "Specify the final compensation",
        content:
          "Specify the final compensation, unused vacation days, and severance package.",
      },
      {
        title: "Outline the return of company property",
        content:
          "Outline the return of company property and final paycheck details.",
      },
      {
        title: "Include information about benefits",
        content:
          "Include information about benefits continuation and references available upon request.",
      },
    ],
    size: "12.2 KB",
    pages: 1,
    rating: 4.3,
    votes: 245,
    image: "/images/template-2-termination-letter.jpg",
    document: "/documents/Termination_Letter.docx",
  },
  {
    id: 3,
    name: "Non-Disclosure Agreement",
    description: "Confidentiality agreement template",
    tips: [
      {
        title: "Clearly define what information",
        content:
          "Clearly define what information is considered confidential and proprietary.",
      },
      {
        title: "Specify the duration of confidentiality",
        content:
          "Specify the duration of the confidentiality obligation, whether during employment or indefinitely.",
      },
      {
        title: "Include exceptions to confidentiality",
        content:
          "Include exceptions to confidentiality, such as legally required disclosures.",
      },
      {
        title: "Detail consequences of breach",
        content:
          "Detail consequences of breach and remedies available to the disclosing party.",
      },
      {
        title: "Ensure the agreement complies",
        content:
          "Ensure the agreement complies with applicable state and federal laws.",
      },
    ],
    size: "23.2 KB",
    pages: 3,
    rating: 4.4,
    votes: 312,
    image: "/images/template-3-non-disclosure-agreement.jpg",
    document: "/documents/Non_Disclosure_Agreement.docx",
  },
  {
    id: 4,
    name: "Service Agreement",
    description: "Service provider contract template",
    tips: [
      {
        title: "Clearly outline the scope",
        content:
          "Clearly outline the scope of services to be provided and deliverables expected.",
      },
      {
        title: "Define the service duration",
        content:
          "Define the service duration, payment terms, and pricing structure.",
      },
      {
        title: "Include liability limitations",
        content:
          "Include liability limitations and insurance requirements for the service provider.",
      },
      {
        title: "Specify termination conditions",
        content:
          "Specify termination conditions, notice requirements, and cancellation policies.",
      },
      {
        title: "Include dispute resolution procedures",
        content:
          "Include dispute resolution procedures and governing law clauses.",
      },
    ],
    size: "31.5 KB",
    pages: 3,
    rating: 4.6,
    votes: 356,
    image: "/images/template-4-service-agreement.jpg",
    document: "/documents/Service_Agreement.doc",
  },
  {
    id: 5,
    name: "Asset Purchase Agreement",
    description: "Asset Purchase Agreement Templates",
    tips: [
      {
        title: "Clarity and Specificity",
        content:
          "When using an Asset Purchase Agreement template, ensure all assets being purchased are described in precise detail. This includes the condition, location, and any pertinent serial numbers or identifiers.",
      },
      {
        title: "Valuation and Payment Terms",
        content:
          "Clearly outline the agreed-upon price for the assets and the terms of payment. This may involve installments, upfront payments, or other financing arrangements, all of which should be documented accurately.",
      },
      {
        title: "Legal Compliance and Liabilities",
        content:
          "Address all requisite legal compliances, warranties, and representations. Include which party bears liabilities for any debts or legal issues attached to the assets, both before and after the sale.",
      },
    ],
    size: "70 KB",
    pages: 4,
    rating: 4.5,
    votes: 289,
    image: "/images/template-5-asset-purchase-agreement.jpg",
    document: "/documents/Asset_Purchase_Agreement.doc",
  },
  {
    id: 6,
    name: "Bill Of Sale",
    description: "Bill Of Sale template",
    tips: [
      {
        title: "Ensure Accuracy of Details",
        content:
          "Double-check the item's description, including make, model, and serial number, as well as the parties' names and addresses for accuracy. Details must be precise to avoid future disputes.",
      },
      {
        title: "Define Payment Terms",
        content:
          "Clearly outline the agreed payment amount, method, and schedule. It's crucial to state if the sale is conditional on certain payment terms being met to secure a binding agreement.",
      },
      {
        title: "State the Condition of the Item",
        content:
          "Accurately describe the item's condition at the time of sale. This should include any existing faults or warranties to prevent misunderstanding and potential legal issues post-sale.",
      },
    ],
    size: "71.8 KB",
    pages: 1,
    rating: 4.4,
    votes: 264,
    image: "/images/template-6-bill-of-sale.jpg",
    document: "/documents/Bill_Of_Sale.docx",
  },
  {
    id: 7,
    name: "Business Contract",
    description: "Business Contract template",
    tips: [
      {
        title: "Clarity of Terms",
        content:
          "Define all the terms and conditions of the business contract clearly. Each party’s obligations, rights, and responsibilities should be explicitly stated to avoid future disputes.",
      },
      {
        title: "Be Comprehensive",
        content:
          "Ensure that the template covers all potential areas including payment terms, duration, confidentiality, and termination clauses. Tailor it to include specifics relevant to your business scenario.",
      },

      {
        title: "Include payment terms",
        content:
          "Include payment terms, delivery schedules, and performance metrics.",
      },
      {
        title: "Legal Compliance",
        content:
          "Verify that the contract adheres to all applicable laws and regulations. It's essential to consult with a legal professional to confirm that the contract is enforceable in court.",
      },
    ],
    size: "22.5 KB",
    pages: 3,
    rating: 4.5,
    votes: 301,
    image: "/images/template-7-business-contract.jpg",
    document: "/documents/Business_Contract.doc",
  },
  {
    id: 8,
    name: "Car Rental Agreement",
    description: "Car Rental Agreement template",
    tips: [
      {
        title: "Accuracy of Details",
        content:
          "Ensure all vehicle and renter information is correct. Double-check the vehicle identification number (VIN), rental period, and renter's driving license details. Accuracy is crucial for legal protection.",
      },
      {
        title: "Clarity of Terms",
        content:
          "Clearly outline rental terms including payment, insurance coverage, mileage limits, and late return penalties. Precise terms prevent misunderstandings and disputes with renters.",
      },
      {
        title: "Inspection Protocol",
        content:
          "Include a thorough pre-rental vehicle inspection checklist. Documenting the  car's condition before and after rental can help resolve any damage claims or disputes.",
      },
      {
        title: "Specify fuel policy",
        content:
          "Specify fuel policy and any applicable charges for cleaning or maintenance.",
      },
    ],
    size: "35 KB",
    pages: 4,
    rating: 4.3,
    votes: 218,
    image: "/images/template-8-car-rental-agreement.jpg",
    document: "/documents/Car_Rental_Agreement.doc",
  },
  {
    id: 9,
    name: "Collaboration Agreement",
    description: "Collaboration Agreement template",
    tips: [
      {
        title: "Clarity of Roles and Responsibilities",
        content:
          "Clearly delineate each party's obligations and contributions in the collaboration agreement to prevent ambiguities and possible disputes. Specificity is key for a harmonious partnership.",
      },
      {
        title: "Dispute Resolution Mechanisms",
        content:
          "No matter how strong the partnership, disagreements can arise. Include a section that outlines the steps to be taken for conflict resolution, which can save both time and resources.",
      },
      {
        title: "Termination Conditions",
        content:
          "Define the circumstances under which the collaboration may be terminated, including notice periods and final settlement details. This will facilitate a clean and clear conclusion if necessary.",
      },
    ],
    size: "31 KB",
    pages: 2,
    rating: 4.6,
    votes: 334,
    image: "/images/template-9-collaboration-agreement.jpg",
    document: "/documents/Collaboration_Agreement.doc",
  },
  {
    id: 10,
    name: "Commission Agreement",
    description: "Commission Agreement template",
    tips: [
      {
        title: "Specify the Commission Structure",
        content:
          "Clearly define how commissions will be calculated. Include percentages, sales targets, and timeframes to avoid any confusion.",
      },
      {
        title: "Outline Duties and Obligations",
        content:
          "Detail the responsibilities of each party. This helps to set expectations and reduce potential disputes regarding performance and compensation.",
      },
      {
        title: "Define the Duration and Termination Conditions",
        content:
          "Establish the agreement’s effective period and terms under which it can be terminated by either party, ensuring legal protection.",
      },
      {
        title: "Define territory or customer base",
        content:
          "Define territory or customer base for which commissions apply.",
      },
    ],
    size: "44 KB",
    pages: 2,
    rating: 4.4,
    votes: 276,
    image: "/images/template-10-commission-agreement.jpg",
    document: "/documents/Commission_Agreement.doc",
  },
  {
    id: 11,
    name: "Confidentiality Statement",
    description: "Confidentiality Statement template",
    tips: [
      {
        title: "Clarity is Key",
        content:
          "Ensure the confidentiality statement is clear and unequivocal. Avoid legal jargon to make it understandable for all parties involved.",
      },
      {
        title: "Scope of Confidentiality",
        content:
          "Define the scope of the confidential information. Specify what is considered confidential and any exclusions to maintain transparency.",
      },
      {
        title: "Include return or destruction obligations",
        content:
          "Include return or destruction obligations for confidential materials.",
      },
      {
        title: "Obligations and Consequences",
        content:
          "Detail the obligations of the recipient of the confidential information and outline the consequences of breaching the agreement to reinforce its seriousness.",
      },
      {
        title: "Include remedies for breach",
        content:
          "Include remedies for breach and acknowledgment of irreparable harm.",
      },
    ],
    size: "25 KB",
    pages: 1,
    rating: 4.5,
    votes: 242,
    image: "/images/template-11-confidentiality-statement.jpg",
    document: "/documents/Confidentiality_Statement.docx",
  },
  {
    id: 12,
    name: "Contract",
    description: "Contract template",
    tips: [
      {
        title: "Clarity and Specificity",
        content:
          "Ensure that the contract clearly outlines the parties involved, specific terms, responsibilities, timelines, and deliverables. Remove any ambiguous language to prevent misunderstandings.",
      },
      {
        title: "Legally Binding Language",
        content:
          "Use formal and precise language that is typical for contracts. Avoid colloquialism or informal terms that might be misinterpreted or dismissed in legal settings.",
      },

      {
        title: "Key Provisions and Contingencies",
        content:
          "Include crucial provisions such as confidentiality clauses, dispute resolution mechanisms, and termination conditions. Address any possible contingencies to cover unforeseen circumstances.",
      },
      {
        title: "Ensure all parties have legal capacity",
        content:
          "Ensure all parties have legal capacity and authority to execute the contract.",
      },
    ],
    size: "14 KB",
    pages: 1,
    rating: 4.4,
    votes: 298,
    image: "/images/template-12-contract.jpg",
    document: "/documents/Contract.docx",
  },
  {
    id: 13,
    name: "Consignment Agreement",
    description: "Consignment Agreement template",
    tips: [
      {
        title: "Clarity of Terms",
        content:
          "Ensure all critical elements such as consignment duration, revenue share, and item handling are well-defined to prevent misunderstandings.",
      },
      {
        title: "Inventory List",
        content:
          "Include a detailed inventory list with descriptions of the consigned items to maintain accuracy and accountability throughout the consignment period.",
      },
      {
        title: "Legal Requirements",
        content:
          "Familiarize yourself with local laws governing consignments to ensure the agreement complies with regional statutes and regulations.",
      },
      {
        title: "Detail inventory management",
        content:
          "Detail inventory management, storage, and insurance responsibilities.",
      },
    ],
    size: "39 KB",
    pages: 2,
    rating: 4.3,
    votes: 255,
    image: "/images/template-13-consignment-agreement.jpg",
    document: "/documents/Consignment_Agreement.docx",
  },
];

// Document Generator Component
function DocumentGenerator() {
  const [activeTab, setActiveTab] = useState("template");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({
    employerName: "",
    employeeName: "",
    terminationDate: "",
    noticePeriod: "",
    severanceAmount: "",
    date: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission logic here
  };

  const handlePreview = () => {
    setActiveTab("preview");
  };

  const handleDownload = () => {
    console.log("Downloading document...");
    // Handle document download logic here
  };

  const handlePrint = () => {
    window.print();
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setImageError(false); // Reset image error when selecting a new template
  };

  const handleTemplateDownload = (template, event) => {
    if (event) {
      event.stopPropagation(); // Prevent template selection when clicking download
    }

    if (!template.document) {
      alert(`Document not available for ${template.name}`);
      return;
    }

    // Create a link element to download the document
    const link = document.createElement("a");
    link.href = template.document;

    // Extract file extension from the document path
    const fileExtension = template.document.split(".").pop();
    link.download = `${template.name.replace(/\s+/g, "_")}.${fileExtension}`;

    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const closeTemplateModal = () => {
    setSelectedTemplate(null);
  };

  return (
    // Document Generator section
    <section className="document-generator">
      <div className="doc-generator-header">
        <h2>
          <FaFileAlt /> Legal Document Generator
        </h2>
      </div>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button
          className={`tab-btn ${activeTab === "template" ? "active" : ""}`}
          onClick={() => setActiveTab("template")}
        >
          <FaFileAlt /> Select Template
        </button>
        <button
          className={`tab-btn ${activeTab === "customize" ? "active" : ""}`}
          onClick={() => setActiveTab("customize")}
        >
          <FaEdit /> Customize
        </button>
        <button
          className={`tab-btn ${activeTab === "preview" ? "active" : ""}`}
          onClick={() => setActiveTab("preview")}
        >
          <FaEye /> Preview Documents
        </button>
      </div>

      {/* Template Selection Tab */}
      {activeTab === "template" && (
        <div className="template-section">
          <h3>Choose a Document Template</h3>
          <div className="template-grid">
            {TEMPLATES_DATA.map((template) => (
              <div key={template.id} className="template-card">
                <FaFileAlt className="template-icon" />
                <h4>{template.name}</h4>
                <p>{template.description}</p>
                <div className="template-card-actions">
                  <button
                    className="select-btn"
                    onClick={() => handleTemplateSelect(template)}
                  >
                    Select Template
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Template Details Modal */}
      {selectedTemplate && (
        <div className="template-modal-overlay" onClick={closeTemplateModal}>
          <div
            className="template-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close-btn" onClick={closeTemplateModal}>
              <FaTimes />
            </button>

            <div className="modal-header">
              <h2>{selectedTemplate.name}</h2>
            </div>

            <div className="modal-body">
              <div className="modal-grid">
                {/* Tips Section */}
                <div className="tips-section">
                  <h3>Tips For Using {selectedTemplate.name} Templates</h3>
                  <div className="tips-list">
                    {selectedTemplate.tips.map((tip, index) => {
                      return (
                        <div key={index} className="tip-block">
                          <h4>
                            <strong>
                              {index + 1}. {tip.title}:
                            </strong>
                          </h4>
                          <p>{tip.content}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Template Details Section */}
                <div className="template-details-section">
                  <div className="template-preview-box">
                    {selectedTemplate.image && !imageError ? (
                      <img
                        src={selectedTemplate.image}
                        alt={selectedTemplate.name}
                        className="template-preview-image"
                        onError={() => setImageError(true)}
                      />
                    ) : (
                      <div className="template-icon-large">
                        <FaFileAlt />
                      </div>
                    )}
                    <h4>{selectedTemplate.name}</h4>
                  </div>

                  <div className="template-info">
                    <div className="info-row">
                      <span className="info-label">File Size:</span>
                      <span className="info-value">
                        {selectedTemplate.size}
                      </span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Pages:</span>
                      <span className="info-value">
                        {selectedTemplate.pages}
                      </span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Rating:</span>
                      <span className="info-value">
                        ⭐ {selectedTemplate.rating}/5 ({selectedTemplate.votes}{" "}
                        votes)
                      </span>
                    </div>
                  </div>

                  {selectedTemplate.document && (
                    <div className="template-actions">
                      <button
                        className="download-btn"
                        onClick={() => handleTemplateDownload(selectedTemplate)}
                      >
                        <FaDownload /> Download Now
                      </button>
                    </div>
                  )}

                  <div className="template-features">
                    <h5>Template Includes:</h5>
                    <ul>
                      <li>
                        <FaCheckCircle /> Professional formatting
                      </li>
                      <li>
                        <FaCheckCircle /> Legal compliance
                      </li>
                      <li>
                        <FaCheckCircle /> Customizable sections
                      </li>
                      <li>
                        <FaCheckCircle /> Ready to use
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Customize Tab */}
      {activeTab === "customize" && (
        <CustomizeSection
          formData={formData}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          onPreview={handlePreview}
        />
      )}

      {/* Preview Documents Tab */}
      {activeTab === "preview" && (
        <PreviewDocuments
          formData={formData}
          onDownload={handleDownload}
          onPrint={handlePrint}
          onClose={() => setActiveTab("customize")}
        />
      )}
    </section>
  );
}

export default DocumentGenerator;
