import { SPLResponse } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";

const ProjectCard = ({
  name,
  github,
  live,
  description,
  mentor,
  banner,
  students,
}: SPLResponse) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl group hover:shadow-2xl hover:-translate-y-2 hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
      {banner ? (
        <div className="h-48 w-full relative">
          <Image
            src={banner}
            alt={`${name} banner`}
            layout="fill"
            objectFit="cover"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="h-48 w-full relative bg-gray-300 rounded" />
      )}

      <div className="p-5 space-y-2">
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="text-gray-500 text-sm">{description}</p>
        {/* Images Section */}
        {students && students.length > 0 ? (
          <div className="flex items-center gap-2 mb-4">
            {students.map((student) => (
              <Link key={student.id} href={`/students/${student.id}`}>
                <div className="w-10 h-10 rounded-full overflow-hidden hover:scale-110 transition-transform duration-300">
                  {student.image ? (
                    <Image
                      src={student.image}
                      alt={`Student ${student.id}`}
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-300 rounded-full" />
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          ""
        )}
        <p className="text-gray-600 mb-4">Mentor: {mentor}</p>
        <div className="flex justify-between items-center text-sm font-medium text-blue-600">
          {github && (
            <Link href={github} target="_blank" rel="noopener noreferrer">
              GitHub
            </Link>
          )}
          {live && (
            <Link href={live} target="_blank" rel="noopener noreferrer">
              Live Demo
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
