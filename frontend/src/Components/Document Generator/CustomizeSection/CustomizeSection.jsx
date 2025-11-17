import "./CustomizeSection.css";
import {
  FaBuilding,
  FaUser,
  FaCalendarAlt,
  FaDollarSign,
  FaFileAlt,
  FaEye,
} from "react-icons/fa";



function CustomizeSection({
  formData,
  onInputChange,
  onSubmit,
  onPreview,
}) {
  return (
    <div className="customize-section">
      <h3>Customize Your Document</h3>
      <form onSubmit={onSubmit} className="customize-form">
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
              onChange={onInputChange}
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
              onChange={onInputChange}
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
              onChange={onInputChange}
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
              onChange={onInputChange}
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
              onChange={onInputChange}
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
              onChange={onInputChange}
              required
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="generate-btn">
            <FaFileAlt /> Generate Document
          </button>
          <button
            type="button"
            className="preview-btn"
            onClick={onPreview}
          >
            <FaEye /> Preview Document
          </button>
        </div>
      </form>
    </div>
  );
}

export default CustomizeSection;

