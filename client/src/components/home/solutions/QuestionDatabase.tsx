import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, BarChart, Hash, Database, Globe } from "lucide-react";

const QuestionDatabase = () => {
  const courses = [
    {
      name: "Data Structures",
      session: "2020 - 2021",
      icon: <BarChart className="w-6 h-6" />,
    },
    {
      name: "Algorithms",
      session: "2021 - 2022",
      icon: <Hash className="w-6 h-6" />,
    },
    {
      name: "Database",
      session: "2019-2020",
      icon: <Database className="w-6 h-6" />,
    },
    {
      name: "Web Technology",
      session: "2018 - 2017",
      icon: <Globe className="w-6 h-6" />,
    },
  ];
  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
      <div className="animate-fade-in-left">
        <Card className="p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-200">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6">
            <BookOpen className="text-white w-10 h-10" />
          </div>
          <CardContent className="p-0">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Question Paper Database
            </h3>
            <p className="text-gray-600 mb-6 text-lg">
              Centralized repository of previous year question papers, organized
              by semester, subject, and year. Easy search and filter options for
              quick access.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-600">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Semester-wise organization
              </li>
              <li className="flex items-center text-gray-600">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Advanced search filters
              </li>
              <li className="flex items-center text-gray-600">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Download and share options
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="animate-fade-in-right">
        <div className="bg-gradient-to-br from-blue-100 to-cyan-100 p-8 rounded-3xl">
          <div className="grid grid-cols-2 gap-4">
            {courses.map(({ name, session, icon }, idx) => (
              <div className="bg-white p-4 rounded-xl shadow-md" key={idx}>
                <div className="text-2xl mb-2 text-blue-600">{icon}</div>
                <div className="text-sm font-semibold text-gray-700">
                  {name}
                </div>
                <div className="text-xs text-gray-500">{session}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionDatabase;