import Image from "next/image";

interface ProjectCardProps {
  banner: string;
  name: string;
  github: string;
  live: string;
  description: string;
}

const ProjectCard = ({ banner, name, github, live, description }: ProjectCardProps) => {
  return (
    <div
      className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
    >
      <div className="h-48 w-full relative">
        <Image src={banner} alt={name} fill className="object-cover" />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <div className="flex justify-between items-center text-sm font-medium text-blue-600">
          <a href={github} target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
          <a href={live} target="_blank" rel="noopener noreferrer" className="hover:underline">Live Demo</a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
