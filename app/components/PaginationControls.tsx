"use client";

import { FC } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { listingCountStore } from "../store/listingCountStore";

interface PaginationControlsProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

const PaginationControls: FC<PaginationControlsProps> = ({
  hasNextPage,
  hasPrevPage,
}) => {
  const { listingCount } = listingCountStore.getState();
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";
  const per_page = searchParams.get("per_page") ?? "12";

  return (
    <div className="flex justify-center items-center mt-4 gap-2">
      <button
        className="bg-white text-gray-700 p-4 flex items-center gap-2 rounded-full outline-none hover:scale-[1.05]  hover:text-gray-950 transition cursor-pointer shadow-md border-[2px] border-cyan-500"
        disabled={!hasPrevPage}
        onClick={() => {
          router.push(
            `https://emlakgptnextjs.vercel.app/listings/?page=${
              Number(page) - 1
            }&per_page=${per_page}`
          );
        }}
      >
        prev page
      </button>

      <div>
        {page} / {Math.ceil(listingCount / Number(per_page))}
      </div>

      <button
        className="bg-white text-gray-700 p-4 flex items-center gap-2 rounded-full outline-none hover:scale-[1.05]  hover:text-gray-950 transition cursor-pointer shadow-md border-[2px] border-cyan-500"
        disabled={!hasNextPage}
        onClick={() => {
          const newUrl = `https://emlakgptnextjs.vercel.app/listings/?page=${
            Number(page) + 1
          }&per_page=${per_page}`;
          console.log(newUrl);
          try {
            router.push(newUrl);
          } catch (error) {
            console.error(error);
          }
        }}
      >
        next page
      </button>
    </div>
  );
};

export default PaginationControls;
