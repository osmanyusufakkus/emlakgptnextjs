// Emlakprompt.tsx
import { useEffect, useState } from "react";
import { searchStore } from "../store/searchStore";

export default function Emlakprompt() {
  const [choice, setChoice] = useState("");
  useEffect(() => {
    searchStore.getState().updateChoice(choice);
  }, [choice]);

  const handlePromptSubmit = async () => {
    const text = searchStore((state) => state.text);
    console.log("Text"+text);

    const response = await fetch("../../api/chat-gpt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: text,
      }),
    });
    console.log("Response"+response);
    const results = await response.json();
    results.choices.map((result: any) => {
      setChoice(result.message.content);
    });
  }

  return <>
  
    </>;
}

