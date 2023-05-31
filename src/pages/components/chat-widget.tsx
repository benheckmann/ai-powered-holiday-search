import { useEffect, useState } from "react";
import { ChatCompletionRequestMessageRoleEnum as Role } from "openai";

import { Message } from "../../utils/types/message";
import { GlobalProps } from "../../utils/types/global-props";

export const ChatWidget: React.FC<GlobalProps> = (props) => {
  const [inputMessage, setInputMessage] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(true);

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

  const renderChatBubble = (message: Message, index: number) => {
    let text = message.content;
    if (message.role === Role.Assistant) {
      try {
        const parsedJson = JSON.parse(message.content);
        text = parsedJson.chatResponse;
      } catch (e) {
        text =
          "Tut mir leid, etwas ist schief gelaufen. Bitte versuche es noch einmal oder leere den Chat.";
      }
    }
    return (
      <div key={index} className={`chat ${message.role === Role.User ? "chat-end" : "chat-start"}`}>
        <div className="chat-bubble">{text}</div>
      </div>
    );
  };

  return (
    <div
      className="dropdown-top dropdown-end dropdown dropdown-open fixed bottom-10 right-10 z-20"
      key={props.chatHistory.data ? props.chatHistory.data.length : 0}
    >
      <button onClick={() => setIsChatOpen(!isChatOpen)} className="btn-circle btn btn-primary m-1">
        {isChatOpen ? "-" : "+"}
      </button>
      {isChatOpen && (
        <div className="w-160 dropdown-content card bg-base-100 shadow-xl">
          <figure className="bg-accent p-6 text-2xl font-bold text-base-100">Chat</figure>
          <div className="card-body overflow-auto p-4" style={{ height: "300px" }}>
            {props.chatHistory.isFetched && props.chatHistory.data!.map(renderChatBubble)}
            {props.requestCompletion.isLoading && <progress className="progress w-56"></progress>}
          </div>
          <div className="card-actions flex flex-nowrap items-center justify-end bg-base-200 p-4">
            <input
              type="text"
              placeholder="Neue Nachricht"
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
      )}
    </div>
  );
};
