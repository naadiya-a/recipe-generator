"use client";

import { getAnswer } from "./actions/ai";
import { useState } from "react";

export default function ChatWindow() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  return (
    <form>
      <input
        type="text"
        value={question}
        placeholder="Message Chef GPT"
        onChange={(e) => {
          setQuestion(e.target.value);
        }}
      ></input>
      <button
        onClick={async (e) => {
          e.preventDefault();
          const answer = await getAnswer(question);
          setResponse(answer.text);
        }}
      >
        Submit
      </button>
      <textarea value={response} readOnly></textarea>
    </form>
  );
}
