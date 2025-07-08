import React from "react";
import Header from "../../components/utils/header/Header";
import ApplicationDetail from "../../components/applicationReview/applicationDetails/ApplicationDetail";
import ApplicationAction from "../../components/applicationReview/applicationActions/ApplicationAction";
import ApplicationChatbot from "../../components/applicationReview/applicationChatbot/ApplicationChatbot";
import ApplicationDocuments from "../../components/applicationReview/applicationDocuments/ApplicationDocument";

const ApplicationReview = () => {
  return (
    // Outer container: takes full viewport height, uses flex-col to stack header and main content
    <div className="min-h-screen font-inter flex flex-col border border-red-400">
      {/* Header Component */}
      <Header />

      {/* Main Content Area: uses flex-1 to take remaining height, and flex-row for columns on large screens */}
      <div className="flex flex-1 flex-col lg:flex-row gap-4 p-4">
        {/* Column 1: Loan Information and Documents */}
        {/* This column uses flex-col to stack ApplicationDetail and ApplicationDocuments */}
        {/* h-full ensures it takes the full height of its parent (main content area) */}
        <div className="flex flex-col gap-4 w-full lg:w-1/3 h-full border border-gray-400 rounded-md">
          {/* ApplicationDetail: flex-grow to take more space, overflow-y-auto for internal scrolling */}
          <ApplicationDetail className="flex-grow-[2] overflow-y-auto" />
          {/* ApplicationDocuments: flex-grow to take remaining space, overflow-y-auto for internal scrolling */}
          <ApplicationDocuments className="flex-grow-[1] overflow-y-auto" />
        </div>

        {/* Column 2: Actions */}
        {/* This column takes 1/3 width and full height, overflow-y-auto for internal scrolling */}
        <div className="w-full lg:w-1/3 h-full overflow-y-auto">
          <ApplicationAction />
        </div>

        {/* Column 3: Chatbot */}
        {/* This column takes 1/3 width and full height, overflow-hidden to let Chatbot manage its own scroll */}
        <div className="w-full lg:w-1/3 h-full overflow-hidden">
          <ApplicationChatbot />
        </div>
      </div>
    </div>
  );
};

export default ApplicationReview;
