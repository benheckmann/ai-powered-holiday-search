import { useState, useEffect } from "react";

import { ChatCompletionRequestMessageRoleEnum as Role } from "openai";

import { api } from "~/utils/api";
import { GlobalProps } from "../interfaces/global-props";
import { Pages } from "../interfaces/page-name-enum";

export const ChatWidget: React.FC<GlobalProps> = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [inputMessage, setInputMessage] = useState("");

  const chatCompletion = api.llm.llmChat.useQuery(props.messages);

  useEffect(() => {
    const newUserMessage = props.messages.length > 0 && props.messages[props.messages.length - 1]!.role === Role.User
    const fetchData = async () => {
      if (newUserMessage) {
        props.setIsLoading(true);
        const response = await chatCompletion.refetch();
        props.setMessages([...props.messages, response.data!]);
        props.setIsLoading(false);
      }
    };
    fetchData();
  }, [props.messages]);

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  };

  const handleSubmit = () => {
    if (inputMessage.trim() !== "") {
      props.setMessages([...props.messages, { role: "user", content: inputMessage }]);
      setInputMessage("");
    }
  };

  const handleEnterKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };


  return (
    <div className="fixed bottom-4 right-4">
      {!collapsed && (
        <div className="bg-white rounded-lg p-4 shadow-md">
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
              onKeyDown={handleEnterKeyDown}
            />
            <button className="btn ml-2" onClick={handleSubmit}>
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
