"use client";

import { BiSearch } from "react-icons/bi";
import { useState } from "react";
import EmlakPrompt from "../EmlakPrompt";

const Search = () => {
  const [choices, setChoices] = useState([]);
  return (
    <div className="border-[1px] w-full md:w-auto py-2 rounded-full">
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm font-semibold px-2">
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
      </div>
    </div>
  );
};

export const ChoicesList = ({ choices }: { choices: any[] }) => {
  return (
    <>
      {choices.map((choice: any) => {
        return <p key={choice.index}>{choice.message.content}</p>;
      })}
    </>
  );
};

export default Search;
