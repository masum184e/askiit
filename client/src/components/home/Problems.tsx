import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Laptop2, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const Problems = () => {
  const problems = [
    {
      icon: <BookOpen className="text-white w-8 h-8" />,
      color: "from-red-500 to-orange-500",
      bg: "from-red-50 to-orange-50",
      title: "Question Papers Scattered",
      description:
        "No centralized system for accessing previous year question papers, making exam preparation difficult and inefficient.",
      animation: "animate-fade-in-left",
    },
    {
      icon: <Laptop2 className="text-white w-8 h-8" />,
      color: "from-blue-500 to-purple-500",
      bg: "from-blue-50 to-purple-50",
      title: "Projects Isolated",
      description:
        "Student projects from each semester remained isolated, preventing knowledge sharing and collaborative learning.",
      animation: "animate-fade-in-up",
    },
    {
      icon: <Users className="text-white w-8 h-8" />,
      color: "from-green-500 to-teal-500",
      bg: "from-green-50 to-teal-50",
      title: "Disconnected Network",
      description:
        "No unified platform to connect current students with alumni and access their valuable experiences and guidance.",
      animation: "animate-fade-in-right",
    },
  ];
  return (
    <section className="pt-28 bg-white/50 backdrop-blur-sm" id="problems">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            The{" "}
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Problems
            </span>{" "}
            We Solved
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            These critical issues were hampering student collaboration and
            knowledge sharing.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map(
            ({ icon, color, bg, title, description, animation }, i) => (
              <Card
                key={i}
                className={cn(
                  `border border-gray-200 bg-gradient-to-br ${bg} p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl group`,
                  animation
                )}
              >
                <div
                  className={cn(
                    `w-16 h-16 bg-gradient-to-r ${color} rounded-full flex items-center justify-center mb-6 mx-auto transition-all duration-300 group-hover:scale-110`
                  )}
                >
                  {icon}
                </div>
                <CardContent className="p-0">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                    {title}
                  </h3>
                  <p className="text-gray-600 text-center">{description}</p>
                </CardContent>
              </Card>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default Problems;
