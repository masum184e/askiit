import Image from "next/image";
import Link from "next/link";
import { AchievementResponse } from "@/lib/types";

const AchievementCard = ({
  competition_name,
  position,
  description,
  students,
}: AchievementResponse) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 group hover:shadow-2xl hover:-translate-y-2 hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        {/* Images Section */}
        {students && students.length > 0 ? (
          <div className="flex items-center gap-2 mb-4">
            {students.map((student) => (
              <Link key={student.id} href={`/students/${student.id}`}>
                <div className="w-12 h-12 rounded-full overflow-hidden hover:scale-110 transition-transform duration-300">
                  {student.image ? (
                    <Image
                      src={student.image}
                      alt={`Student ${student.id}`}
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-300 rounded-full" />
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : ""}

        {/* Achievement Info */}
        <span className="text-sm font-medium text-yellow-700 bg-yellow-100 px-3 py-1 rounded-full transition-colors duration-300 group-hover:bg-yellow-200">
          {position}
        </span>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mt-2 mb-1">
        {competition_name}
      </h3>
      <p className="text-gray-600 text-sm mb-2">{description}</p>
    </div>
  );
};

export default AchievementCard;
