"use client";
import { CourseCard } from "@/components/CourseCard";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";

const Page = () => {
  const [term, setTerm] = useState("1");
  const [search, setSearch] = useState("");
  const courses = [
    // Semester 1
    { semester: 1, code: "CSE 1101", name: "Structured Programming" },
    { semester: 1, code: "CSE 1102", name: "Structured Programming Lab" },
    { semester: 1, code: "CSE 1103", name: "Discrete Mathematics" },
    {
      semester: 1,
      code: "STAT 1105",
      name: "Probability and Statistics for Engineers-I",
    },
    {
      semester: 1,
      code: "MATH 1107",
      name: "Calculus and Analytical Geometry",
    },
    { semester: 1, code: "GE 1109", name: "Soft Skill Communication" },
    { semester: 1, code: "GE 1111", name: "Technology and Society" },
    { semester: 1, code: "GE 1112", name: "Technology and Society Lab" },
    {
      semester: 1,
      code: "SE 1113",
      name: "Introduction to Software Engineering",
    },

    // Semester 2
    { semester: 2, code: "CSE 1201", name: "Data Structure" },
    { semester: 2, code: "CSE 1202", name: "Data Structure Lab" },
    { semester: 2, code: "CSE 1203", name: "Computer Organization" },
    { semester: 2, code: "CSE 1204", name: "Computer Organization Lab" },
    {
      semester: 2,
      code: "STAT 1205",
      name: "Probability and Statistics for Engineers-II",
    },
    { semester: 2, code: "MATH 1207", name: "Ordinary Differential Equations" },
    {
      semester: 2,
      code: "GE 1209",
      name: "History of Emergence of Bangladesh",
    },
    { semester: 2, code: "GE 1211", name: "Bengali Literature" },
    { semester: 2, code: "SE 1213", name: "Object Oriented Concepts I" },
    { semester: 2, code: "SE 1214", name: "Object Oriented Concepts I Lab" },

    // Semester 3
    { semester: 3, code: "CSE 2101", name: "Algorithm Analysis" },
    { semester: 3, code: "CSE 2102", name: "Algorithm Analysis Lab" },
    { semester: 3, code: "SE 2103", name: "Theory of Computation" },
    { semester: 3, code: "SE 2104", name: "Theory of Computation Lab" },
    { semester: 3, code: "CSE 2105", name: "Computer Networks" },
    { semester: 3, code: "CSE 2106", name: "Computer Networks Lab" },
    {
      semester: 3,
      code: "MATH 2107",
      name: "Numerical Analysis for Engineers",
    },
    {
      semester: 3,
      code: "MATH 2108",
      name: "Numerical Analysis for Engineers Lab",
    },
    { semester: 3, code: "SE 2109", name: "Object Oriented Concepts II" },
    { semester: 3, code: "SE 2110", name: "Object Oriented Concepts II Lab" },
    { semester: 3, code: "SE 2112", name: "Software Project Lab I" },

    // Semester 4
    {
      semester: 4,
      code: "CSE 2201",
      name: "Operating Systems and System Programming",
    },
    {
      semester: 4,
      code: "CSE 2202",
      name: "Operating Systems and System Programming Lab",
    },
    { semester: 4, code: "GE 2203", name: "Business Psychology" },
    { semester: 4, code: "CSE 2205", name: "Information Security" },
    { semester: 4, code: "CSE 2206", name: "Information Security Lab" },
    { semester: 4, code: "CSE 2207", name: "Database Management System-I" },
    { semester: 4, code: "CSE 2208", name: "Database Management System-I Lab" },
    {
      semester: 4,
      code: "SE 2209",
      name: "Software Requirements Specification and Analysis",
    },
    {
      semester: 4,
      code: "SE 2210",
      name: "Software Requirements Specification and Analysis Lab",
    },
    { semester: 4, code: "BUS 2211", name: "Business Studies for Engineers" },

    // Semester 5
    {
      semester: 5,
      code: "SE 3101",
      name: "Professional Ethics for Information Systems",
    },
    { semester: 5, code: "CSE 3103", name: "Web Technology" },
    { semester: 5, code: "CSE 3104", name: "Web Technology Lab" },
    {
      semester: 5,
      code: "CSE 3105",
      name: "Data Science and Analytics – DBMS II",
    },
    {
      semester: 5,
      code: "CSE 3106",
      name: "Data Science and Analytics – DBMS II Lab",
    },
    { semester: 5, code: "BUS 3107", name: "Business Communications" },
    { semester: 5, code: "BUS 3108", name: "Business Communications Lab" },
    { semester: 5, code: "SE 3109", name: "Design Pattern" },
    { semester: 5, code: "SE 3110", name: "Design Pattern Lab" },
    { semester: 5, code: "SE 3112", name: "Software Project Lab II" },

    // Semester 6
    { semester: 6, code: "CSE 3201", name: "Distributed Systems" },
    { semester: 6, code: "CSE 3202", name: "Distributed Systems Lab" },
    { semester: 6, code: "SE 3203", name: "Software Metrics" },
    { semester: 6, code: "SE 3204", name: "Software Metrics Lab" },
    { semester: 6, code: "SE 3205", name: "Software Security" },
    { semester: 6, code: "SE 3206", name: "Software Security Lab" },
    { semester: 6, code: "CSE 3207", name: "Artificial Intelligence" },
    { semester: 6, code: "CSE 3208", name: "Artificial Intelligence Lab" },
    {
      semester: 6,
      code: "SE 3209",
      name: "Software Testing and Quality Assurance",
    },
    {
      semester: 6,
      code: "SE 3210",
      name: "Software Testing and Quality Assurance Lab",
    },
    { semester: 6, code: "SE 3211", name: "Software Design and Architecture" },
    {
      semester: 6,
      code: "SE 3212",
      name: "Software Design and Architecture Lab",
    },

    // Semester 7
    { semester: 7, code: "SE 4100", name: "Internship" },

    // Semester 8
    { semester: 8, code: "SE 4202", name: "Project" },
    { semester: 8, code: "SE 4203", name: "Software Maintenance" },
    { semester: 8, code: "SE 4204", name: "Software Maintenance Lab" },
    { semester: 8, code: "SE 4205", name: "Software Project Management" },
    { semester: 8, code: "SE 4206", name: "Software Project Management Lab" },
    { semester: 8, code: "SE/CSE 42XX", name: "Elective 1" },
    { semester: 8, code: "SE/CSE 42XX", name: "Elective 2" },
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesTerm = term === "0" || course.semester === Number(term);
    const matchesSearch =
      course.name.toLowerCase().includes(search.toLowerCase()) ||
      course.code.toLowerCase().includes(search.toLowerCase());
    return matchesTerm && matchesSearch;
  });

  return (
    <div className="mt-[95px] px-4 py-2 h-[calc(100vh-100px)] overflow-y-auto pr-2 scrollable-hidden">
      <div className="mb-4 flex items-center gap-3">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 outline-none rounded px-3 py-2 w-full"
        />

        {/* Term Selector */}
        <Select value={term} onValueChange={setTerm}>
          <SelectTrigger className="w-[150px] bg-white border border-gray-300 outline-none">
            <SelectValue placeholder="Select term" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-300">
            <SelectItem value="0">All Terms</SelectItem>
            {Array.from({ length: 8 }, (_, i) => (
              <SelectItem key={i + 1} value={(i + 1).toString()}>
                Term {i + 1}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCourses.map((course, index) => (
          <CourseCard key={index} name={course.name} code={course.code} />
        ))}
      </div>
    </div>
  );
};

export default Page;
