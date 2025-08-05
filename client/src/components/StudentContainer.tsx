"use client";

import { useEffect, useState } from "react";
import StudentCard from "@/components/StudentCard";
import { StudentResponse, StudentListResponse } from "@/lib/types";
import Loading from "@/components/Loading";

const PAGE_SIZE = 9;

const StudentContainer = ({ page, search = "", session, setPage }: {
  page: number;
  search: string;
  session: string;
  setPage: (page: number) => void;
}) => {
  const [students, setStudents] = useState<StudentResponse[]>([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (page: number, search: string, session: string) => {
    setLoading(true);
    setError(null);
    try {
      const query = new URLSearchParams({
        size: PAGE_SIZE.toString(),
        page: page.toString(), // ✅ use actual page
      });
      if (search) query.append("search", search);
      if (session) query.append("session_filter", session); // ✅ correct param name

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/students?${query.toString()}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch students");
      }

      const data: StudentListResponse = await response.json();
      setStudents(data._embedded?.students || []);
      setTotal(data.total || 0);
    } catch (error: unknown) {
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page, search, session);
  }, [page, search, session,]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <>
      {/* Error */}
      {error && <div className="text-red-600 mb-4">{error}</div>}

      {/* Loading */}
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {students.map((student) => (
              <StudentCard key={student.student_id} {...student} />
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
    </>
  );
};

export default StudentContainer;
