import {NextPage} from "next";
import {ChangeEventHandler, useState} from "react";

export const NLPSearchForm: NextPage = () => {

  const [text, setText] = useState("");

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async () => {
    const response = await fetch('http://127.0.0.1:5000/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({text}),
    });
    const structuredQuery = await response.json();
    console.log("response from python: ", structuredQuery);
  };


  return (
    <div className="bg-secondary p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Wie stellst du dir deine nächste Reise vor?</h2>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Type here"
          className="input w-96 max-w-xs mr-2"
          value={text}
          onChange={handleChange}
        />
        <button className="btn btn-primary" onClick={handleSubmit}>Reise finden</button>
      </div>
    </div>
  );
}
