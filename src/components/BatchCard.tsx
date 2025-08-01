import Link from "next/link";

interface BatchCardProps {
  batchName: string;
  session: string;
}

export const BatchCard = ({ batchName, session }: BatchCardProps) => {
  return (
    <Link href={`/batches/${batchName}`} >
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 group hover:-translate-y-1 relative overflow-hidden">
      <div className="space-y-3">
        <h3 className="text-xl font-semibold text-slate-900 group-hover:text-blue-600 transition-colors duration-200">
          Batch - {batchName}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500 font-medium">Session:</span>
          <span className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
            {session}
          </span>
        </div>
      </div>
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"></div>
    </div>
    </Link>
  );
};
