"use client";

import { useEffect, useState } from "react";
import EmlakPrompt from "../Emlakprompt";
import { searchStore } from "../../store/searchStore";

const Search = () => {
  const [choice, setChoice] = useState("");
  useEffect(() => {
    searchStore.getState().updateChoice(choice);
  }, [choice]);

  const handlePromptSubmit = async (prompt: any) => {
    const response = await fetch("../../api/chat-gpt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt,
      }),
    });
    const results = await response.json();
    results.choices.map((result: any) => {
      setChoice(result.message.content);
    });
  };

  return (
    <div className="border-[1px] w-full md:w-auto py-2 rounded-full">
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm font-semibold px-2">
          <EmlakPrompt onSubmit={handlePromptSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Search;
