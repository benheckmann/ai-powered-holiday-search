import { useState } from "react";


import { Message } from "../interfaces/message";

export const ChatWidget: React.FC<any> = ({props, chatHistory, addUserMessage}) => {
  const [inputMessage, setInputMessage] = useState("");

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  };

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
            chatHistory.data!.map((message: Message, index: number) => (
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
