import { useEffect, useRef, useState } from "react";
import { addCommentOnReview } from "../../../API/application/applicationAPI";
import ChatMessageLoader from "../../ui/chatMessageLoader/ChatMessageLoader";

const ApplicationAction = ({ className, loading, reviewData = [], applicationData }) => {
  // State to manage which action item's comment input is active
  // Stores the index of the item, or null if no comment input is active
  const [commentInputActiveIndex, setCommentInputActiveIndex] = useState(null);
  const [currentComment, setCurrentComment] = useState("");
  const [currentActionType, setCurrentActionType] = useState(null);
  const commentBoxRef = useRef(null); // Ref for the comment box to detect outside clicks
  const [reviewSetData, setReviewSetData] = useState(reviewData);

  console.log("Review Data: ", reviewData)

  // Effect to handle clicks outside the comment box
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If the comment box is active and the click is outside the comment box
      if (
        commentInputActiveIndex !== null &&
        commentBoxRef.current &&
        !commentBoxRef.current.contains(event.target)
      ) {
        setCommentInputActiveIndex(null); // Hide the comment box
        setCurrentComment(""); // Clear the comment
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [commentInputActiveIndex]); // Re-run effect when commentInputActiveIndex changes

  const handleActionClick = (index, actionType) => {
    setCommentInputActiveIndex(index);
    setCurrentComment(""); // Clear comment when opening
    setCurrentActionType(actionType);
  };

  const handleSubmitComment = async (item) => {
   try {
    console.log(
      `Action: ${currentActionType}, Title: ${item.title}, Comment: ${currentComment}`
    );

    const data = {
      review_comment: currentComment,
      review_status: currentActionType == "Restrict" ? "restricted" : "resolved",
    }

    await addCommentOnReview(item._id || 123, data)
    const reviewSet =await getApplicationReviewSet(applicationData);
    setReviewSetData(reviewSet);
    console.log("Review Set:", reviewSet);
   } catch (error) {
    console.error("Error adding comment:", error);
   } finally {
    setCommentInputActiveIndex(null); // Hide the comment box
    setCurrentComment(""); // Clear the comment
    setCurrentActionType(null); // Clear the action type
   }
  };

  const handleCancelComment = () => {
    setCommentInputActiveIndex(null); // Hide the comment box
    setCurrentComment(""); // Clear the comment
  };

  return (
    <div
      className={`bg-white p-4 rounded-lg shadow-sm overflow-y-auto flex flex-col ${className} border border-[#939393]`}
      style={{ height: "calc(100vh - 200px)" }}
    >
      <h2 className="text-lg font-medium text-gray-800 mb-4">Actions</h2>
      {loading ? (
        <ChatMessageLoader />
      ) : (
        <div className="flex flex-col gap-4 flex-1 overflow-y-auto custom-scrollbar pr-2">
          {reviewData?.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-sm text-gray-800">
                  {item.title}
                </h3>
                <div
                  className={`text-sm px-2 py-1 rounded-full font-semibold ${item.alert == "high_risk" ? "text-red-500" : item.alert == "medium_risk" ? "text-orange-500" : "text-yellow-500"}`}
                >
                  {item.alert?.replace(/_/g, " ")                   // convert underscores to spaces
                  ?.replace(/\b\w/g, (c) => c.toUpperCase())}
                  <span
                    className={`ml-2 inline-block w-3 h-3 rounded-full ${item.alert == "high_risk" ? "bg-red-500" : item.alert == "medium_risk" ? "bg-orange-500" : "bg-yellow-500"}`}
                  ></span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4 break-all">{item.message}</p>

              {commentInputActiveIndex === index ? (
                // Comment input box visible for this item
                <div ref={commentBoxRef}>
                  {/* Attach ref here */}
                  <div className="mt-4">
                    <label
                      htmlFor={`comment-${index}`}
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Comment
                    </label>
                    {/* shouldn't be extensible*/}
                    <textarea
                      id={`comment-${index}`}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      rows="3"
                      placeholder="Add your comment here..."
                      value={currentComment}
                      onChange={(e) => setCurrentComment(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="flex justify-end gap-3 mt-4">
                    <button
                      className="px-3 py-1 rounded-md border border-[#0b3e6f] text-[#0b3e6f] text-sm font-semibold transition-colors"
                      onClick={handleCancelComment}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-3 py-1 rounded-md bg-[#0b3e6f] text-white hover:bg-[#0b3e6f] text-sm font-semibold transition-colors"
                      onClick={() =>
                        handleSubmitComment(
                          item
                        )
                      }
                    >
                      Submit
                    </button>
                  </div>
                </div>
              ) : (
                // Original buttons visible
                <div className="flex justify-end gap-2">
                  <button
                    className="px-3 py-1 rounded-md bg-[#D50001] text-white hover:bg-red-700 text-sm font-semibold transition-colors"
                    onClick={() => handleActionClick(index, "Restrict")} // Pass index to show comment box
                  >
                    Restrict
                  </button>
                  <button
                    className="px-3 py-1 rounded-md bg-[#399E5A] text-white hover:bg-green-700 text-sm font-semibold transition-colors"
                    onClick={() => handleActionClick(index, "Proceed")} // Pass index to show comment box
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
