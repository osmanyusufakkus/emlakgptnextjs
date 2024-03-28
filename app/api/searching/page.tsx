"use client";
import { searchStore } from "@/app/store/searchStore";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/app/listings/loading";
import { HandlePrompt } from "@/app/actions/handlePrompt";

export default function Searching() {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const [choice, setChoice] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    searchStore.getState().updateChoice(choice);
    HandlePrompt(choice);
  }, [choice]);

  const handlePromptSubmit = async (prompt: any) => {
    const response = await fetch("../../api/chat-gpt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt,
      }),
    });
    console.log("Response" + response);
    const results = await response.json();
    results.choices.map((result: any) => {
      setChoice(result.message.content);
    });
  };

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div>
        <Image
          src="/images/background.png"
          alt="searching background"
          layout="fill"
          objectFit="cover"
        />

        <div className="pt-80 px-1 md:px-8 text-center relative text-gray-200  font-bold text-4xl md:text-5xl overflow-auto">
          <h1 className="pb-4">Aradığın evi tanımlamaya başla...</h1>
          <div className="w-11/12 md:w-3/4 lg:max-w-3xl m-auto ">
            <div className="relative z-30 text-base text-gray-200 ">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (prompt === "") return;
                  handlePromptSubmit(prompt);
                  setLoading(true);
                  setTimeout(() => {
                    router.push("/listings");
                    setLoading(false);
                  }, 3000);
                }}
              >
                <textarea
                  placeholder="Konyada 3+1 ev arıyorum..."
                  className="mt-2 shadow-md focus:outline-none placeholder-gray-200 rounded-2xl py-3 px-6 block w-full bg-gray-100 bg-opacity-5 backdrop-filter backdrop-blur-md"
                  style={{
                    minHeight: "3rem",
                    maxHeight: "15rem",
                    height: "8rem",
                  }}
                  name="prompt"
                  value={prompt}
                  onChange={(e) => {
                    e.preventDefault();
                    setPrompt(e.target.value);
                  }}
                />
                <input
                  type="submit"
                  value="Submit"
                  className="bg-cyan-500 text-white rounded-full py-2 px-6 mt-2 hover:cursor-pointer"
                />
              </form>
              <div className="text-left absolute top-10 rounded-t-none rounded-b-2xl shadow bg-transparent divide-y w-full max-h-40 overflow-auto"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
