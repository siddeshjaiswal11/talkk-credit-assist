import { useEffect, useRef, useState } from "react";
import AccordionItem from "../../utils/accordionItem/AccordionItem";
import ChatMessageLoader from "../../ui/chatMessageLoader/ChatMessageLoader";
import "./ApplicationChatbot.css"; // Import the CSS file

const ApplicationChatbot = ({
  applicationId,
  accordionAgentLifeCycle,
  loader,
}) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [openAccordionIndex, setOpenAccordionIndex] = useState(0);
  const baseURL = import.meta.env.VITE_BASE_URL;
  const bottomRef = useRef(null);

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

          if (data.type === "content") {
            setMessages((prevMessages) => {
              const lastMsg = prevMessages[prevMessages.length - 1];

              if (!lastMsg || lastMsg.sender !== "model") {
                return [
                  ...prevMessages,
                  {
                    text: data.content,
                    sender: "model",
                    timestamp: new Date(),
                  },
                ];
              } else {
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
    <div className="application-chatbot-container">
      <div className="application-chatbot-accordion">
        {loader ? (
          <>
            <h1 className="application-chatbot-title">Agent Lifecycle</h1>
            <ChatMessageLoader />
          </>
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

      <div className="application-chatbot-messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`application-chatbot-message ${
              msg.sender === "user" ? "application-chatbot-message-user" : ""
            }`}
          >
            {msg.sender === "user" && (
              <div className="application-chatbot-avatar">G</div>
            )}
            <div className="application-chatbot-text">{msg.text}</div>
          </div>
        ))}
        {loading && (
          <div className="application-chatbot-loading">
            <div className="application-chatbot-avatar">G</div>
            <div className="application-chatbot-text">Typing...</div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="application-chatbot-input-container">
        <input
          type="text"
          className="application-chatbot-input"
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
          className="application-chatbot-send-button"
          onClick={() => handleSendMessage(input)}
          disabled={loading}
        >
          <span className="smm smm-action application-chatbot-send-icon"></span>
        </button>
      </div>
    </div>
  );
};

export default ApplicationChatbot;
