"use client";

import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import EmlakPrompt from "../EmlakPrompt";

const Search = () => {
  const [choices, setChoices] = useState([]);
  return (
    <div className="border-[1px] w-full md:w-auto py-2 rounded-full">
      <div className="flex flex-row items-center justify-between">
        <div className="test-sm font-semibold px-6 cursor-text ">
          <EmlakPrompt
            onSubmit={async (prompt: any) => {
              const response = await fetch("../../api/chat-gpt", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  prompt,
                }),
              });
              const result = await response.json();
              setChoices(result.choices);
            }}
          />
        </div>
        <div className="p-2 mr-2 bg-cyan-500 rounded-full text-white">
          <BiSearch
            size={18} //onClick={async () => {}}
          />
        </div>
      </div>
      {choices.map((choice: any) => {
        return <p key={choice.index}>{choice.message.content}</p>;
      })}
    </div>
  );
};

export default Search;
