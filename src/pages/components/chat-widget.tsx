import { useState } from "react";

import { Message } from "../interfaces/message";
import { GlobalProps } from "../interfaces/global-props";

export const ChatWidget: React.FC<GlobalProps> = (props) => {
  const [inputMessage, setInputMessage] = useState("");

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  };

  const handleMessageSubmit = () => {
    if (inputMessage.trim() !== "") {
      props.addUserMessage.mutate({
        sessionId: localStorage.getItem("sessionId")!,
        messageContent: inputMessage,
      });
      setInputMessage("");
    }
  };

  const handleClearHistory = () => {
    props.clearChatHistory.mutate(localStorage.getItem("sessionId")!);
  };

  const handleEnterKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleMessageSubmit();
    }
  };

  return (
    <div
      className="dropdown dropdown-top dropdown-end dropdown-open fixed bottom-10 right-10"
      key={props.chatHistory.data ? props.chatHistory.data.length : 0}
    >
      <label tabIndex={0} className="btn-circle btn m-1">
        +
      </label>
      <div tabIndex={0} className="card dropdown-content w-80 bg-base-100 shadow-xl">
        <figure className="bg-primary p-6 text-2xl font-bold text-primary-content">Chat</figure>
        <div className="card-body p-4">
          {props.chatHistory.isFetched &&
            props.chatHistory.data!.map((message: Message, index: number) => (
              <div
                key={index}
                className={`chat ${message.role === "user" ? "chat-end" : "chat-start"}`}
              >
                <div className="chat-bubble">{message.content}</div>
              </div>
            ))}
          {props.requestCompletion.isLoading && <progress className="progress w-56"></progress>}
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
          <button className="btn" onClick={handleClearHistory}>
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};
