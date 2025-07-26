import Link from "next/link";
import Image from "next/image";

export interface StudentCardProps {
  batchId: number;
  studentId: number;
  name: string;
  currentCompany: string;
  image: string;
}

const StudentCard = ({
  batchId,
  studentId,
  name,
  currentCompany,
  image,
}: StudentCardProps) => {
  return (
    <Link href={`/batches/${batchId}/students/${studentId}`} className="block">
      <div className="bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 border border-border group hover:-translate-y-1">
        <div className="space-y-4">
          {/* Student Image */}
          <div className="flex justify-center">
            <Image
              src={image}
              alt={`${name} profile`}
              width={100}
              height={100}
              className="w-20 h-20 rounded-full object-cover border-2 border-primary/20 group-hover:border-primary/40 transition-colors duration-200"
            />
          </div>

          {/* Student Info */}
          <div className="text-center space-y-2">
            <h3 className="text-xl font-semibold text-card-foreground group-hover:text-primary transition-colors duration-200">
              {name}
            </h3>
            <div className="flex justify-center">
              <span className="text-sm font-semibold text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full">
                {currentCompany}
              </span>
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
