import { StudentCard } from "@/components/StudentCard";

const Page = ({ params }: { params: { batchId: string } }) => {
  const studentData = [
    {
      id: 1,
      name: "Sarah Johnson",
      currentCompany: "Google",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    },
    {
      id: 2,
      name: "Michael Chen",
      currentCompany: "Microsoft",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    },
    {
      id: 3,
      name: "David Kim",
      currentCompany: "Amazon",
      image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b",
    },
    {
      id: 4,
      name: "Lisa Anderson",
      currentCompany: "Apple",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    },
    {
      id: 5,
      name: "James Wilson",
      currentCompany: "Netflix",
      image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
    },
    {
      id: 6,
      name: "Anna Martinez",
      currentCompany: "Tesla",
      image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
    },
    {
      id: 7,
      name: "Sarah Johnson",
      currentCompany: "Google",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    },
    {
      id: 8,
      name: "Michael Chen",
      currentCompany: "Microsoft",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    },
    {
      id: 9,
      name: "David Kim",
      currentCompany: "Amazon",
      image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b",
    },
    {
      id: 10,
      name: "Lisa Anderson",
      currentCompany: "Apple",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    },
    {
      id: 11,
      name: "James Wilson",
      currentCompany: "Netflix",
      image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
    },
    {
      id: 12,
      name: "Anna Martinez",
      currentCompany: "Tesla",
      image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
    },
  ];
  return (
    <div className="h-[calc(100vh-200px)] overflow-y-auto pr-2 scrollable-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {studentData.map((student) => (
          <div key={student.id} className="relative">
            <StudentCard
              batchId={Number(params.batchId)}
              studentId={student.id}
              name={student.name}
              currentCompany={student.currentCompany}
              image={student.image}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
