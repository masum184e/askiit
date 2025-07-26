import StudentCard, { StudentCardProps } from "@/components/StudentCard";

const Page = () => {
  const students: StudentCardProps[] = [
    {
      studentId: 1,
      batchId: 1,
      name: "Sarah Johnson",
      currentCompany: "Google",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    },
    {
      studentId: 2,
      batchId: 1,
      name: "Michael Chen",
      currentCompany: "Microsoft",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    },
    {
      studentId: 3,
      batchId: 1,
      name: "David Kim",
      currentCompany: "Amazon",
      image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b",
    },
    {
      studentId: 4,
      batchId: 1,
      name: "Lisa Anderson",
      currentCompany: "Apple",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    },
    {
      studentId: 5,
      batchId: 1,
      name: "James Wilson",
      currentCompany: "Netflix",
      image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
    },
    {
      studentId: 6,
      batchId: 1,
      name: "Anna Martinez",
      currentCompany: "Tesla",
      image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
    },
    {
      studentId: 7,
      batchId: 1,
      name: "Sarah Johnson",
      currentCompany: "Google",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    },
    {
      studentId: 8,
      batchId: 1,
      name: "Michael Chen",
      currentCompany: "Microsoft",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    },
    {
      studentId: 9,
      batchId: 1,
      name: "David Kim",
      currentCompany: "Amazon",
      image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b",
    },
    {
      studentId: 10,
      batchId: 1,
      name: "Lisa Anderson",
      currentCompany: "Apple",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    },
    {
      studentId: 11,
      batchId: 1,
      name: "James Wilson",
      currentCompany: "Netflix",
      image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
    },
    {
      studentId: 12,
      batchId: 1,
      name: "Anna Martinez",
      currentCompany: "Tesla",
      image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
    },
  ];
 return (
    <div className="h-[calc(100vh-200px)] overflow-y-auto pr-2 scrollable-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student, index) => (
          <StudentCard key={index} {...student} />
        ))}
      </div>
    </div>
  );
};

export default Page;