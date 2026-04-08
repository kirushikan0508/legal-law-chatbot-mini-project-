import { useState, useEffect } from "react";
import "./agreementForm.css";

export default function AgreementForm({ agreementType, onSubmit, loading }) {
  const [formData, setFormData] = useState({});

  // Complete form fields for all 13 agreement types
  const formTemplates = {
    "Employment Contract": [
      {
        name: "employeeName",
        label: "Employee Name",
        type: "text",
        required: true,
      },
      {
        name: "employerName",
        label: "Employer Name",
        type: "text",
        required: true,
      },
      {
        name: "employeeAddress",
        label: "Employee Address",
        type: "text",
        required: true,
      },
      {
        name: "employerAddress",
        label: "Employer Address",
        type: "text",
        required: true,
      },
      { name: "jobTitle", label: "Job Title", type: "text", required: true },
      { name: "startDate", label: "Start Date", type: "date", required: true },
      {
        name: "salary",
        label: "Monthly Salary (LKR)",
        type: "number",
        required: true,
      },
      {
        name: "probationPeriod",
        label: "Probation Period (months)",
        type: "number",
        default: 3,
      },
      {
        name: "workHours",
        label: "Weekly Work Hours",
        type: "number",
        default: 45,
      },
      {
        name: "noticePeriod",
        label: "Notice Period (days)",
        type: "number",
        default: 30,
      },
      {
        name: "annualLeave",
        label: "Annual Leave Days",
        type: "number",
        default: 14,
      },
      {
        name: "sickLeave",
        label: "Sick Leave Days",
        type: "number",
        default: 14,
      },
      { name: "supervisorName", label: "Supervisor Name", type: "text" },
      {
        name: "paymentDate",
        label: "Payment Date of Month",
        type: "number",
        default: 25,
      },
      { name: "jobDescription", label: "Job Description", type: "textarea" },
    ],
    "Termination Letter": [
      {
        name: "employeeName",
        label: "Employee Name",
        type: "text",
        required: true,
      },
      {
        name: "employeeAddress",
        label: "Employee Address",
        type: "text",
        required: true,
      },
      {
        name: "companyName",
        label: "Company Name",
        type: "text",
        required: true,
      },
      {
        name: "companyAddress",
        label: "Company Address",
        type: "text",
        required: true,
      },
      {
        name: "terminationDate",
        label: "Termination Date",
        type: "date",
        required: true,
      },
      {
        name: "lastWorkingDay",
        label: "Last Working Day",
        type: "date",
        required: true,
      },
      {
        name: "reason",
        label: "Reason for Termination",
        type: "textarea",
        required: true,
      },
      { name: "referenceNumber", label: "Reference Number", type: "text" },
      { name: "settlementDate", label: "Settlement Date", type: "date" },
      { name: "handoverPerson", label: "Handover Person", type: "text" },
      {
        name: "authorizedSignatory",
        label: "Authorized Signatory",
        type: "text",
      },
      { name: "designation", label: "Designation", type: "text" },
      { name: "severancePay", label: "Severance Pay (LKR)", type: "number" },
      { name: "noticeGiven", label: "Notice Given (days)", type: "number" },
    ],
    "Non-Disclosure Agreement": [
      {
        name: "disclosingParty",
        label: "Disclosing Party",
        type: "text",
        required: true,
      },
      {
        name: "receivingParty",
        label: "Receiving Party",
        type: "text",
        required: true,
      },
      {
        name: "disclosingAddress",
        label: "Disclosing Party Address",
        type: "text",
        required: true,
      },
      {
        name: "receivingAddress",
        label: "Receiving Party Address",
        type: "text",
        required: true,
      },
      {
        name: "purpose",
        label: "Purpose of Disclosure",
        type: "textarea",
        required: true,
      },
      {
        name: "confidentialInfo",
        label: "Confidential Information",
        type: "textarea",
      },
      {
        name: "duration",
        label: "Agreement Duration (years)",
        type: "number",
        required: true,
        default: 2,
      },
      {
        name: "effectiveDate",
        label: "Effective Date",
        type: "date",
        required: true,
      },
      { name: "exclusions", label: "Exclusions (optional)", type: "textarea" },
      {
        name: "governingLaw",
        label: "Governing Law",
        type: "text",
        default: "Sri Lanka",
      },
    ],
    "Bill Of Sale": [
      {
        name: "sellerName",
        label: "Seller Name",
        type: "text",
        required: true,
      },
      { name: "buyerName", label: "Buyer Name", type: "text", required: true },
      {
        name: "sellerAddress",
        label: "Seller Address",
        type: "text",
        required: true,
      },
      {
        name: "buyerAddress",
        label: "Buyer Address",
        type: "text",
        required: true,
      },
      {
        name: "sellerID",
        label: "Seller ID Number",
        type: "text",
        required: true,
      },
      {
        name: "buyerID",
        label: "Buyer ID Number",
        type: "text",
        required: true,
      },
      {
        name: "itemDescription",
        label: "Item Description",
        type: "textarea",
        required: true,
      },
      { name: "serialNumber", label: "Serial/Model Number", type: "text" },
      {
        name: "condition",
        label: "Item Condition",
        type: "text",
        default: "As Is",
      },
      { name: "accessories", label: "Accessories Included", type: "text" },
      {
        name: "purchasePrice",
        label: "Purchase Price (LKR)",
        type: "number",
        required: true,
      },
      {
        name: "dateOfSale",
        label: "Date of Sale",
        type: "date",
        required: true,
      },
      { name: "deliveryAddress", label: "Delivery Address", type: "text" },
      { name: "deliveryDate", label: "Delivery Date", type: "date" },
      { name: "deliveryMethod", label: "Delivery Method", type: "text" },
      {
        name: "taxBearer",
        label: "Taxes Borne By",
        type: "text",
        default: "Buyer",
      },
    ],
    "Service Agreement": [
      {
        name: "serviceProvider",
        label: "Service Provider",
        type: "text",
        required: true,
      },
      { name: "client", label: "Client", type: "text", required: true },
      {
        name: "providerAddress",
        label: "Provider Address",
        type: "text",
        required: true,
      },
      {
        name: "clientAddress",
        label: "Client Address",
        type: "text",
        required: true,
      },
      {
        name: "providerRegNumber",
        label: "Provider Registration Number",
        type: "text",
      },
      {
        name: "clientRegNumber",
        label: "Client Registration Number",
        type: "text",
      },
      {
        name: "serviceDescription",
        label: "Service Description",
        type: "textarea",
        required: true,
      },
      {
        name: "serviceFee",
        label: "Service Fee (LKR)",
        type: "number",
        required: true,
      },
      { name: "paymentTerms", label: "Payment Terms", type: "textarea" },
      {
        name: "paymentDays",
        label: "Payment Within Days",
        type: "number",
        default: 30,
      },
      { name: "startDate", label: "Start Date", type: "date", required: true },
      { name: "endDate", label: "End Date", type: "date" },
      {
        name: "noticePeriod",
        label: "Notice Period (days)",
        type: "number",
        default: 30,
      },
      {
        name: "serviceSpecifications",
        label: "Service Specifications",
        type: "textarea",
      },
      {
        name: "ipOwner",
        label: "Intellectual Property Owner",
        type: "text",
        default: "Service Provider",
      },
      {
        name: "liabilityLimit",
        label: "Liability Limit (LKR)",
        type: "number",
      },
    ],
    "Asset Purchase Agreement": [
      {
        name: "sellerCompany",
        label: "Seller Company Name",
        type: "text",
        required: true,
      },
      {
        name: "buyerCompany",
        label: "Buyer Company Name",
        type: "text",
        required: true,
      },
      {
        name: "sellerAddress",
        label: "Seller Company Address",
        type: "text",
        required: true,
      },
      {
        name: "buyerAddress",
        label: "Buyer Company Address",
        type: "text",
        required: true,
      },
      {
        name: "sellerRegNumber",
        label: "Seller Registration Number",
        type: "text",
        required: true,
      },
      {
        name: "buyerRegNumber",
        label: "Buyer Registration Number",
        type: "text",
        required: true,
      },
      {
        name: "assetList",
        label: "Asset List Description",
        type: "textarea",
        required: true,
      },
      {
        name: "purchasePrice",
        label: "Purchase Price (LKR)",
        type: "number",
        required: true,
      },
      { name: "depositAmount", label: "Deposit Amount (LKR)", type: "number" },
      { name: "balanceAmount", label: "Balance Amount (LKR)", type: "number" },
      {
        name: "closingDate",
        label: "Closing Date",
        type: "date",
        required: true,
      },
      { name: "closingLocation", label: "Closing Location", type: "text" },
      {
        name: "taxBearer",
        label: "Taxes Borne By",
        type: "text",
        default: "Buyer",
      },
      {
        name: "employeeOffer",
        label: "Offer Employment to Employees?",
        type: "select",
        options: ["Yes", "No"],
      },
      {
        name: "arbitrationLocation",
        label: "Arbitration Location",
        type: "text",
        default: "Colombo, Sri Lanka",
      },
    ],
    "Business Contract": [
      {
        name: "partyAName",
        label: "First Party Name",
        type: "text",
        required: true,
      },
      {
        name: "partyBName",
        label: "Second Party Name",
        type: "text",
        required: true,
      },
      {
        name: "partyAAddress",
        label: "First Party Address",
        type: "text",
        required: true,
      },
      {
        name: "partyBAddress",
        label: "Second Party Address",
        type: "text",
        required: true,
      },
      {
        name: "partyARegNumber",
        label: "First Party Registration Number",
        type: "text",
      },
      {
        name: "partyBRegNumber",
        label: "Second Party Registration Number",
        type: "text",
      },
      {
        name: "contractPurpose",
        label: "Contract Purpose",
        type: "textarea",
        required: true,
      },
      {
        name: "contractValue",
        label: "Contract Value (LKR)",
        type: "number",
        required: true,
      },
      {
        name: "contractTerm",
        label: "Contract Term (months)",
        type: "number",
        required: true,
      },
      {
        name: "partyAObligations",
        label: "First Party Obligations",
        type: "textarea",
        required: true,
      },
      {
        name: "partyBObligations",
        label: "Second Party Obligations",
        type: "textarea",
        required: true,
      },
      { name: "paymentSchedule", label: "Payment Schedule", type: "textarea" },
      { name: "deliverables", label: "Deliverables", type: "textarea" },
      {
        name: "terminationNotice",
        label: "Termination Notice (days)",
        type: "number",
        default: 30,
      },
      {
        name: "disputeResolution",
        label: "Dispute Resolution Method",
        type: "text",
        default: "Negotiation and Mediation",
      },
    ],
    "Car Rental Agreement": [
      { name: "ownerName", label: "Owner Name", type: "text", required: true },
      {
        name: "renterName",
        label: "Renter Name",
        type: "text",
        required: true,
      },
      {
        name: "ownerAddress",
        label: "Owner Address",
        type: "text",
        required: true,
      },
      {
        name: "renterAddress",
        label: "Renter Address",
        type: "text",
        required: true,
      },
      {
        name: "ownerPhone",
        label: "Owner Phone Number",
        type: "text",
        required: true,
      },
      {
        name: "renterPhone",
        label: "Renter Phone Number",
        type: "text",
        required: true,
      },
      {
        name: "licenseNumber",
        label: "Renter Driving License Number",
        type: "text",
        required: true,
      },
      {
        name: "vehicleMake",
        label: "Vehicle Make",
        type: "text",
        required: true,
      },
      {
        name: "vehicleModel",
        label: "Vehicle Model",
        type: "text",
        required: true,
      },
      {
        name: "vehicleYear",
        label: "Vehicle Year",
        type: "text",
        required: true,
      },
      {
        name: "regNumber",
        label: "Registration Number",
        type: "text",
        required: true,
      },
      { name: "vehicleColor", label: "Vehicle Color", type: "text" },
      {
        name: "odometerStart",
        label: "Odometer Reading at Start (km)",
        type: "number",
      },
      {
        name: "startDate",
        label: "Rental Start Date",
        type: "date",
        required: true,
      },
      {
        name: "endDate",
        label: "Rental End Date",
        type: "date",
        required: true,
      },
      { name: "startTime", label: "Start Time", type: "time" },
      { name: "endTime", label: "End Time", type: "time" },
      {
        name: "dailyRate",
        label: "Daily Rate (LKR)",
        type: "number",
        required: true,
      },
      {
        name: "securityDeposit",
        label: "Security Deposit (LKR)",
        type: "number",
      },
      {
        name: "kmLimit",
        label: "Daily Kilometer Limit",
        type: "number",
        default: 100,
      },
      {
        name: "excessRate",
        label: "Excess Kilometer Rate (LKR/km)",
        type: "number",
      },
      { name: "returnLocation", label: "Return Location", type: "text" },
      {
        name: "deductible",
        label: "Insurance Deductible (LKR)",
        type: "number",
      },
      {
        name: "refundDays",
        label: "Deposit Refund Within Days",
        type: "number",
        default: 7,
      },
    ],
    "Collaboration Agreement": [
      {
        name: "partyAName",
        label: "First Party Name",
        type: "text",
        required: true,
      },
      {
        name: "partyBName",
        label: "Second Party Name",
        type: "text",
        required: true,
      },
      {
        name: "partyAAddress",
        label: "First Party Address",
        type: "text",
        required: true,
      },
      {
        name: "partyBAddress",
        label: "Second Party Address",
        type: "text",
        required: true,
      },
      {
        name: "projectName",
        label: "Project Name",
        type: "text",
        required: true,
      },
      {
        name: "collaborationPurpose",
        label: "Collaboration Purpose",
        type: "textarea",
        required: true,
      },
      {
        name: "partyAResponsibilities",
        label: "First Party Responsibilities",
        type: "textarea",
        required: true,
      },
      {
        name: "partyBResponsibilities",
        label: "Second Party Responsibilities",
        type: "textarea",
        required: true,
      },
      {
        name: "resourcesContributed",
        label: "Resources Contributed",
        type: "textarea",
      },
      {
        name: "ipOwnershipTerms",
        label: "IP Ownership Terms",
        type: "textarea",
      },
      {
        name: "costSharingTerms",
        label: "Cost Sharing Terms",
        type: "textarea",
      },
      { name: "startDate", label: "Start Date", type: "date", required: true },
      { name: "endDate", label: "End Date", type: "date" },
      {
        name: "decisionMaking",
        label: "Decision Making Process",
        type: "text",
        default: "Joint Decision",
      },
      {
        name: "terminationNotice",
        label: "Termination Notice (days)",
        type: "number",
        default: 30,
      },
      {
        name: "governingLaw",
        label: "Governing Law",
        type: "text",
        default: "Sri Lanka",
      },
    ],
    "Commission Agreement": [
      {
        name: "companyName",
        label: "Company Name",
        type: "text",
        required: true,
      },
      { name: "agentName", label: "Agent Name", type: "text", required: true },
      {
        name: "companyAddress",
        label: "Company Address",
        type: "text",
        required: true,
      },
      {
        name: "agentAddress",
        label: "Agent Address",
        type: "text",
        required: true,
      },
      {
        name: "agentNIC",
        label: "Agent NIC Number",
        type: "text",
        required: true,
      },
      {
        name: "productsServices",
        label: "Products/Services",
        type: "textarea",
        required: true,
      },
      {
        name: "territory",
        label: "Sales Territory",
        type: "text",
        required: true,
      },
      {
        name: "commissionRate",
        label: "Commission Rate (%)",
        type: "number",
        required: true,
      },
      {
        name: "paymentDays",
        label: "Payment Days After Sale",
        type: "number",
        default: 30,
      },
      {
        name: "termMonths",
        label: "Agreement Term (months)",
        type: "number",
        required: true,
      },
      { name: "startDate", label: "Start Date", type: "date", required: true },
      {
        name: "terminationNotice",
        label: "Termination Notice (days)",
        type: "number",
        default: 30,
      },
      {
        name: "salesReports",
        label: "Sales Report Frequency",
        type: "text",
        default: "Monthly",
      },
      {
        name: "independentContractor",
        label: "Agent Status",
        type: "select",
        options: ["Independent Contractor", "Employee"],
        default: "Independent Contractor",
      },
    ],
    "Confidentiality Statement": [
      {
        name: "employeeName",
        label: "Employee Name",
        type: "text",
        required: true,
      },
      {
        name: "employeePosition",
        label: "Employee Position",
        type: "text",
        required: true,
      },
      {
        name: "companyName",
        label: "Company Name",
        type: "text",
        required: true,
      },
      { name: "companyAddress", label: "Company Address", type: "text" },
      {
        name: "effectiveDate",
        label: "Effective Date",
        type: "date",
        required: true,
      },
      {
        name: "confidentialInfo",
        label: "Confidential Information Covered",
        type: "textarea",
      },
      { name: "obligations", label: "Specific Obligations", type: "textarea" },
      { name: "witnessName", label: "Witness Name", type: "text" },
      { name: "witnessAddress", label: "Witness Address", type: "text" },
      {
        name: "intellectualProperty",
        label: "Intellectual Property Terms",
        type: "textarea",
      },
      {
        name: "returnMaterials",
        label: "Return of Materials Terms",
        type: "textarea",
      },
    ],
    Contract: [
      {
        name: "partyAName",
        label: "First Party Name",
        type: "text",
        required: true,
      },
      {
        name: "partyBName",
        label: "Second Party Name",
        type: "text",
        required: true,
      },
      {
        name: "partyAAddress",
        label: "First Party Address",
        type: "text",
        required: true,
      },
      {
        name: "partyBAddress",
        label: "Second Party Address",
        type: "text",
        required: true,
      },
      {
        name: "contractBackground",
        label: "Contract Background",
        type: "textarea",
        required: true,
      },
      {
        name: "partyAObligations",
        label: "First Party Obligations",
        type: "textarea",
        required: true,
      },
      {
        name: "partyBObligations",
        label: "Second Party Obligations",
        type: "textarea",
        required: true,
      },
      {
        name: "paymentTerms",
        label: "Payment Terms",
        type: "textarea",
        required: true,
      },
      {
        name: "otherDefinitions",
        label: "Other Definitions",
        type: "textarea",
      },
      { name: "startDate", label: "Start Date", type: "date", required: true },
      { name: "endDate", label: "End Date", type: "date" },
      {
        name: "noticePeriod",
        label: "Notice Period (days)",
        type: "number",
        default: 30,
      },
      {
        name: "representations",
        label: "Representations and Warranties",
        type: "textarea",
      },
      {
        name: "indemnification",
        label: "Indemnification Terms",
        type: "textarea",
      },
      {
        name: "liabilityLimit",
        label: "Liability Limitation (LKR)",
        type: "number",
      },
      {
        name: "disputeResolution",
        label: "Dispute Resolution",
        type: "text",
        default: "Negotiation, Mediation, Legal Proceedings",
      },
    ],
    "Consignment Agreement": [
      {
        name: "consignorName",
        label: "Consignor Name",
        type: "text",
        required: true,
      },
      {
        name: "consigneeName",
        label: "Consignee Name",
        type: "text",
        required: true,
      },
      {
        name: "consignorAddress",
        label: "Consignor Address",
        type: "text",
        required: true,
      },
      {
        name: "consigneeAddress",
        label: "Consignee Address",
        type: "text",
        required: true,
      },
      {
        name: "goodsDescription",
        label: "Goods Description",
        type: "textarea",
        required: true,
      },
      {
        name: "sellingPrice",
        label: "Selling Price (LKR)",
        type: "number",
        required: true,
      },
      {
        name: "commissionRate",
        label: "Commission Rate (%)",
        type: "number",
        required: true,
      },
      {
        name: "discountLimit",
        label: "Maximum Discount (%)",
        type: "number",
        default: 10,
      },
      {
        name: "paymentDays",
        label: "Payment Days After Sale",
        type: "number",
        default: 7,
      },
      {
        name: "termMonths",
        label: "Agreement Term (months)",
        type: "number",
        required: true,
      },
      { name: "startDate", label: "Start Date", type: "date", required: true },
      {
        name: "riskBearer",
        label: "Risk of Loss Borne By",
        type: "text",
        default: "Consignee",
      },
      {
        name: "terminationNotice",
        label: "Termination Notice (days)",
        type: "number",
        default: 30,
      },
      {
        name: "salesReports",
        label: "Sales Report Frequency",
        type: "text",
        default: "Weekly",
      },
      {
        name: "insurance",
        label: "Insurance Responsibility",
        type: "text",
        default: "Consignee",
      },
      {
        name: "returnTerms",
        label: "Return of Unsold Goods Terms",
        type: "textarea",
      },
    ],
  };

  useEffect(() => {
    // Reset form when agreement type changes
    const fields = formTemplates[agreementType] || [];
    const initialData = {};
    fields.forEach((field) => {
      // Set default values if specified
      initialData[field.name] = field.default || "";
    });
    setFormData(initialData);
  }, [agreementType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const fields = formTemplates[agreementType] || [];

  return (
    <div className="agreement-form">
      <h3>Enter Agreement Details</h3>
      <p className="form-subtitle">
        Fill in the details for your {agreementType}
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          {fields.map((field) => (
            <div
              key={field.name}
              className={`form-field ${
                field.type === "textarea" ? "full-width" : ""
              }`}
            >
              <label htmlFor={field.name}>
                {field.label}
                {field.required && <span className="required">*</span>}
              </label>

              {field.type === "textarea" ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  required={field.required}
                  placeholder={`Enter ${field.label.toLowerCase()}...`}
                  rows={
                    field.name.includes("Description") ||
                    field.name.includes("Obligations")
                      ? 5
                      : 3
                  }
                />
              ) : field.type === "select" ? (
                <select
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  required={field.required}
                >
                  <option value="">Select {field.label}</option>
                  {field.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  required={field.required}
                  placeholder={field.label}
                  min={field.type === "number" ? "0" : undefined}
                  step={
                    field.name.includes("Rate") ||
                    field.name.includes("Percentage")
                      ? "0.01"
                      : "1"
                  }
                />
              )}
            </div>
          ))}
        </div>

        <div className="form-actions">
          <button type="submit" className="generate-btn" disabled={loading}>
            {loading ? "Generating Document..." : `Generate ${agreementType}`}
          </button>

          <div className="form-hint">
            <p>
              <strong>Tip:</strong> Fill in all required fields (*) for best
              results. Optional fields can be left blank.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
