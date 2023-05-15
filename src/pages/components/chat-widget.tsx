import { GlobalProps } from "../interfaces/global-props";
import { useState, useEffect, useRef } from "react";

export const ChatWidget: React.FC<GlobalProps> = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [inputMessage, setInputMessage] = useState("");

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  };

  const handleMessageSubmit = () => {
    if (inputMessage.trim() !== "") {
      props.setMessages([...props.messages, { role: "user", content: inputMessage }]);
      setInputMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleMessageSubmit();
    }
  };

  return (
    <div className="fixed bottom-4 right-4">
      {!collapsed && (
        <div className="rounded-lg bg-white p-4 shadow-md">
          <div className="mb-2 h-64 overflow-auto">
            {props.messages.map((message, index) => (
              <div
                key={index}
                className={`chat ${message.role === "user" ? "chat-end" : "chat-start"}`}
              >
                <div className="chat-bubble">{message.content}</div>
              </div>
            ))}
            {props.isLoading && <progress className="progress w-56"></progress>}
          </div>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Type here"
              className="input w-full max-w-xs"
              value={inputMessage}
              onChange={handleMessageChange}
              onKeyPress={handleKeyPress}
            />
            <button className="btn ml-2" onClick={handleMessageSubmit}>
              Send
            </button>
          </div>
        </div>
      )}
      <button className="btn-circle btn" onClick={() => setCollapsed(!collapsed)} title="Collapse">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};
