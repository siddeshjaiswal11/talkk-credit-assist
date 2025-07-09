// ApplicationDocuments Component (formerly Documents)
import React from "react";
import ChatMessageLoader from "../../ui/chatMessageLoader/ChatMessageLoader";
const ApplicationDocuments = ({ className, applicationDataDoc = [], loading }) => {
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

  console.log("applicationDataDoc: ", applicationDataDoc);

  return (
    // Add flex flex-col to the outer div so its children can manage height
    <div
      className={`bg-white rounded-lg flex flex-col ${className}`}
    >
      {applicationDataDoc?.length > 0 && !loading ? (
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Documents ({applicationDataDoc?.length})
        </h2>
      ) : (
        <>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Documents <br></br>
          </h2>
          <ChatMessageLoader />
        </>
      )}
      {/* Add flex-1 and custom-scrollbar to the inner div to make it scrollable */}
      <div className="flex flex-col gap-2 flex-1 overflow-y-auto custom-scrollbar max-h-[20vh]">
        {applicationDataDoc?.map((doc, index) => (
          <div
            key={index}
            className="flex items-center gap-2 p-3 rounded-md hover:bg-gray-50 transition-colors cursor-pointer border border-gray-300"
            onClick={() => window.open(doc?.file_url, "_blank")}
          >
            {doc?.isVerified ? (
              <span className="smm smm-check rounded-full text-white p-[6px] text-xs bg-[#20C357]"></span>
            ) : (
              <span className="smm smm-cross rounded-full text-white p-[6px] text-xs bg-[#D50001]"></span>
            )}
            <span className="text-gray-700 flex-1">
              {doc?.document_name
                .replace(/_/g, " ") // convert underscores to spaces
                .replace(/\b\w/g, (c) => c.toUpperCase())}
            </span>
            {doc?.isVerified && (
              <span className="smm smm-download text-[#0D4A84]"></span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationDocuments;
