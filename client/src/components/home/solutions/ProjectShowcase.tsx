import { Card, CardContent } from "@/components/ui/card";
import { Rocket, Gamepad2, ShoppingCart, Smartphone } from "lucide-react";
import React from "react";

const showcaseProjects = [
  {
    icon: <Gamepad2 className="text-white w-5 h-5" />,
    title: "Snake Game - Java",
    batch: "Batch 2023",
    stars: 45,
    bg: "from-blue-500 to-purple-500",
  },
  {
    icon: <ShoppingCart className="text-white w-5 h-5" />,
    title: "E-commerce Site - Next.js",
    batch: "Batch 2022",
    stars: 67,
    bg: "from-green-500 to-teal-500",
  },
  {
    icon: <Smartphone className="text-white w-5 h-5" />,
    title: "Mobile App - Android",
    batch: "Batch 2021",
    stars: 89,
    bg: "from-orange-500 to-red-500",
  },
];

export default function ProjectShowcase() {
  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
      <div className="lg:order-2 animate-fade-in-right">
        <Card className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
            <Rocket className="text-white w-10 h-10" />
          </div>
          <CardContent className="p-0">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Project Showcase</h3>
            <p className="text-gray-600 mb-6 text-lg">
              Discover and share amazing projects created by students across different semesters. Learn from others{"\'"} work and showcase your own achievements.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-600">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                Project galleries by batch
              </li>
              <li className="flex items-center text-gray-600">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                Source code sharing
              </li>
              <li className="flex items-center text-gray-600">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                Collaboration opportunities
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="lg:order-1 animate-fade-in-left">
        <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-8 rounded-3xl">
          <div className="space-y-4">
            {showcaseProjects.map(({ icon, title, batch, stars, bg }, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-xl shadow-md flex items-center space-x-4"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${bg} rounded-lg flex items-center justify-center`}>
                  {icon}
                </div>
                <div>
                  <div className="font-semibold text-gray-800">{title}</div>
                  <div className="text-sm text-gray-500">By {batch} • {stars} ⭐</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}