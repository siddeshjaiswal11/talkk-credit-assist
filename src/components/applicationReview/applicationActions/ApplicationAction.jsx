import { useEffect, useRef, useState } from "react";

const ApplicationAction = ({ className }) => {
  // State to manage which action item's comment input is active
  // Stores the index of the item, or null if no comment input is active
  const [commentInputActiveIndex, setCommentInputActiveIndex] = useState(null);
  const [currentComment, setCurrentComment] = useState("");
  const commentBoxRef = useRef(null); // Ref for the comment box to detect outside clicks

  const actionItems = [
    {
      title: "Low Credit Score",
      description:
        "Credit score below threshold. History of 2 write-offs and 90+ DPD in past 6 months.",
      risk: "High Risk",
      riskColor: "red-500",
    },
    {
      title: "Low Credit Score",
      description:
        "Recent employment; salary credits only for 2 months. Needs manual validation.",
      risk: "Moderate Risk",
      riskColor: "orange-500",
    },
    {
      title: "Low Credit Score",
      description: "Cash flow irregular. Multiple overdrafts were detected.",
      risk: "High Risk",
      riskColor: "red-500",
    },
    {
      title: "Pending Documents",
      description: "Waiting for updated income proof from the applicant.",
      risk: "Medium Risk",
      riskColor: "yellow-500",
    },
    {
      title: "High Debt-to-Income Ratio",
      description:
        "Applicant's current debt obligations are high relative to income.",
      risk: "High Risk",
      riskColor: "red-500",
    },
    {
      title: "Incomplete KYC",
      description: "Some KYC documents are missing or not properly verified.",
      risk: "High Risk",
      riskColor: "red-500",
    },
  ];

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

  const handleActionClick = (index) => {
    setCommentInputActiveIndex(index);
    setCurrentComment(""); // Clear comment when opening
  };

  const handleSubmitComment = (item, actionType, comment) => {
    console.log(
      `Action: ${actionType}, Title: ${item.title}, Comment: ${comment}`
    );
    // In a real application, you would send this data to your backend
    setCommentInputActiveIndex(null); // Hide the comment box
    setCurrentComment(""); // Clear the comment
  };

  const handleCancelComment = () => {
    setCommentInputActiveIndex(null); // Hide the comment box
    setCurrentComment(""); // Clear the comment
  };

  return (
    <div
      className={`bg-white p-6 rounded-lg shadow-sm overflow-y-auto flex flex-col ${className} border border-gray-400`}
      style={{ height: "calc(100vh - 232px)" }}
    >
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Actions</h2>
      <div className="flex flex-col gap-4 flex-1 overflow-y-auto custom-scrollbar pr-2">
        {actionItems.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-gray-800">{item.title}</h3>
              <div
                className={`text-sm px-2 py-1 rounded-full font-semibold text-${item.riskColor}`}
              >
                {item.risk}
                <span
                  className={`ml-2 inline-block w-3 h-3 rounded-full bg-${item.riskColor}`}
                ></span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">{item.description}</p>

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
                      handleSubmitComment(item, item.actionType, currentComment)
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
                  onClick={() => handleActionClick(index)} // Pass index to show comment box
                >
                  Restrict
                </button>
                <button
                  className="px-3 py-1 rounded-md bg-[#399E5A] text-white hover:bg-green-700 text-sm font-semibold transition-colors"
                  onClick={() => handleActionClick(index)} // Pass index to show comment box
                >
                  Proceed
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationAction;
