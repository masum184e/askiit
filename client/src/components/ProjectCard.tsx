import { SPLResponse } from "@/lib/types";
import Link from "next/link";

const ProjectCard = ({ name, github, live, overview, mentor }: SPLResponse) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl group hover:shadow-2xl hover:-translate-y-2 hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
      <div className="h-48 w-full relative"></div>
      <div className="p-5 space-y-2">
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="text-gray-500 text-sm">{overview}</p>
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
