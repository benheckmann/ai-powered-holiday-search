import { useState, useEffect } from "react";

import { ChatCompletionRequestMessageRoleEnum as Role } from "openai";

import { api } from "~/utils/api";
import { GlobalProps } from "../interfaces/global-props";
import { Pages } from "../interfaces/page-name-enum";

export const ChatWidget: React.FC<GlobalProps> = (props) => {
  const [inputMessage, setInputMessage] = useState("");

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  };

  const chatHistory = api.llm.getChatHistory.useQuery(props.sessionId);
  const addUserMessage = api.llm.addUserMessage.useMutation();

  const handleMessageSubmit = () => {
    if (inputMessage.trim() !== "") {
      addUserMessage.mutate({
        sessionId: localStorage.getItem("sessionId")!,
        messageContent: inputMessage,
      });
      setInputMessage("");
    }
  };

  const handleEnterKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleMessageSubmit();
    }
  };

  return (
    <div
      className="dropdown-top dropdown-end dropdown fixed bottom-10 right-10"
      key={chatHistory.data ? chatHistory.data.length : 0}
    >
      <label tabIndex={0} className="btn-circle btn m-1">
        +
      </label>
      <div tabIndex={0} className="card dropdown-content w-80 bg-base-100 shadow-xl">
        <figure className="bg-primary p-6 text-2xl font-bold text-primary-content">Chat</figure>
        <div className="card-body p-4">
          {chatHistory.isFetched &&
            chatHistory.data!.map((message, index) => (
              <div
                key={index}
                className={`chat ${message.role === "user" ? "chat-end" : "chat-start"}`}
              >
                <div className="chat-bubble">{message.content}</div>
              </div>
            ))}
          {props.isLoading && <progress className="progress w-56"></progress>}
        </div>
        <div className="card-actions flex flex-nowrap items-center justify-end bg-base-200 p-4">
          <input
            type="text"
            placeholder="Type here"
            className="input-bordered input"
            value={inputMessage}
            onChange={handleMessageChange}
            onKeyDown={handleEnterKeyDown}
          />
          <button className="btn" onClick={handleMessageSubmit}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
