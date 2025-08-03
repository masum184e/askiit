import AchievementCard, { Achievement } from "@/components/AchievementCard";

const Page = () => {
  const achievements: Achievement[] = [
    {
      image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
      position: "1st Place",
      name: "Alice Johnson",
      session: "2024 - 2025",
      description: "Top scorer in national math challenge",
    },
    {
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
      position: "3rd Place",
      name: "Catherine Smith",
      session: "2025 - 2026",
      description: "Created an AI assistant for emergencies",
    },
    {
      image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
      position: "Winner",
      name: "Daniela Martin",
      session: "2026 - 2027",
      description: "Best speaker at national level",
    },
    {
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
      position: "Finalist",
      name: "Ethan Park",
      session: "2027 - 2028",
      description: "Pitched EdTech startup at bootcamp finale",
    },
    {
      image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39",
      position: "Top 5",
      name: "Fatima Khan",
      session: "2025 - 2026",
      description: "Won top 5 for 'Urban Stillness' photo",
    },  {
      image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
      position: "1st Place",
      name: "Alice Johnson",
      session: "2024 - 2025",
      description: "Top scorer in national math challenge",
    },
    {
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
      position: "3rd Place",
      name: "Catherine Smith",
      session: "2025 - 2026",
      description: "Created an AI assistant for emergencies",
    },
    {
      image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
      position: "Winner",
      name: "Daniela Martin",
      session: "2026 - 2027",
      description: "Best speaker at national level",
    },
    {
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
      position: "Finalist",
      name: "Ethan Park",
      session: "2027 - 2028",
      description: "Pitched EdTech startup at bootcamp finale",
    },
    {
      image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39",
      position: "Top 5",
      name: "Fatima Khan",
      session: "2025 - 2026",
      description: "Won top 5 for 'Urban Stillness' photo",
    },
      {
      image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
      position: "1st Place",
      name: "Alice Johnson",
      session: "2024 - 2025",
      description: "Top scorer in national math challenge",
    },
    {
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
      position: "3rd Place",
      name: "Catherine Smith",
      session: "2025 - 2026",
      description: "Created an AI assistant for emergencies",
    },
    {
      image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
      position: "Winner",
      name: "Daniela Martin",
      session: "2026 - 2027",
      description: "Best speaker at national level",
    },
    {
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
      position: "Finalist",
      name: "Ethan Park",
      session: "2027 - 2028",
      description: "Pitched EdTech startup at bootcamp finale",
    },
    {
      image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39",
      position: "Top 5",
      name: "Fatima Khan",
      session: "2025 - 2026",
      description: "Won top 5 for 'Urban Stillness' photo",
    },
      {
      image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
      position: "1st Place",
      name: "Alice Johnson",
      session: "2024 - 2025",
      description: "Top scorer in national math challenge",
    },
    {
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
      position: "3rd Place",
      name: "Catherine Smith",
      session: "2025 - 2026",
      description: "Created an AI assistant for emergencies",
    },
    {
      image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
      position: "Winner",
      name: "Daniela Martin",
      session: "2026 - 2027",
      description: "Best speaker at national level",
    },
    {
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
      position: "Finalist",
      name: "Ethan Park",
      session: "2027 - 2028",
      description: "Pitched EdTech startup at bootcamp finale",
    },
    {
      image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39",
      position: "Top 5",
      name: "Fatima Khan",
      session: "2025 - 2026",
      description: "Won top 5 for 'Urban Stillness' photo",
    },
  ];

  return (
    <div className="mt-[95px] px-4 py-2 h-[calc(100vh-100px)] overflow-y-auto pr-2 scrollable-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {achievements.map((achievement, index) => (
          <AchievementCard key={index} {...achievement} />
        ))}
      </div>
    </div>
  );
};

export default Page;