import "./CustomizeSection.css";
import { useState } from "react";
import {
  FaBuilding,
  FaUser,
  FaCalendarAlt,
  FaDollarSign,
  FaFileAlt,
  FaEye,
  FaDownload,
  FaEdit,
  FaShieldAlt,
  FaHandshake,
  FaHome,
  FaGavel,
  FaFileContract,
} from "react-icons/fa";
import jsPDF from "jspdf";

// Template definitions with their form fields
const DOCUMENT_TEMPLATES = [
  {
    id: 1,
    name: "Employment Contract",
    icon: FaBuilding,
    fields: [
      { name: "employerName", label: "Employer Name", type: "text", icon: FaBuilding },
      { name: "employeeName", label: "Employee Name", type: "text", icon: FaUser },
      { name: "jobTitle", label: "Job Title", type: "text", icon: FaFileAlt },
      { name: "startDate", label: "Start Date", type: "date", icon: FaCalendarAlt },
      { name: "salary", label: "Annual Salary", type: "number", icon: FaDollarSign },
      { name: "workLocation", label: "Work Location", type: "text", icon: FaBuilding },
    ],
    generateDocument: (data) => {
      return `EMPLOYMENT CONTRACT

Date: ${data.date || new Date().toLocaleDateString()}

This Employment Contract ("Contract") is entered into on ${data.startDate || "[Start Date]"} between:

EMPLOYER: ${data.employerName || "[Employer Name]"}
Address: [Employer Address]

EMPLOYEE: ${data.employeeName || "[Employee Name]"}
Address: [Employee Address]

1. POSITION AND DUTIES
The Employee agrees to serve as ${data.jobTitle || "[Job Title]"} and will perform all duties and responsibilities associated with this position. The Employee will report to [Supervisor Name] and work at ${data.workLocation || "[Work Location]"}.

2. COMPENSATION
The Employee will receive an annual salary of $${data.salary || "[Salary]"} payable in accordance with the Employer's standard payroll practices. The salary will be subject to applicable deductions and withholdings.

3. TERM OF EMPLOYMENT
This employment shall commence on ${data.startDate || "[Start Date]"} and shall continue until terminated by either party in accordance with the terms of this Contract.

4. CONFIDENTIALITY
The Employee agrees to maintain the confidentiality of all proprietary information and trade secrets of the Employer.

5. TERMINATION
Either party may terminate this employment relationship at any time with or without cause, subject to applicable notice requirements.

IN WITNESS WHEREOF, the parties have executed this Contract as of the date first written above.

_________________________          _________________________
${data.employerName || "[Employer Name]"}          ${data.employeeName || "[Employee Name]"}
Employer                              Employee

Date: ${data.date || new Date().toLocaleDateString()}`;
    },
  },
  {
    id: 2,
    name: "Non-Disclosure Agreement",
    icon: FaShieldAlt,
    fields: [
      { name: "disclosingParty", label: "Disclosing Party", type: "text", icon: FaUser },
      { name: "receivingParty", label: "Receiving Party", type: "text", icon: FaUser },
      { name: "purpose", label: "Purpose of Disclosure", type: "text", icon: FaFileAlt },
      { name: "effectiveDate", label: "Effective Date", type: "date", icon: FaCalendarAlt },
      { name: "duration", label: "Duration (years)", type: "number", icon: FaCalendarAlt },
    ],
    generateDocument: (data) => {
      return `NON-DISCLOSURE AGREEMENT

Date: ${data.date || new Date().toLocaleDateString()}

This Non-Disclosure Agreement ("Agreement") is entered into on ${data.effectiveDate || "[Effective Date]"} between:

DISCLOSING PARTY: ${data.disclosingParty || "[Disclosing Party]"}
Address: [Disclosing Party Address]

RECEIVING PARTY: ${data.receivingParty || "[Receiving Party]"}
Address: [Receiving Party Address]

1. PURPOSE
The purpose of this Agreement is to allow the parties to discuss ${data.purpose || "[Purpose of Disclosure]"} while protecting confidential information.

2. DEFINITION OF CONFIDENTIAL INFORMATION
Confidential Information includes all non-public, proprietary, or confidential information disclosed by the Disclosing Party to the Receiving Party, whether orally, in writing, or in any other form.

3. OBLIGATIONS
The Receiving Party agrees to:
- Hold all Confidential Information in strict confidence
- Not disclose any Confidential Information to third parties
- Use Confidential Information solely for the stated purpose
- Take reasonable precautions to protect the Confidential Information

4. DURATION
This Agreement shall remain in effect for ${data.duration || "[Duration]"} years from the Effective Date, or until terminated by mutual written consent.

5. RETURN OF INFORMATION
Upon termination, the Receiving Party shall return or destroy all Confidential Information and any copies thereof.

IN WITNESS WHEREOF, the parties have executed this Agreement.

_________________________          _________________________
${data.disclosingParty || "[Disclosing Party]"}          ${data.receivingParty || "[Receiving Party]"}
Disclosing Party                      Receiving Party

Date: ${data.date || new Date().toLocaleDateString()}`;
    },
  },
  {
    id: 3,
    name: "Service Agreement",
    icon: FaHandshake,
    fields: [
      { name: "serviceProvider", label: "Service Provider", type: "text", icon: FaUser },
      { name: "client", label: "Client", type: "text", icon: FaUser },
      { name: "serviceDescription", label: "Service Description", type: "text", icon: FaFileAlt },
      { name: "startDate", label: "Start Date", type: "date", icon: FaCalendarAlt },
      { name: "endDate", label: "End Date", type: "date", icon: FaCalendarAlt },
      { name: "paymentAmount", label: "Payment Amount", type: "number", icon: FaDollarSign },
    ],
    generateDocument: (data) => {
      return `SERVICE AGREEMENT

Date: ${data.date || new Date().toLocaleDateString()}

This Service Agreement ("Agreement") is entered into on ${data.startDate || "[Start Date]"} between:

SERVICE PROVIDER: ${data.serviceProvider || "[Service Provider]"}
Address: [Service Provider Address]

CLIENT: ${data.client || "[Client]"}
Address: [Client Address]

1. SERVICES
The Service Provider agrees to provide the following services: ${data.serviceDescription || "[Service Description]"}.

2. TERM
This Agreement shall commence on ${data.startDate || "[Start Date]"} and shall continue until ${data.endDate || "[End Date]"} unless earlier terminated in accordance with the terms of this Agreement.

3. COMPENSATION
The Client agrees to pay the Service Provider the sum of $${data.paymentAmount || "[Payment Amount]"} for the services rendered. Payment shall be made as follows: [Payment Terms].

4. OBLIGATIONS
The Service Provider shall:
- Perform all services in a professional and workmanlike manner
- Comply with all applicable laws and regulations
- Maintain appropriate insurance coverage

The Client shall:
- Provide necessary information and cooperation
- Make timely payments as specified
- Not interfere with the Service Provider's performance

5. TERMINATION
Either party may terminate this Agreement with [X] days written notice to the other party.

IN WITNESS WHEREOF, the parties have executed this Agreement.

_________________________          _________________________
${data.serviceProvider || "[Service Provider]"}          ${data.client || "[Client]"}
Service Provider                      Client

Date: ${data.date || new Date().toLocaleDateString()}`;
    },
  },
  {
    id: 4,
    name: "Lease Agreement",
    icon: FaHome,
    fields: [
      { name: "landlord", label: "Landlord Name", type: "text", icon: FaUser },
      { name: "tenant", label: "Tenant Name", type: "text", icon: FaUser },
      { name: "propertyAddress", label: "Property Address", type: "text", icon: FaHome },
      { name: "leaseStart", label: "Lease Start Date", type: "date", icon: FaCalendarAlt },
      { name: "leaseEnd", label: "Lease End Date", type: "date", icon: FaCalendarAlt },
      { name: "monthlyRent", label: "Monthly Rent", type: "number", icon: FaDollarSign },
    ],
    generateDocument: (data) => {
      return `LEASE AGREEMENT

Date: ${data.date || new Date().toLocaleDateString()}

This Lease Agreement ("Lease") is entered into on ${data.leaseStart || "[Lease Start Date]"} between:

LANDLORD: ${data.landlord || "[Landlord Name]"}
Address: [Landlord Address]

TENANT: ${data.tenant || "[Tenant Name]"}
Address: [Tenant Address]

1. PROPERTY
The Landlord hereby leases to the Tenant, and the Tenant hereby leases from the Landlord, the following property:
${data.propertyAddress || "[Property Address]"}

2. TERM
The term of this Lease shall commence on ${data.leaseStart || "[Lease Start Date]"} and shall continue until ${data.leaseEnd || "[Lease End Date]"}.

3. RENT
The Tenant agrees to pay monthly rent in the amount of $${data.monthlyRent || "[Monthly Rent]"} per month, due on the [Day] of each month. Rent shall be paid to the Landlord at [Payment Address].

4. SECURITY DEPOSIT
The Tenant has deposited with the Landlord the sum of $[Security Deposit Amount] as security for the faithful performance of the Tenant's obligations under this Lease.

5. USE OF PROPERTY
The Tenant shall use the property solely for residential purposes and shall not use the property for any illegal or improper purpose.

6. MAINTENANCE AND REPAIRS
The Tenant shall maintain the property in good condition and promptly notify the Landlord of any necessary repairs.

IN WITNESS WHEREOF, the parties have executed this Lease.

_________________________          _________________________
${data.landlord || "[Landlord Name]"}          ${data.tenant || "[Tenant Name]"}
Landlord                              Tenant

Date: ${data.date || new Date().toLocaleDateString()}`;
    },
  },
  {
    id: 5,
    name: "Power of Attorney",
    icon: FaGavel,
    fields: [
      { name: "principal", label: "Principal Name", type: "text", icon: FaUser },
      { name: "agent", label: "Agent/Attorney Name", type: "text", icon: FaUser },
      { name: "effectiveDate", label: "Effective Date", type: "date", icon: FaCalendarAlt },
      { name: "scope", label: "Scope of Authority", type: "text", icon: FaFileAlt },
    ],
    generateDocument: (data) => {
      return `POWER OF ATTORNEY

Date: ${data.date || new Date().toLocaleDateString()}

I, ${data.principal || "[Principal Name]"}, of [Principal Address], hereby appoint ${data.agent || "[Agent Name]"}, of [Agent Address], as my true and lawful attorney-in-fact to act in my name, place, and stead.

1. GRANT OF AUTHORITY
I grant my attorney-in-fact full power and authority to do and perform all acts necessary or incidental to: ${data.scope || "[Scope of Authority]"}.

2. EFFECTIVE DATE
This Power of Attorney shall become effective on ${data.effectiveDate || "[Effective Date]"} and shall remain in effect until [Termination Date or Event].

3. POWERS GRANTED
My attorney-in-fact shall have the power to:
- Execute contracts and agreements on my behalf
- Manage my financial affairs
- Make decisions regarding [Specific Matters]
- Represent me in legal and business matters

4. LIMITATIONS
This Power of Attorney does not grant authority to:
- Make healthcare decisions (unless specifically authorized)
- Transfer property to the attorney-in-fact
- [Other Limitations]

5. REVOCATION
I reserve the right to revoke this Power of Attorney at any time by providing written notice to my attorney-in-fact.

IN WITNESS WHEREOF, I have executed this Power of Attorney on the date first written above.

_________________________
${data.principal || "[Principal Name]"}
Principal

WITNESSED BY:

_________________________          _________________________
Witness Name                         Witness Name

Date: ${data.date || new Date().toLocaleDateString()}`;
    },
  },
  {
    id: 6,
    name: "Other (Custom Legal Letter)",
    icon: FaFileContract,
    fields: [
      { name: "senderName", label: "Sender Name", type: "text", icon: FaUser },
      { name: "recipientName", label: "Recipient Name", type: "text", icon: FaUser },
      { name: "subject", label: "Subject", type: "text", icon: FaFileAlt },
      { name: "letterDate", label: "Date", type: "date", icon: FaCalendarAlt },
    ],
    generateDocument: (data) => {
      return `LEGAL LETTER

Date: ${data.letterDate || new Date().toLocaleDateString()}

From:
${data.senderName || "[Sender Name]"}
[Sender Address]
[Sender City, State ZIP]
[Sender Email]
[Sender Phone]

To:
${data.recipientName || "[Recipient Name]"}
[Recipient Address]
[Recipient City, State ZIP]

Subject: ${data.subject || "[Subject]"}

Dear ${data.recipientName || "[Recipient Name]"},

I am writing to you regarding ${data.subject || "[Subject]"}.

[Body Paragraph 1 - Please customize this section with your specific content]

[Body Paragraph 2 - Please customize this section with your specific content]

[Body Paragraph 3 - Please customize this section with your specific content]

Please contact me at your earliest convenience to discuss this matter further.

Sincerely,

_________________________
${data.senderName || "[Sender Name]"}

Date: ${data.letterDate || new Date().toLocaleDateString()}`;
    },
  },
];

