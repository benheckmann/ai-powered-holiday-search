import { ChangeEventHandler, useState } from "react";
import { Pages } from "../interfaces/page-name-enum";
import { GlobalProps } from "../interfaces/global-props";

export const NLPSearchForm: React.FC<GlobalProps> = (props) => {
  const [text, setText] = useState("");

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async () => {
    // const response = await fetch('http://127.0.0.1:5000/api/search', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({text}),
    // });
    // const structuredQuery = await response.json();
    // console.log("response from python: ", structuredQuery);
    props.setCurrentPage(Pages.RESULTS);
  };

  return (
    <div className="rounded-lg bg-secondary p-4">
      <h2 className="mb-4 text-xl font-bold">Wie stellst du dir deine nächste Reise vor?</h2>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Type here"
          className="input mr-2 w-96 max-w-xs"
          value={text}
          onChange={handleChange}
        />
        <button className="btn-primary btn" onClick={handleSubmit}>
          Reise finden
        </button>
      </div>
    </div>
  );
};
