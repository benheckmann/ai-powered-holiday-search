import { ChangeEventHandler, useEffect, useState } from "react";
import { Pages } from "../interfaces/page-name-enum";
import { GlobalProps } from "../interfaces/global-props";

import { api } from "~/utils/api";

export const NLPSearchForm: React.FC<GlobalProps> = (props) => {
  const [userInput, setUserInput] = useState("");

  const initialCompletion = api.llm.initialLLMQuery.useQuery({ text: userInput });

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
    setUserInput("QUERY: " + userInput); // workaround for tRPC querying on every keystroke
  };

  useEffect(() => {
    if (userInput.startsWith("QUERY: ")) {
      props.setIsLoading(true);
      props.setCurrentPage(Pages.RESULTS);
      console.log("Calling llm endpoint with ", userInput);
      initialCompletion
        .refetch()
        .then((response) => {
          props.setMessages([...props.messages, response.data!]);
          props.setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          props.setIsLoading(false);
        });
    }
  }, [userInput]);

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
