import Achievements from "@/components/forms/Achievements";
import PersonalInformation from "@/components/forms/PersonalInformation";
import Publications from "@/components/forms/Publications";
import SPL1Form from "@/components/forms/SPL1";
import SPL2Form from "@/components/forms/SPL2";
import SPL3Form from "@/components/forms/SPL3";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  UserRound,
  GraduationCap,
  BookOpen,
  FileText,
  Trophy,
  Sparkles,
} from "lucide-react";

const sections = [
  {
    value: "personal-information",
    label: "Personal Info",
    icon: UserRound,
    description: "Manage your personal details and profile information.",
  },
  {
    value: "spl-1",
    label: "SPL 1",
    icon: GraduationCap,
    description: "Complete your SPL 1 academic information.",
  },
  {
    value: "spl-2",
    label: "SPL 2",
    icon: GraduationCap,
    description: "Manage your SPL 2 academic information.",
  },
  {
    value: "spl-3",
    label: "SPL 3",
    icon: GraduationCap,
    description: "Manage your SPL 3 academic information.",
  },
  {
    value: "publications",
    label: "Publications",
    icon: BookOpen,
    description: "Showcase your research and publications.",
  },
  {
    value: "achievements",
    label: "Achievements",
    icon: Trophy,
    description: "Highlight your awards and accomplishments.",
  },
];

const page = () => {
  return (
    <div className="mt-[95px] px-4 py-2 h-[calc(100vh-100px)] overflow-y-auto pr-2 scrollable-hidden">
      <Tabs defaultValue="personal-information" className="w-full">
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
            {section.value === "personal-information" && (
              <PersonalInformation />
            )}

            {section.value === "spl-1" && <SPL1Form />}

            {section.value === "spl-2" && <SPL2Form />}

            {section.value === "spl-3" && <SPL3Form />}

            {section.value === "publications" && <Publications />}

            {section.value === "achievements" && <Achievements />}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default page;