function CustomizeSection({
  formData,
  onInputChange,
  onSubmit,
  onPreview,
}) {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [templateFormData, setTemplateFormData] = useState({});
  const [generatedDocument, setGeneratedDocument] = useState("");
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [editedDocument, setEditedDocument] = useState("");

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setTemplateFormData({});
    setGeneratedDocument("");
    setEditedDocument("");
    setIsPreviewMode(false);
  };

  const handleTemplateInputChange = (e) => {
    const { name, value } = e.target;
    setTemplateFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenerateDocument = (e) => {
    e.preventDefault();
    if (!selectedTemplate) return;

    const data = {
      ...templateFormData,
      date: templateFormData.date || new Date().toISOString().split("T")[0],
    };

    const document = selectedTemplate.generateDocument(data);
    setGeneratedDocument(document);
    setEditedDocument(document);
    setIsPreviewMode(true);
  };

  const handleDownloadPDF = () => {
    if (!editedDocument) {
      alert("Please generate a document first.");
      return;
    }

    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 15;
      const maxWidth = pageWidth - margin * 2;
      
      const lines = doc.splitTextToSize(editedDocument, maxWidth);
      const lineHeight = 7;
      const pageHeight = doc.internal.pageSize.getHeight();
      let y = 20;

      lines.forEach((line) => {
        if (y + lineHeight > pageHeight - margin) {
          doc.addPage();
          y = margin;
        }
        doc.text(line, margin, y);
        y += lineHeight;
      });

      const fileName = selectedTemplate
        ? `${selectedTemplate.name.replace(/\s+/g, "_")}_${Date.now()}.pdf`
        : `Legal_Document_${Date.now()}.pdf`;
      doc.save(fileName);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    }
  };

  const handleBackToForm = () => {
    setIsPreviewMode(false);
  };

  const handleBackToTemplates = () => {
    setSelectedTemplate(null);
    setTemplateFormData({});
    setGeneratedDocument("");
    setEditedDocument("");
    setIsPreviewMode(false);
  };

  // If no template selected, show template selection
  if (!selectedTemplate) {
  return (
    <div className="customize-section">
        <h3>Select a Document Template</h3>
        <div className="template-grid">
          {DOCUMENT_TEMPLATES.map((template) => {
            const IconComponent = template.icon;
            return (
              <div
                key={template.id}
                className="template-card"
                onClick={() => handleTemplateSelect(template)}
              >
                <IconComponent className="template-icon" />
                <h4>{template.name}</h4>
                <p>Click to customize</p>
          </div>
            );
          })}
        </div>
      </div>
    );
  }

  // If template selected but not in preview mode, show form
  if (!isPreviewMode) {
    const IconComponent = selectedTemplate.icon;
    return (
      <div className="customize-section">
        <div className="template-header">
          <button className="back-btn" onClick={handleBackToTemplates}>
            ← Back to Templates
          </button>
          <h3 className="template-title">
            <IconComponent className="template-title-icon" />
            <span>{selectedTemplate.name}</span>
          </h3>
        </div>
        <form onSubmit={handleGenerateDocument} className="customize-form">
          <div className="form-grid">
            {selectedTemplate.fields.map((field) => {
              const FieldIcon = field.icon;
              return (
                <div key={field.name} className="form-group">
                  <label htmlFor={field.name}>
                    <FieldIcon /> {field.label}
            </label>
                  {field.type === "date" ? (
            <input
              type="date"
                      id={field.name}
                      name={field.name}
                      value={templateFormData[field.name] || ""}
                      onChange={handleTemplateInputChange}
              required
            />
                  ) : field.type === "number" ? (
            <input
                      type="number"
                      id={field.name}
                      name={field.name}
                      value={templateFormData[field.name] || ""}
                      onChange={handleTemplateInputChange}
                      placeholder={`Enter ${field.label.toLowerCase()}`}
              required
            />
                  ) : (
            <input
                      type="text"
                      id={field.name}
                      name={field.name}
                      value={templateFormData[field.name] || ""}
                      onChange={handleTemplateInputChange}
                      placeholder={`Enter ${field.label.toLowerCase()}`}
              required
            />
                  )}
          </div>
              );
            })}
          <div className="form-group">
            <label htmlFor="date">
                <FaCalendarAlt /> Document Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
                value={templateFormData.date || ""}
                onChange={handleTemplateInputChange}
              required
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="generate-btn">
            <FaFileAlt /> Generate Document
          </button>
          </div>
        </form>
      </div>
    );
  }

  // Preview mode with editable document
  return (
    <div className="customize-section">
      <div className="preview-header">
        <button className="back-btn" onClick={handleBackToForm}>
          ← Back to Form
        </button>
        <h3>
          <FaEye /> Document Preview - {selectedTemplate.name}
        </h3>
      </div>

      <div className="preview-container">
        <div className="preview-toolbar">
          <button className="toolbar-btn download-btn" onClick={handleDownloadPDF}>
            <FaDownload /> Download as PDF
          </button>
          <button className="toolbar-btn" onClick={handleBackToForm}>
            <FaEdit /> Edit Form
          </button>
        </div>

        <div className="document-editor">
          <label htmlFor="document-content" className="editor-label">
            Edit Document Content:
          </label>
          <textarea
            id="document-content"
            className="document-textarea"
            value={editedDocument}
            onChange={(e) => setEditedDocument(e.target.value)}
            rows={25}
            placeholder="Document content will appear here..."
          />
        </div>

        <div className="document-preview">
          <div className="preview-content">
            <pre>{editedDocument}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomizeSection;
