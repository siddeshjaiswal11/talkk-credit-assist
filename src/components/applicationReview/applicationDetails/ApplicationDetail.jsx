const ApplicationDetail = () => {
  const loanDetails = {
    customerID: 'CUST100477',
    fullName: 'Sneha Nair',
    businessName: 'TechHive Solutions',
    businessRegistrationNo: 'GSTIN: 29BGPLN2784A1Z9',
    loanAmountApplied: '₹50,00,000',
    monthlyTurnover: '₹12,00,000',
    netProfitAnnual: '₹22,00,000',
    applicationDate: '2024-10-01',
    loanTenureYears: '7',
    interestRate: '10.75%',
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm max-h-[35vh] overflow-y-auto custom-scrollbar">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-800">Loan Information</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm text-gray-700">
        {Object.entries(loanDetails).map(([key, value]) => (
          <div key={key} className="mr-2">
            <p className="text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
            <p className="font-medium text-gray-900">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationDetail;