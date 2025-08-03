import Image from "next/image";

export interface Achievement {
  image: string;
  position: string;
  name: string;
  session: string;
  description: string;
}

const AchievementCard = ({
  image,
  position,
  name,
  session,
  description,
}: Achievement) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 group hover:shadow-2xl hover:-translate-y-2 hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <Image
            src={image}
            alt={name}
            width={48}
            height={48}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <span className="text-sm font-medium text-yellow-700 bg-yellow-100 px-3 py-1 rounded-full transition-colors duration-300 group-hover:bg-yellow-200">
          {position}
        </span>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-1">{name}</h3>
      <p className="text-gray-600 text-sm mb-2">{description}</p>
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span className="text-yellow-600 font-medium">{session}</span>
      </div>
    </div>
  );
};

export default AchievementCard;
