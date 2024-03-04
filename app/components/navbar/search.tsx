"use client";

import Link from "next/link";
import { BiSearch } from "react-icons/bi";

const Search = () => {
  return (
    <div className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
      <div className="flex flex-row items-center justify-between">
        <div className="test-sm font-semibold px-6 cursor-text ">
          Search for property...
        </div>
        <div className="p-2 mr-2 bg-cyan-500 rounded-full text-white">
          <BiSearch
            size={18}
            onClick={async () => {
              const response = await fetch("/api/chat-gpt/emlakgptprompt", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  someData: true,
                }),
              });
              console.log("Çalışıyor", response);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
