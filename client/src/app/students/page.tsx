import { BatchCard } from "@/components/BatchCard";

const Page = () => {
  const batchData = [
    { batchName: "1", session: "2017 - 2018" },
    { batchName: "2", session: "2018 - 2019" },
    { batchName: "3", session: "2019 - 2020" },
    { batchName: "4", session: "2020 - 2021" },
    { batchName: "5", session: "2021 - 2022" },
    { batchName: "6", session: "2022 - 2023" },
    { batchName: "7", session: "2023 - 2024" },
    { batchName: "8", session: "2024 - 2025" },
    { batchName: "9", session: "2025 - 2026" },
    { batchName: "1", session: "2017 - 2018" },
    { batchName: "2", session: "2018 - 2019" },
    { batchName: "3", session: "2019 - 2020" },
    { batchName: "4", session: "2020 - 2021" },
    { batchName: "5", session: "2021 - 2022" },
    { batchName: "6", session: "2022 - 2023" },
    { batchName: "7", session: "2023 - 2024" },
    { batchName: "8", session: "2024 - 2025" },
    { batchName: "9", session: "2025 - 2026" },
    { batchName: "1", session: "2017 - 2018" },
    { batchName: "2", session: "2018 - 2019" },
    { batchName: "3", session: "2019 - 2020" },
    { batchName: "4", session: "2020 - 2021" },
    { batchName: "5", session: "2021 - 2022" },
    { batchName: "6", session: "2022 - 2023" },
    { batchName: "7", session: "2023 - 2024" },
    { batchName: "8", session: "2024 - 2025" },
    { batchName: "9", session: "2025 - 2026" },
    { batchName: "1", session: "2017 - 2018" },
    { batchName: "2", session: "2018 - 2019" },
    { batchName: "3", session: "2019 - 2020" },
    { batchName: "4", session: "2020 - 2021" },
    { batchName: "5", session: "2021 - 2022" },
    { batchName: "6", session: "2022 - 2023" },
    { batchName: "7", session: "2023 - 2024" },
    { batchName: "8", session: "2024 - 2025" },
    { batchName: "9", session: "2025 - 2026" },
    { batchName: "1", session: "2017 - 2018" },
    { batchName: "2", session: "2018 - 2019" },
    { batchName: "3", session: "2019 - 2020" },
    { batchName: "4", session: "2020 - 2021" },
    { batchName: "5", session: "2021 - 2022" },
    { batchName: "6", session: "2022 - 2023" },
    { batchName: "7", session: "2023 - 2024" },
    { batchName: "8", session: "2024 - 2025" },
    { batchName: "9", session: "2025 - 2026" },
  ];

  return (
    <div className="mt-[95px] px-4 py-2 h-[calc(100vh-100px)] overflow-y-auto pr-2 scrollable-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {batchData.map((batch, index) => (
          <BatchCard
            key={index}
            batchName={batch.batchName}
            session={batch.session}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
