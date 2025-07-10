import React from "react";
import "./ApplicationDetail.css"; // Import the CSS file

const ApplicationDetail = ({ applicationData = {} }) => {
  const loanDetails = {
    customerID: "CUST100477",
    fullName: "Sneha Nair",
    businessName: "TechHive Solutions",
    businessRegistrationNo: "GSTIN: 29BGPLN2784A1Z9",
    loanAmountApplied: "₹50,00,000",
    monthlyTurnover: "₹12,00,000",
    netProfitAnnual: "₹22,00,000",
    applicationDate: "2024-10-01",
    loanTenureYears: "7",
    interestRate: "10.75%",
  };

  console.log("applicationData: ", applicationData);

  return (
    <div className="application-detail-container">
      <div className="application-detail-header">
        <h2 className="application-detail-title">Loan Information</h2>
      </div>
      <div className="application-detail-grid">
        {Object.entries(applicationData)
          ?.filter(
            ([key]) =>
              key !== "documents" &&
              key !== "_id" &&
              key !== "application_date" &&
              key !== "updated_at" &&
              key !== "created_at"
          )
          .map(([key, value]) => (
            <div key={key} className="application-detail-item">
              <p className="application-detail-key">
                {key
                  .replace(/_/g, " ") // convert underscores to spaces
                  .replace(/\b\w/g, (c) => c.toUpperCase())}
              </p>
              <p className="application-detail-value">{value}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ApplicationDetail;
