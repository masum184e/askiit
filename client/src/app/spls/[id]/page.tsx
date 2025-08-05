"use client";

import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import Loading from "@/components/Loading";
import { SPLResponse, SPLListResponse } from "@/lib/types";

const PAGE_SIZE = 6;

const Page = () => {
  const [splList, setSplList] = useState<SPLResponse[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (page: number, search: string) => {
    try {
      setLoading(true);
      setError(null);

  const query = new URLSearchParams();
      query.append("page", page.toString());
      query.append("size", PAGE_SIZE.toString());
      if (search) {
        query.append("search", search);
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/spl?${query.toString()}`
      );

      if (!res.ok) throw new Error("Failed to fetch SPLs");

      const data: SPLListResponse = await res.json();
      setSplList(data._embedded?.spl ?? []);
      setTotal(data.total);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when page or search changes
  useEffect(() => {
    fetchData(page, search);
  }, [page, search]);

  // Calculate total pages
  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="mt-[95px] px-4 py-2 h-[calc(100vh-100px)] overflow-y-auto pr-2 scrollable-hidden">
      {/* Search + Back Button */}
      <div className="mb-4 relative w-full">
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1); // reset page on new search
          }}
          className="border border-gray-300 outline-none focus:border-blue-300 rounded px-10 py-2 w-full"
        />
        <ArrowLeft
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
          size={18}
          onClick={() => history.back()}
        />
      </div>

      {/* Error or Loading */}
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {loading ? (
        <Loading />
      ) : (
        <>
          {/* SPL Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {splList.map((spl) => (
              <ProjectCard key={spl.spl_id} {...spl} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-6 space-x-4">
              <button
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span>
                Page {page} of {totalPages}
              </span>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Page;
