// ApplicationDocuments Component (formerly Documents)
const ApplicationDocuments = ({ className }) => {
  const documents = [
    "Udyam/MSME Registration Certificate.pdf",
    "GST Certificate.pdf",
    "MOA/AOA or Partnership Deed.pdf",
    "ITRs (Last 2 Years).pdf",
    "Bank Statements (Last 6 Months).pdf",
    "Business Plan.pdf",
    "Identity Proof (Applicant).pdf",
    "Address Proof (Applicant).pdf",
    "Collateral Documents.pdf",
    "Credit Report.pdf",
  ];

  return (
    // Add flex flex-col to the outer div so its children can manage height
    <div
      className={`bg-white p-6 rounded-lg shadow-sm flex flex-col ${className}`}
    >
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Documents ({documents.length})
      </h2>
      {/* Add flex-1 and custom-scrollbar to the inner div to make it scrollable */}
      <div className="flex flex-col gap-2 flex-1 overflow-y-auto custom-scrollbar max-h-[20vh]">
        {documents.map((doc, index) => (
          <div
            key={index}
            className="flex items-center gap-2 p-3 rounded-md hover:bg-gray-50 transition-colors cursor-pointer border border-gray-300 mr-2"
          >
            <span className="smm smm-document text-[#DF3753]"></span>
            <span className="text-gray-700">{doc}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationDocuments;
