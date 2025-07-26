import Link from "next/link";

const Page = ({ params }: { params: { code: string } }) => {
  const session = [
    "2017 - 2018",
    "2018 - 2019",
    "2019 - 2020",
    "2020 - 2021",
    "2021 - 2022",
    "2022 - 2023",
    "2023 - 2024",
    "2024 - 2025",
    "2025 - 2026",
  ];
  return (
    <div className="h-[calc(100vh-200px)] overflow-y-auto pr-2 scrollable-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {session.map((item, index) => (
          <Link href={`/questions/${params.code}/${item}`} key={index}>
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 group hover:-translate-y-1 relative overflow-hidden text-center">
              {item}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
