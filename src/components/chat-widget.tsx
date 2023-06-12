import { useEffect, useState } from "react";
import { ChatCompletionRequestMessageRoleEnum as Role } from "openai";

import type { Message } from "../utils/types/message";
import type { GlobalProps } from "../utils/types/global-props";
import type { LLMJson } from "~/utils/types/llm-json";

const ChatWidget: React.FC<GlobalProps> = (props) => {
  const [inputMessage, setInputMessage] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(true);

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  };

  const handleMessageSubmit = () => {
    const sessionId = localStorage.getItem("sessionId");
    if (inputMessage.trim() !== "" && sessionId) {
      props.addUserMessage.mutate({
        sessionId: sessionId,
        messageContent: inputMessage,
      });
      setInputMessage("");
    }
  };

  const handleClearHistory = () => {
    const sessionId = localStorage.getItem("sessionId");
    if (sessionId) {
      props.clearChatHistory.mutate(sessionId);
    }
  };

  const handleEnterKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleMessageSubmit();
    }
  };

  // make sure not to display the chat if there is no chat history
  useEffect(() => {
    if (props.chatHistory.data && props.chatHistory.data.length === 0) {
      setIsChatOpen(false);
    } else {
      setIsChatOpen(true);
    }
  }, [props.currentPage]);

  const renderChatBubble = (message: Message, index: number) => {
    let text = message.content;
    if (message.role === Role.Assistant) {
      try {
        const parsedJson = JSON.parse(message.content) as LLMJson;
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
      className="dropdown dropdown-top dropdown-end dropdown-open fixed bottom-10 right-10 z-20"
      key={props.chatHistory.data ? props.chatHistory.data.length : 0}
    >
      <button onClick={() => setIsChatOpen(!isChatOpen)} className="btn-primary btn-circle btn m-1">
        {isChatOpen ? "-" : "+"}
      </button>
      {isChatOpen && (
        <div className="w-160 card dropdown-content bg-base-100 shadow-xl">
          <figure className="bg-accent p-6 text-2xl font-bold text-base-100">Chat</figure>
          <div className="card-body overflow-auto p-4" style={{ height: "300px" }}>
            {props.chatHistory.isFetched &&
              props.chatHistory.data &&
              props.chatHistory.data.map(renderChatBubble)}
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

export default ChatWidget;
