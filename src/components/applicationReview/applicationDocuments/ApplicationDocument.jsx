// ApplicationDocuments Component (formerly Documents)
const ApplicationDocuments = ({ className }) => {

  const documents = [
    { name: "Udyam/MSME Registration Certificate.pdf", status: "checked" },
    { name: "GST Certificate.pdf", status: "unchecked" },
    { name: "MOA/AOA or Partnership Deed.pdf", status: "checked" },
    { name: "ITRs (Last 2 Years).pdf", status: "unchecked" },
    { name: "Bank Statements (Last 6 Months).pdf", status: "checked" },
    { name: "Business Plan.pdf", status: "unchecked" },
    { name: "Identity Proof (Applicant).pdf", status: "unchecked" },
  ];

  return (
    // Add flex flex-col to the outer div so its children can manage height
    <div
      className={`bg-white rounded-lg shadow-sm flex flex-col ${className}`}
    >
      <h2 className="text-lg font-medium text-gray-800 mb-4">
        Documents ({documents.length})
      </h2>
      {/* Add flex-1 and custom-scrollbar to the inner div to make it scrollable */}
      <div className="flex flex-col gap-2 flex-1 overflow-y-auto custom-scrollbar max-h-[20vh]">
        {documents.map((doc, index) => (
          <div
            key={index}
            className="flex items-center gap-2 p-3 rounded-md hover:bg-gray-50 transition-colors cursor-pointer border border-gray-300"
          >
            {/* Render check or cross icon based on status */}
            {doc.status === "checked" ? (
              <span className="smm smm-check rounded-full text-white p-[6px] text-xs bg-[#20C357]"></span>
            ) : (
              <span className="smm smm-cross rounded-full text-white p-[6px] text-xs bg-[#D50001]"></span>
            )}
            <span className="text-gray-700 flex-1">{doc.name}</span>
            {/* Render download icon only if the document is checked */}
            {doc.status === "checked" && (
              <span className="smm smm-download text-[#0D4A84]"></span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationDocuments;
