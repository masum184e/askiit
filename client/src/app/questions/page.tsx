import { CourseCard } from "@/components/CourseCard";

const Page = () => {
  const courses = [
    // Semester 1
    { code: "SE 1101", name: "Discrete Mathematics" },
    { code: "SE 1103", name: "Computer Fundamentals" },
    { code: "SE 1105", name: "Programming Language I" },
    { code: "SE 1106", name: "Programming Language I Lab" },
    { code: "SE 1108", name: "Computer Fundamentals Lab" },
    {
      code: "MATH 1113",
      name: "Mathematics I (Differential and Integral Calculus)",
    },
    { code: "PHY 1111", name: "Physics" },
    { code: "PHY 1112", name: "Physics Lab" },
    { code: "ENG 1111", name: "Functional English" },

    // Semester 2
    { code: "SE 1201", name: "Structured Programming Language" },
    { code: "SE 1202", name: "Structured Programming Language Lab" },
    { code: "SE 1203", name: "Digital Logic Design" },
    { code: "SE 1204", name: "Digital Logic Design Lab" },
    { code: "SE 1205", name: "Object Oriented Programming" },
    { code: "SE 1206", name: "Object Oriented Programming Lab" },
    {
      code: "MATH 1213",
      name: "Mathematics II (Co-ordinate Geometry and Linear Algebra)",
    },
    { code: "STAT 1213", name: "Statistics" },
    { code: "ENG 1212", name: "English Proficiency and Presentation Skills" },

    // Semester 3
    { code: "SE 2101", name: "Data Structure" },
    { code: "SE 2102", name: "Data Structure Lab" },
    { code: "SE 2103", name: "Database Systems" },
    { code: "SE 2104", name: "Database Systems Lab" },
    { code: "SE 2105", name: "Software Engineering Fundamentals" },
    { code: "SE 2107", name: "Theory of Computation" },
    {
      code: "MATH 2113",
      name: "Mathematics III (Vector Analysis and Fourier Analysis)",
    },
    { code: "SE 2108", name: "Technical Writing and Communication" },

    // Semester 4
    { code: "SE 2201", name: "Operating System" },
    { code: "SE 2202", name: "Operating System Lab" },
    { code: "SE 2203", name: "Software Requirements Engineering" },
    { code: "SE 2205", name: "Computer Networks" },
    { code: "SE 2206", name: "Computer Networks Lab" },
    { code: "SE 2207", name: "Algorithms" },
    { code: "SE 2208", name: "Algorithms Lab" },
    { code: "SE 2209", name: "Software Quality Assurance and Testing" },

    // Semester 5
    { code: "SE 3101", name: "Artificial Intelligence" },
    { code: "SE 3102", name: "Artificial Intelligence Lab" },
    { code: "SE 3103", name: "Human Computer Interaction" },
    { code: "SE 3105", name: "Software Design and Architecture" },
    { code: "SE 3107", name: "Computer Graphics" },
    { code: "SE 3108", name: "Computer Graphics Lab" },
    { code: "SE 3109", name: "Web Engineering" },
    { code: "SE 3110", name: "Web Engineering Lab" },

    // Semester 6
    { code: "SE 3201", name: "Software Project Management" },
    { code: "SE 3203", name: "Distributed Systems" },
    { code: "SE 3205", name: "Mobile Application Development" },
    { code: "SE 3206", name: "Mobile Application Development Lab" },
    { code: "SE 3207", name: "Cyber Security and Forensics" },
    { code: "SE 3209", name: "Cloud Computing" },
    { code: "SE 3210", name: "Cloud Computing Lab" },
    { code: "SE 3212", name: "Project / Thesis - I" },

    // Semester 7
    { code: "SE 4101", name: "Data Mining and Data Warehousing" },
    { code: "SE 4102", name: "Data Mining and Data Warehousing Lab" },
    { code: "SE 4103", name: "Software Metrics and Measurements" },
    { code: "SE 4105", name: "Machine Learning" },
    { code: "SE 4106", name: "Machine Learning Lab" },
    { code: "SE 4110", name: "Project / Thesis - II" },
    { code: "SE XXXX", name: "Departmental Elective I" },
    { code: "SE XXXX", name: "Departmental Elective II" },

    // Semester 8
    { code: "SE 4201", name: "Software Development Process and Models" },
    { code: "SE 4203", name: "Software Evolution and Maintenance" },
    { code: "SE 4210", name: "Project / Thesis - III" },
    { code: "SE XXXX", name: "Departmental Elective III" },
    { code: "SE XXXX", name: "Departmental Elective IV" },
  ];

  return (
    <div className="mt-[95px] px-4 py-2 h-[calc(100vh-100px)] overflow-y-auto pr-2 scrollable-hidden">
      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search competitions..."
          value=""
          className="border border-gray-300 rounded px-3 py-2 w-full max-w-md"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {courses.map((course, index) => (
          <CourseCard key={index} name={course.name} code={course.code} />
        ))}
      </div>
    </div>
  );
};

export default Page;
