// ApplicationDocuments Component (formerly Documents)
const ApplicationDocuments = ({ className, applicationDataDoc = {} }) => {

//   we receive as  "documents": {
//     "aadhar_document": "https://ssm-talkk-dev.pocs.tech/a1c6be78e56a4373a50d3a576d87a14d.jfif",
//     "loan_application_document": "https://ssm-talkk-dev.pocs.tech/e21a2eeb66ed449bae39edd04a1ade75.pdf",
//     "pan_document": "https://ssm-talkk-dev.pocs.tech/eca2999495ae495695946f57685cbece.png"
// }

  const documents = [
    { name: "Udyam/MSME Registration Certificate.pdf", status: "checked" },
    { name: "GST Certificate.pdf", status: "unchecked" },
    { name: "MOA/AOA or Partnership Deed.pdf", status: "checked" },
    { name: "ITRs (Last 2 Years).pdf", status: "unchecked" },
    { name: "Bank Statements (Last 6 Months).pdf", status: "checked" },
    { name: "Business Plan.pdf", status: "unchecked" },
    { name: "Identity Proof (Applicant).pdf", status: "unchecked" },
  ];

  console.log("applicationDataDoc: ", applicationDataDoc)

  return (
    // Add flex flex-col to the outer div so its children can manage height
    <div
      className={`bg-white p-6 rounded-lg shadow-sm flex flex-col ${className}`}
    >
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Documents ({Object.entries(applicationDataDoc).length})
      </h2>
      {/* Add flex-1 and custom-scrollbar to the inner div to make it scrollable */}
      <div className="flex flex-col gap-2 flex-1 overflow-y-auto custom-scrollbar max-h-[20vh]">
        {
          Object.entries(applicationDataDoc)?.map(([key, value]) => (
            <div
              key={key}
              className="flex items-center gap-2 p-3 rounded-md hover:bg-gray-50 transition-colors cursor-pointer border border-gray-300"
              onClick={() => window.open(value, "_blank")}
            >
              <span className="text-gray-700 flex-1">{key
                  .replace(/_/g, " ")                   // convert underscores to spaces
                  .replace(/\b\w/g, (c) => c.toUpperCase())}</span>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default ApplicationDocuments;
