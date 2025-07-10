// ApplicationDocuments Component (formerly Documents)
import React from "react";
import ChatMessageLoader from "../../ui/chatMessageLoader/ChatMessageLoader";
import "./ApplicationDocuments.css"; // Import the CSS file

const ApplicationDocuments = ({ className, applicationDataDoc = [], loading }) => {
  console.log("applicationDataDoc: ", applicationDataDoc);

  return (
    <div className={`application-documents-container ${className}`}>
      {applicationDataDoc?.length > 0 && !loading ? (
        <h2 className="application-documents-title">
          Documents ({applicationDataDoc?.length})
        </h2>
      ) : (
        <>
          <h2 className="application-documents-title">Documents</h2>
          <ChatMessageLoader />
        </>
      )}
      <div className="application-documents-list">
        {applicationDataDoc?.map((doc, index) => (
          <div
            key={index}
            className="application-documents-item"
            onClick={() => window.open(doc?.file_url, "_blank")}
          >
            {doc?.isVerified ? (
              <span className="smm smm-check"></span>
            ) : (
              <span className="smm smm-cross"></span>
            )}
            <span className="application-documents-name">
              {doc?.document_name
                .replace(/_/g, " ") // convert underscores to spaces
                .replace(/\b\w/g, (c) => c.toUpperCase())}
            </span>
            {doc?.isVerified && (
              <span className="smm smm-download"></span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationDocuments;
