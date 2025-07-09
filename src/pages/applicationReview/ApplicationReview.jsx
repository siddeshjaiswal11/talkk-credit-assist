import React, { useEffect } from "react";
import Header from "../../components/utils/header/Header";
import ApplicationDetail from "../../components/applicationReview/applicationDetails/ApplicationDetail";
import ApplicationAction from "../../components/applicationReview/applicationActions/ApplicationAction";
import ApplicationChatbot from "../../components/applicationReview/applicationChatbot/ApplicationChatbot";
import ApplicationDocuments from "../../components/applicationReview/applicationDocuments/ApplicationDocument";
import { getParticularLoanApplications } from "../../API/application/applicationAPI";
import { useLocation } from "react-router-dom";

const ApplicationReview = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const applicationId = queryParams.get("applicationId");

  console.log("Application ID:", applicationId);

  useEffect(() => {
    const fetchParticularApplications = async () => {
      if (!applicationId) {
        console.error("Application ID is missing");
        return;
      }

      try {
        const response = await getParticularLoanApplications(applicationId);
        console.log("Fetched particular applications:", response);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchParticularApplications();
  }, [applicationId]);

  return (
    <div className="font-inter flex flex-col">
      <Header />

      <div className="flex flex-col lg:flex-row gap-4 par-1" style={{ height: "calc(100vh - 200px)", overflow: "hidden" }}>
       
        <div className="flex flex-col gap-4 w-full lg:w-1/3 h-full border border-[#939393] rounded-md">
          <ApplicationDetail className="flex-grow-[2] overflow-y-auto" />
          <ApplicationDocuments className="flex-grow-[1] overflow-y-auto" />
        </div>

        <div className="w-full lg:w-1/3 h-full overflow-y-auto">
          <ApplicationAction />
        </div>

        <div className="w-full lg:w-1/3 h-full overflow-hidden">
          <ApplicationChatbot applicationId={applicationId} />
        </div>
      </div>
    </div>
  );
};

export default ApplicationReview;
