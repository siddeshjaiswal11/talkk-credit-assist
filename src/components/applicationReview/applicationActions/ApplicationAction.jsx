import { useEffect, useRef, useState } from "react";
import { addCommentOnReview } from "../../../API/application/applicationAPI";
import ChatMessageLoader from "../../ui/chatMessageLoader/ChatMessageLoader";
import "./ApplicationAction.css"; // Import the CSS file

const ApplicationAction = ({ className, loading, reviewData = [], applicationData }) => {
  const [commentInputActiveIndex, setCommentInputActiveIndex] = useState(null);
  const [currentComment, setCurrentComment] = useState("");
  const [currentActionType, setCurrentActionType] = useState(null);
  const commentBoxRef = useRef(null);
  const [reviewSetData, setReviewSetData] = useState(reviewData);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        commentInputActiveIndex !== null &&
        commentBoxRef.current &&
        !commentBoxRef.current.contains(event.target)
      ) {
        setCommentInputActiveIndex(null);
        setCurrentComment("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [commentInputActiveIndex]);

  const handleActionClick = (index, actionType) => {
    setCommentInputActiveIndex(index);
    setCurrentComment("");
    setCurrentActionType(actionType);
  };

  const handleSubmitComment = async (item) => {
    try {
      const data = {
        review_comment: currentComment,
        review_status: currentActionType === "Restrict" ? "restricted" : "resolved",
      };

      await addCommentOnReview(item._id, data);
      const reviewSet = await getApplicationReviewSet(applicationData);
      setReviewSetData(reviewSet);
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setCommentInputActiveIndex(null);
      setCurrentComment("");
      setCurrentActionType(null);
    }
  };

  const handleCancelComment = () => {
    setCommentInputActiveIndex(null);
    setCurrentComment("");
  };

  return (
    <div className={`application-action-container ${className}`}>
      <h2 className="application-action-title">Actions</h2>
      {loading ? (
        <ChatMessageLoader />
      ) : (
        <div className="application-action-list">
          {reviewData?.map((item, index) => (
            <div key={index} className="application-action-item">
              <div className="application-action-header">
                <h3 className="application-action-item-title">{item.title}</h3>
                <div className={`application-action-alert ${item.alert}`}>
                  {item.alert?.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                  <span className={`application-action-alert-indicator ${item.alert}`}></span>
                </div>
              </div>
              <p className="application-action-message">{item.message}</p>

              {commentInputActiveIndex === index ? (
                <div ref={commentBoxRef}>
                  <div className="application-action-comment-box">
                    <label htmlFor={`comment-${index}`} className="application-action-comment-label">
                      Comment
                    </label>
                    <textarea
                      id={`comment-${index}`}
                      className="application-action-comment-input"
                      rows="3"
                      placeholder="Add your comment here..."
                      value={currentComment}
                      onChange={(e) => setCurrentComment(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="application-action-buttons">
                    <button className="application-action-cancel-button" onClick={handleCancelComment}>
                      Cancel
                    </button>
                    <button
                      className="application-action-submit-button"
                      onClick={() => handleSubmitComment(item)}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              ) : (
                <div className="application-action-buttons">
                  <button
                    className="application-action-restrict-button"
                    onClick={() => handleActionClick(index, "Restrict")}
                  >
                    Restrict
                  </button>
                  <button
                    className="application-action-proceed-button"
                    onClick={() => handleActionClick(index, "Proceed")}
                  >
                    Proceed
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicationAction;
