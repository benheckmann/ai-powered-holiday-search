import { ChangeEventHandler, useState } from "react";

import { Pages } from "../../utils/types/page-name-enum";
import { GlobalProps } from "../../utils/types/global-props";

/* eslint-disable */

export const NLPSearchForm: React.FC<GlobalProps> = (props) => {
  const [userInput, setUserInput] = useState("");

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUserInput(e.target.value);
  };

  const handleEnterKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (userInput.trim() !== "") {
      props.addUserMessage.mutate({
        sessionId: localStorage.getItem("sessionId")!,
        messageContent: userInput,
      });
      props.setCurrentPage(Pages.RESULTS);
    }
  };

  return (
    <div className="rounded-lg bg-secondary p-4">
      <h2 className="mx-20 mb-4  text-xl font-bold">Wie stellst du dir deine nächste Reise vor?</h2>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Kitesurfen in Europa mit meiner Familie im August..."
          className="input mr-2 w-full"
          value={userInput}
          onChange={handleChange}
          onKeyDown={handleEnterKeyDown}
        />
        <button className="btn-primary btn text-base-100" onClick={handleSubmit}>
          Reise finden
        </button>
      </div>
    </div>
  );
};
