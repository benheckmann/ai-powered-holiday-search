import { ChangeEventHandler, useEffect, useState } from "react";

import { ChatCompletionRequestMessageRoleEnum as Role } from "openai";

import { Pages } from "../interfaces/page-name-enum";
import { GlobalProps } from "../interfaces/global-props";
import { api } from "~/utils/api";

export const NLPSearchForm: React.FC<GlobalProps> = (props) => {
  const [userInput, setUserInput] = useState("");

  const chatCompletion = api.llm.llmChat.useQuery(props.messages);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUserInput(e.target.value);
  };

  const handleEnterKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    props.setMessages([{ role: "user", content: userInput }]);
  };

  useEffect(() => {
    const fetchData = async () => {
      const newUserMessage = props.messages.length > 0 && props.messages[props.messages.length - 1]!.role === Role.User
      if (props.messages.length > 0 && props.messages[props.messages.length - 1]!.role === Role.User) {
        props.setIsLoading(true);
        props.setCurrentPage(Pages.RESULTS);
        console.log("Calling llm endpoint with ", userInput);
        const response = await chatCompletion.refetch();
        props.setMessages([...props.messages, response.data!]);
        props.setIsLoading(false);
      }
    };
    fetchData();
  }, [props.messages]);

  return (
    <div className="rounded-lg bg-secondary p-4">
      <h2 className="mb-4 text-xl font-bold">Wie stellst du dir deine nächste Reise vor?</h2>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Type here"
          className="input mr-2 w-96 max-w-xs"
          value={userInput}
          onChange={handleChange}
          onKeyDown={handleEnterKeyDown}
        />
        <button className="btn-primary btn" onClick={handleSubmit}>
          Reise finden
        </button>
      </div>
    </div>
  );
};
