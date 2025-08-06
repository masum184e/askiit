"use client";

import React, { useState, useEffect } from "react";
import AchievementCard from "@/components/AchievementCard";
import type { AchievementResponse, AchievementListResponse } from "@/lib/types";
import Loading from "@/components/Loading";

const PAGE_SIZE = 9;

const Page = () => {
  const [achievements, setAchievements] = useState<AchievementResponse[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (page: number, search: string) => {
    setLoading(true);
    setError(null);
    try {
      const query = new URLSearchParams();
      query.append("page", page.toString());
      query.append("size", PAGE_SIZE.toString());
      if (search) {
        query.append("search", search);
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/achievements?${query.toString()}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch achievements");
      }
      const data: AchievementListResponse = await response.json();
      setAchievements(data._embedded?.data || []);
      setTotal(data.total || 0);
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
      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search competitions..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1); // reset to page 1 on search change
          }}
          className="border border-gray-300 outline-none rounded px-3 py-2 w-full"
        />
      </div>

      {/* Error */}
      {error && <div className="text-red-600 mb-4">{error}</div>}

      {/* Loading */}
      {loading ? (
        <Loading />
      ) : (
        <>
          {/* Achievements Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {achievements.map((achievement) => (
              <AchievementCard
                key={achievement.achievement_id}
                {...achievement}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          {total > 9 && (
            <div className="flex justify-center items-center mt-6 space-x-4">
              <button
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Previous
              </button>

              <span>
                Page {page} of {totalPages || 1}
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
