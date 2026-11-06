import Overview from "@/components/results/Overview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  UserRound,
  GraduationCap,
  BookOpen,
  Trophy,
  ChartNoAxesCombined,
} from "lucide-react";

const sections = [
  {
    value: "overview",
    label: "Overview",
    icon: ChartNoAxesCombined,
  },
  {
    value: "courses",
    label: "Courses",
    icon: BookOpen,
  },
  {
    value: "grades",
    label: "Grades",
    icon: GraduationCap,
  },
];

const page = () => {
  return (
    <div className="mt-[95px] px-4 py-2 h-[calc(100vh-100px)] overflow-y-auto pr-2 scrollable-hidden">
      <Tabs defaultValue="overview" className="w-full">
        {/* Tab Navigation */}
        <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
          <TabsList className="flex h-auto w-full justify-start gap-2 overflow-x-auto bg-transparent p-0 pb-1">
            {sections.map((section) => {
              const Icon = section.icon;

              return (
                <TabsTrigger
                  key={section.value}
                  value={section.value}
                  className="
                      group flex min-w-fit items-center gap-2 rounded-xl
                      border border-transparent px-4 py-3
                      text-sm font-medium text-slate-500
                      transition-all duration-200
                      hover:bg-slate-50 hover:text-blue-700
                      data-[state=active]:border-blue-100
                      data-[state=active]:bg-blue-600
                      data-[state=active]:text-white
                      data-[state=active]:shadow-md
                      data-[state=active]:shadow-blue-600/20
                    "
                >
                  <Icon size={17} />
                  <span>{section.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>

        {/* Tab Contents */}
        {sections.map((section) => (
          <TabsContent
            key={section.value}
            value={section.value}
            className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm outline-none sm:p-6 md:p-8"
          >
            {section.value === "overview" && <Overview />}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default page;
