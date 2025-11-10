"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

const spls = [
  {
    title: "SPL 1",
    imgLink: "/images/spl-1.png",
    semester: "3rd Semester",
    description:
      "First step into software projects. Learn teamwork, Git, and SDLC basics.",
    next: "/spls/spl1",
  },
  {
    title: "SPL 2",
    imgLink: "/images/spl-2.png",
    semester: "5th Semester",
    description:
      "Intermediate project building with full-stack technologies and real-world apps.",
    next: "/spls/spl2",
  },
  {
    title: "SPL 3",
    imgLink: "/images/spl-3.png",
    semester: "8th Semester",
    description:
      "Capstone project showcasing complete software lifecycle & deployment.",
    next: "/spls/spl3",
  },
];

export default function Page() {
  return (
    <div className="mt-[95px] px-4 py-2 h-[calc(100vh-100px)] overflow-y-auto pr-2 scrollable-hidden">
      <div className="mb-4 relative w-full">
        <input
          type="text"
          placeholder="Search projects..."
          className="border border-gray-300 outline-none focus:border-blue-300 rounded px-10 py-2 w-full"
        />
        <ArrowLeft
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
          size={18}
          onClick={() => history.back()}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {spls.map((spl, index) => (
          <Link key={index} href={spl.next}>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl group hover:shadow-2xl hover:-translate-y-2 hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
              <Image
                src={spl.imgLink}
                alt={spl.title}
                width={1000}
                height={600}
                className="object-cover w-full h-48 border border-gray-300 border-b-0 rounded-t-2xl"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-1 text-slate-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {spl.title}
                </h3>
                <p className="text-sm text-gray-500 mb-2">{spl.semester}</p>
                <p className="text-gray-600 text-sm">{spl.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
