import Link from "next/link";

interface CourseCardProps {
  name: string;
  code: string;
}

export const CourseCard = ({ name, code }: CourseCardProps) => {
  return (
    <Link href={`/questions/${code}`}>
      <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 group hover:-translate-y-1 relative overflow-hidden h-36 flex flex-col justify-between">
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-slate-900 group-hover:text-blue-600 transition-colors duration-200">
            {name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500 font-medium">Code:</span>
            <span className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              {code}
            </span>
          </div>
        </div>
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"></div>
      </div>
    </Link>
  );
};
