import ChangePassword from "@/components/forms/ChangePassword";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const page = () => {
  return (
    <div className="mt-[95px] px-4 py-2 h-[calc(100vh-100px)] overflow-y-auto pr-2 scrollable-hidden">
      <Tabs defaultValue="password">
        <TabsList className="border-b-2 border-gray-200 bg-gray-50 p-2 space-x-2">
          <TabsTrigger
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            value="password"
          >
            Chagne Password
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="password"
          className="border-t border-gray-300 mt-2 pt-2"
        >
          <ChangePassword />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
