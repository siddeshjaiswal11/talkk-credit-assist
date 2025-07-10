import React, { useEffect, useState } from "react";
import Header from "../../components/utils/header/Header";
import ApplicationDetail from "../../components/applicationReview/applicationDetails/ApplicationDetail";
import ApplicationAction from "../../components/applicationReview/applicationActions/ApplicationAction";
import ApplicationChatbot from "../../components/applicationReview/applicationChatbot/ApplicationChatbot";
import ApplicationDocuments from "../../components/applicationReview/applicationDocuments/ApplicationDocument";
import { getApplicationReviewSet, getParticularLoanApplications } from "../../API/application/applicationAPI";
import { useLocation } from "react-router-dom";
import "./ApplicationReview.css"; // Import the CSS file

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
        if (response) {
          const reviewSet = await getApplicationReviewSet(response);
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
    <div className="application-review-container">
      <Header applicationName={applicationData?.business_name} />

      <div className="application-review-content">
        <div className="application-review-column">
          <ApplicationDetail className="application-detail" applicationData={applicationData} />
          <ApplicationDocuments
            className="application-documents"
            loading={reviewDataLoading}
            applicationDataDoc={reviewData?.documents_checklist}
          />
        </div>

        <div className="application-review-column application-action">
          <ApplicationAction
            loading={reviewDataLoading}
            reviewData={reviewData?.review_set}
            applicationData={applicationData}
          />
        </div>

        <div className="application-review-column application-chatbot">
          <ApplicationChatbot
            applicationId={applicationId}
            loader={reviewDataLoading}
            accordionAgentLifeCycle={reviewData?.agent_lifecycle}
          />
        </div>
      </div>
    </div>
  );
};

export default ApplicationReview;
