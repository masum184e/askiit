import React from "react";
import QuestionDatabase from "./solutions/QuestionDatabase";
import AIAssistant from "./solutions/AIAssistant";
import ProjectShowcase from "./solutions/ProjectShowcase";
import StudentNetwork from "./solutions/StudentNetwork";

const Solutions = () => {
  return (
    <section
      id="features"
      className="pt-28 bg-gradient-to-br from-purple-50 to-pink-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            Explore Our{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Solutions
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Comprehensive features designed to transform how IITians
            collaborate, learn, and grow together.
          </p>
        </div>
        <QuestionDatabase />
        <ProjectShowcase />
        <StudentNetwork />
        <AIAssistant />
      </div>
    </section>
  );
};

export default Solutions;
