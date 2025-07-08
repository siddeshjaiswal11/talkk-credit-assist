import { useState } from "react";
import AccordionItem from "../../utils/accordionItem/AccordionItem";

const ApplicationChatbot = () => {
  // userId prop removed
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false); // Still useful for a brief "typing" effect
  const [openAccordionIndex, setOpenAccordionIndex] = useState(0); // State to manage open accordion item
  const baseURL = import.meta.env.VITE_BASE_URL;
  const accordionData = [
    {
      title: "Company Financial Agent",
      content: (
        <>
          <div className="flex items-center text-green-600 font-medium mb-2">
            <svg
              className="w-5 h-5 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              ></path>
            </svg>
            Fetched company registration & financial filings from MCA
          </div>
          <ul className="list-disc list-inside text-sm text-gray-700 ml-4">
            <li>ROC Registration: 2010</li>
            <li>Paid-up Capital: ₹10 Cr</li>
            <li>Last Filed Balance Sheets & Profit/Loss (FY21-23)</li>
            <li className="flex items-center">
              Active Status:{" "}
              <svg
                className="w-4 h-4 text-green-600 ml-1 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Compliant
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "Director Intel Agent",
      content: "Details about Director Intel Agent...",
    },
    {
      title: "Credit Risk Agent",
      content: "Details about Credit Risk Agent...",
    },
    { title: "Tax Data Agent", content: "Details about Tax Data Agent..." },
    {
      title: "Borrower Profile Agent",
      content: "Details about Borrower Profile Agent...",
    },
    {
      title: "Compliance & Fraud Check Agent",
      content: "Details about Compliance & Fraud Check Agent...",
    },
  ];

  const handleSendMessage = async ({message}) => {
    try {
      let url = `${baseURL}/api/v1/chat_stream/${encodeURIComponent(message)}`;
      if (applicationId) {
        url += `?checkpoint_id=${encodeURIComponent(applicationId)}`;
      }

      const eventSource = new EventSource(url, { withCredentials: true });
      console.log("Connecting to SSE at:", url);

      eventSource.onmessage = async (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("Received event data:", data);
          
        } catch (error) {
          console.log("Error parsing event data:", error, event.data);
        }
      };

      eventSource.onerror = (error) => {
        eventSource.close();
      };

      eventSource.addEventListener("end", () => {
        eventSource.close();
      });
    } catch (error) {
      console.error("Error setting up EventSource:", error);
    }
  };



  return (
    <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col min-h-[78vh] border border-gray-400">
      <div className="mb-4 max-h-[30vh] overflow-y-auto custom-scrollbar">
        {accordionData.map((item, index) => (
          <AccordionItem
            key={index}
            title={item.title}
            isOpen={openAccordionIndex === index}
            onClick={() => setOpenAccordionIndex(openAccordionIndex === index ? null : index)}
          >
            {item.content}
          </AccordionItem>
        ))}
      </div>

      {/* Chat messages display area */}
      <div className="flex-1 overflow-y-auto mb-4 custom-scrollbar max-h-[30vh]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start bg-gray-100 rounded-lg mb-4 justify-start`}
          >
            {msg.sender === "model" && (
              <div className="flex-shrink-0 w-8 h-8 bg-gray-500 text-white rounded-full flex items-center justify-center my-3 ml-3">
                <span className="font-semibold">G</span>
              </div>
            )}
            <div
              className={`p-3 rounded-lg w-full bg-gray-100 text-gray-900 font-semibold rounded-bl-none`}
            >
              <p className="text-sm">{msg.text}</p>
              {msg.sender != "model" && (<span className="text-xs text-gray-400 mt-1 block">
                {msg.timestamp
                  ? new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "Sending..."}
              </span>)}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start items-start mb-4">
            <div className="flex-shrink-0 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
              <span className="font-semibold text-gray-700">R</span>
            </div>
            <div className="p-3 rounded-lg bg-gray-100 text-gray-800 rounded-bl-none">
              <p className="text-sm">Typing...</p>
            </div>
          </div>
        )}
      </div>

      {/* User ID display - Removed as userId is not used */}
      {/* {userId && (
          <div className="text-xs text-gray-500 mb-2">
            Your User ID: <span className="font-mono break-all">{userId}</span>
          </div>
        )} */}

      {/* Message input area */}
      <div className="flex items-center border-t border-gray-200 pt-4">
        <input
          type="text"
          className="flex-1 p-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          placeholder="Ask me anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
          disabled={loading}
        />
        <button
          className="bg-blue-600 text-white p-3 rounded-r-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleSendMessage}
          disabled={loading}
        >
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            ></path>
            <path
              fillRule="evenodd"
              d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ApplicationChatbot;
