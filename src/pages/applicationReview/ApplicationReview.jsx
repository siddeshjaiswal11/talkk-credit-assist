import React, { useEffect, useState } from "react";
import Header from "../../components/utils/header/Header";
import ApplicationDetail from "../../components/applicationReview/applicationDetails/ApplicationDetail";
import ApplicationAction from "../../components/applicationReview/applicationActions/ApplicationAction";
import ApplicationChatbot from "../../components/applicationReview/applicationChatbot/ApplicationChatbot";
import ApplicationDocuments from "../../components/applicationReview/applicationDocuments/ApplicationDocument";
import { getApplicationReviewSet, getParticularLoanApplications } from "../../API/application/applicationAPI";
import { useLocation } from "react-router-dom";

const ApplicationReview = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [reviewDataLoading, setReviewDataLoading] = useState(false);
  const applicationId = queryParams.get("applicationId");
  const [applicationData, setApplicationData] = useState({});
  const [reviewData, setReviewData] = useState([]);

  console.log("Application ID:", applicationId);

  useEffect(() => {
    const fetchParticularApplications = async () => {
      setReviewDataLoading(true);
      if (!applicationId) {
        console.error("Application ID is missing");
        return;
      }

      try {
        const response = await getParticularLoanApplications(applicationId);
        setApplicationData(response);
        console.log("Fetched particular applications:", response);
        if(response) {
          const reviewSet =await getApplicationReviewSet(response);
          console.log("Review Set:", reviewSet);
          setReviewData(reviewSet);
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setReviewDataLoading(false);
      }
    };

    fetchParticularApplications();
  }, [applicationId]);

  return (
    <div className="font-inter flex flex-col">
      <Header applicationName={applicationData?.business_name}/>

      <div className="flex flex-col lg:flex-row gap-4 par-1" style={{ height: "calc(100vh - 200px)", overflow: "hidden" }}>
       
        <div className="flex flex-col gap-4 w-full lg:w-1/3 h-full p-6 border border-gray-400 rounded-md">
          <ApplicationDetail className="flex-grow-[2] overflow-y-auto" applicationData={applicationData}/>
          <ApplicationDocuments className="flex-grow-[1] overflow-y-auto" applicationDataDoc={reviewData?.documents_checklist}/>
        </div>

        <div className="w-full lg:w-1/3 h-full overflow-y-auto">
          <ApplicationAction loading={reviewDataLoading} reviewData={reviewData?.review_set} applicationData={applicationData}/>
        </div>

        <div className="w-full lg:w-1/3 h-full overflow-hidden">
          <ApplicationChatbot applicationId={applicationId} accordionAgentLifeCycle={reviewData?.agent_lifecycle}/>
        </div>
      </div>
    </div>
  );
};

export default ApplicationReview;
