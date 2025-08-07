import Achievements from "@/components/forms/Achievements";
import PersonalInformation from "@/components/forms/PersonalInformation";
import Publications from "@/components/forms/Publications";
import SPL1Form from "@/components/forms/SPL1";
import SPL2Form from "@/components/forms/SPL2";
import SPL3Form from "@/components/forms/SPL3";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const page = () => {
  return (
    <div className="mt-[95px] px-4 py-2 h-[calc(100vh-100px)] overflow-y-auto pr-2 scrollable-hidden">
      <Tabs defaultValue="personal-information">
        <TabsList className="border-b-2 border-gray-200 bg-gray-50 p-2 space-x-2">
          <TabsTrigger
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            value="personal-information"
          >
            Perfonal Information
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            value="spl-1"
          >
            SPL 1
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            value="spl-2"
          >
            SPL 2
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            value="spl-3"
          >
            SPL 3
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            value="publications"
          >
            Publications
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            value="achievements"
          >
            Achievements
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="personal-information"
          className="border-t border-gray-300 mt-2 pt-2"
        >
          <PersonalInformation />
        </TabsContent>
        <TabsContent
          value="spl-1"
          className="border-t border-gray-300 mt-2 pt-2"
        >
          <SPL1Form />
        </TabsContent>
        <TabsContent
          value="spl-2"
          className="border-t border-gray-300 mt-2 pt-2"
        >
          <SPL2Form />
        </TabsContent>
        <TabsContent
          value="spl-3"
          className="border-t border-gray-300 mt-2 pt-2"
        >
          <SPL3Form />
        </TabsContent>
        <TabsContent
          value="publications"
          className="border-t border-gray-300 mt-2 pt-2"
        >
          <Publications />
        </TabsContent>
        <TabsContent
          value="achievements"
          className="border-t border-gray-300 mt-2 pt-2"
        >
          <Achievements />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
