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
            className="flex items-center p-3 rounded-md hover:bg-gray-50 transition-colors cursor-pointer border border-gray-300 mr-2"
          >
            <svg
              className="w-5 h-5 text-red-500 mr-3"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4 4a2 2 0 012-2h4.586A2 2 0 0113 3.414L16.586 7A2 2 0 0118 8.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm0 3a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="text-gray-700">{doc}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationDocuments;
