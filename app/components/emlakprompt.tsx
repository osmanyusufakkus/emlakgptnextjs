import { useState } from "react";

export default function Emlakprompt({ onSubmit }: any) {
  const [prompt, setPrompt] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (prompt === "") {
          return;
        }
        onSubmit(prompt);
        setPrompt("");
      }}>
      <input
        className="focus:outline-none"
        type="text"
        value={prompt}
        onChange={(e) => {
          setPrompt(e.target.value);
        }}
      />
      <input type="submit" />
    </form>
  );
}
