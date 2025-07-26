import SplCard from "@/components/SPLCard";

const Page = () => {
  const splTitles = [
    {
      title: "SPL 1",
      link: "spl-1",
    },
    {
      title: "SPL 2",
      link: "spl-2",
    },
    {
      title: "SPL 3",
      link: "spl-3",
    },
  ];

  return (
    <section className="min-h-screen bg-gray-50 py-20 px-6 lg:px-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {splTitles.map(({ title, link }, index) => (
          <SplCard key={index} title={title} link={link} />
        ))}
      </div>
    </section>
  );
};

export default Page;
