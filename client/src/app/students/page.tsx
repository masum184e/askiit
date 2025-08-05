"use client";

import { useState } from "react";
import BatchContainer from "@/components/BatchContainer";
import StudentContainer from "@/components/StudentContainer";
import { useSearchParams } from "next/navigation";

import { ArrowLeft } from "lucide-react";

const Page = () => {
  const query = useSearchParams();
  const session = query.get("session");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  return (
    <div className="mt-[95px] px-4 py-2 h-[calc(100vh-100px)] overflow-y-auto pr-2 scrollable-hidden">
      <div className="mb-4 relative w-full">
        {/* Input with left padding for the icon */}
        <input
          type="text"
          placeholder="Search students..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1); // reset page when searching
          }}
          className="border border-gray-300 outline-none focus:border-blue-300 rounded px-10 py-2 w-full"
        />
        {/* Left-side icon */}
        <ArrowLeft
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
          size={18}
          onClick={() => {
            history.back(); // Go back in browser history
          }}
        />
      </div>

      {session ? (
        <StudentContainer
          page={page}
          search={search}
          session={session}
          setPage={setPage}
        />
      ) : (
        <BatchContainer />
      )}
    </div>
  );
};

export default Page;
