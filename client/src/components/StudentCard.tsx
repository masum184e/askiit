import Link from "next/link";
import { StudentResponse } from "@/lib/types";

const StudentCard = ({
  name,
  internship_company,
  session,
}: StudentResponse) => {
  return (
    <Link href="#" className="block">
      <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 group hover:-translate-y-1 hover:scale-105 transition-all duration-300 ease-in-out relative overflow-hidden">
        <div className="space-y-4">
          {/* Student Image */}
          <div className="flex justify-center">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <div className="w-12 h-12 bg-gray-300" />
            </div>
          </div>

          {/* Student Info */}
          <div className="text-center space-y-2">
            <h3 className="text-xl text-gray-800 font-semibold text-card-foreground group-hover:text-primary transition-colors duration-200">
              {name}
            </h3>

            <div className="flex justify-center gap-2 flex-wrap">
              {/* Session badge */}
              {session && (
                <span className="text-sm font-medium text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                  {session}
                </span>
              )}

              {/* Internship company badge */}
              {internship_company && (
                <span className="text-sm font-medium text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full border border-indigo-200">
                  {internship_company}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Decorative gradient border on hover */}
        <div className="absolute inset-0 rounded-xl bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none" />
      </div>
    </Link>
  );
};

export default StudentCard;
