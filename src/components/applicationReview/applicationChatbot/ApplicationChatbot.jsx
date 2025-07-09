import { useEffect, useRef, useState } from "react";
import AccordionItem from "../../utils/accordionItem/AccordionItem";
import ChatMessageLoader from "../../ui/chatMessageLoader/ChatMessageLoader";

const ApplicationChatbot = ({
  applicationId,
  accordionAgentLifeCycle,
  loader
}) => {
  // userId prop removed
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false); // Still useful for a brief "typing" effect
  const [openAccordionIndex, setOpenAccordionIndex] = useState(0); // State to manage open accordion item
  const baseURL = import.meta.env.VITE_BASE_URL;
  const bottomRef = useRef(null);
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

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  const handleSendMessage = async (message) => {
    try {
      setInput("");
      setLoading(true);
      let url = `${baseURL}/api/v1/chat_stream/${message}`;
      if (applicationId) {
        url += `?checkpoint_id=${applicationId}`;
      }

      const eventSource = new EventSource(url, { withCredentials: true });
      console.log("Connecting to SSE at:", url);

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: message, sender: "user", timestamp: new Date() },
      ]);

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("Received event data:", data);

          if (data.type == "content") {
            setMessages((prevMessages) => {
              const lastMsg = prevMessages[prevMessages.length - 1];

              if (!lastMsg || lastMsg.sender !== "model") {
                // No previous message or previous one is finished:
                return [
                  ...prevMessages,
                  {
                    text: data.content,
                    sender: "model",
                    timestamp: new Date(),
                  },
                ];
              } else {
                // Append to the last message:
                const updatedMsg = {
                  ...lastMsg,
                  text: lastMsg.text + data.content,
                  timestamp: new Date(),
                };

                return [...prevMessages.slice(0, -1), updatedMsg];
              }
            });
          }
        } catch (error) {
          console.log("Error parsing event data:", error, event.data);
        } finally {
          setLoading(false);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-white p-6 rounded-lg shadow-sm flex flex-col justify-between border border-[#939393]"
      style={{ height: "calc(100vh - 200px)" }}
    >
      <div className="mb-4 max-h-[30vh] overflow-y-auto custom-scrollbar">
        {loader ? (
          <ChatMessageLoader />
        ) : (
          accordionAgentLifeCycle?.map((item, index) => (
            <AccordionItem
              key={index}
              title={item.agent_name}
              isOpen={openAccordionIndex === index}
              onClick={() =>
                setOpenAccordionIndex(
                  openAccordionIndex === index ? null : index
                )
              }
            >
              {item?.reasoning}
            </AccordionItem>
          ))
        )}
      </div>

      {/* Chat messages display area */}
      <div className="flex-1 overflow-y-auto mb-4 custom-scrollbar max-h-[30vh]">
        {messages.map((msg) => (
          <>
            <div
              key={msg.id}
              className={`flex items-start bg-gray-100 rounded-lg justify-start ${
                msg.sender === "user" ? "mb-1" : "mb-4"
              }`}
            >
              {msg.sender === "user" && (
                <div className="flex-shrink-0 w-8 h-8 bg-gray-500 text-white rounded-full flex items-center justify-center my-3 ml-3">
                  <span className="font-semibold">G</span>
                </div>
              )}
              <div
                className={`py-3 ${
                  msg.sender === "user"
                    ? "bg-gray-100 font-semibold px-3"
                    : "bg-white px-1"
                } rounded-lg w-full text-gray-900 rounded-bl-none`}
              >
                <p className="text-sm">{msg.text}</p>
              </div>
            </div>
            {msg.sender == "user" && (
              <span className="text-xs text-gray-400 my-1 block">
                {msg.timestamp
                  ? new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "Sending..."}
              </span>
            )}
          </>
        ))}
        {loading && (
          <div className="flex justify-start items-start mb-4">
            <div className="flex-shrink-0 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
              <span className="font-semibold text-gray-700">G</span>
            </div>
            <div className="p-3 rounded-lg bg-gray-100 text-gray-800 rounded-bl-none">
              <p className="text-sm">Typing...</p>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      {/* Message input area */}
      <div className=" relative">
        <input
          type="text"
          className="w-[100%] py-[15px] px-[10px] rounded-lg border border-[#DFDFDF] focus:outline-none focus:ring-2 focus:ring-[#0D4A84] text-sm"
          placeholder="Ask me anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSendMessage(input);
            }
          }}
          disabled={loading}
        />
        <button
          className="absolute right-[10px] top-[50%] transform -translate-y-1/2"
          onClick={() => handleSendMessage(input)}
          disabled={loading}
        >
          <span className="smm smm-action bg-[#0D4A84] text-[#fff] rounded-full p-[10px]"></span>
        </button>
      </div>
    </div>
  );
};

export default ApplicationChatbot;
