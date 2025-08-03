import { FileText, FolderGit2, Users, Bot } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  {
    icon: FileText,
    value: "200+",
    label: "Question Papers",
    gradient: "from-blue-600 to-cyan-600",
  },
  {
    icon: FolderGit2,
    value: "150+",
    label: "Student Projects",
    gradient: "from-purple-600 to-pink-600",
  },
  {
    icon: Users,
    value: "500+",
    label: "Active Users",
    gradient: "from-green-600 to-emerald-600",
  },
  {
    icon: Bot,
    value: "24/7",
    label: "AI Support",
    gradient: "from-orange-600 to-red-600",
  },
];

export default function Stats() {
  return (
    <section
      className="py-20 bg-white dark:bg-zinc-950 animate-fade-in-up"
      id="stats"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Making an{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Impact
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Numbers that showcase our platform{"'"}s success
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="text-center border-0 shadow-none bg-transparent animate-fade-in-up"
            >
              <CardContent className="flex flex-col items-center space-y-2">
                {/* Icon */}
                <stat.icon
                  className="w-10 h-10 text-white p-2 rounded-full bg-gradient-to-r dark:bg-none dark:text-white"
                  style={{
                    backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
                  }}
                />

                {/* Stat Number */}
                <div
                  className={`text-5xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
                >
                  {stat.value}
                </div>

                {/* Label */}
                <div className="text-gray-600 dark:text-gray-300 font-medium">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
