import { BiSearch } from "react-icons/bi";
import Link from "next/link";

const Search = () => {
  return (
    <div className="border-[2px] border-cyan-500 w-full md:w-auto py-2 rounded-full hover:bg-cyan-50/25 transition cursor-pointer">
      <div className="flex flex-row items-center justify-between">
        <div className="m-2 ml-5 text-gray-700/70">
          <Link href="/api/searching">Ara ve Keşfet...</Link>
        </div>
        <div className="text-sm font-semibold px-2 p-2 mr-2 bg-cyan-500 rounded-full text-white shadow-sm hover:shadow-md transition cursor-pointer ">
          <BiSearch size={18} />
        </div>
      </div>
    </div>
    
  );
};

export default Search;
