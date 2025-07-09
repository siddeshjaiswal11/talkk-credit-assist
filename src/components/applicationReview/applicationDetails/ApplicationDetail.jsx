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
    <div className="bg-white rounded-lg overflow-y-auto max-h-[40vh] custom-scrollbar border-b-[1px] border-b-[#c9c9c9] rounded-bl-none rounded-br-none">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-800 mb-4">
          Loan Information
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm text-gray-700">
        {Object.entries(applicationData)
          ?.filter(([key]) => (key !== "documents" && key!== "_id" && key!="application_date" && key!="updated_at" && key!="created_at"))
          .map(([key, value]) => (
            <div key={key} className="mr-2">
              <p className="text-gray-500 capitalize">
                {key
                  .replace(/_/g, " ")                   // convert underscores to spaces
                  .replace(/\b\w/g, (c) => c.toUpperCase())}
              </p>
              <p className="font-medium text-gray-900">{value}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ApplicationDetail;
