import { useState } from "react";
import { BiSearch } from "react-icons/bi";

export default function Emlakprompt({ onSubmit }: any) {
  const [prompt, setPrompt] = useState("");
  return (
    <form
      className="flex flex-row justify-between"
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
      <div className="p-2 mr-2 bg-cyan-500 rounded-full text-white shadow-sm hover:shadow-md transition cursor-pointer">
        <BiSearch
          size={18}
          onClick={async (e) => {
            e.preventDefault();
            if (prompt === "") {
              return;
            }
            onSubmit(prompt);
            setPrompt("");
          }}
        />
      </div>
    </form>
  );
}
