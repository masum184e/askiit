import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative overflow-hidden py-20 lg:py-36 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div className="text-center md:text-left animate-fade-in-left">
          <h1 className="text-5xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent block">
              Revolutionizing
            </span>
            <span className="text-ask-iit-primary block">
              Student Collaboration
            </span>
          </h1>
          <p className="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed">
            The ultimate solution for IIT Software Engineering students -
            centralizing question papers, projects, and student connections with
            AI-powered assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center">
            <Link
              href="/chat"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-pulse-slow"
            >
              Explore Platform
            </Link>
            <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full text-lg font-semibold hover:border-ask-iit-primary hover:scale-105 transition-all duration-300">
              Watch Demo
            </button>
          </div>
        </div>

        <div className="relative flex justify-center items-center animate-fade-in-right">
          {/* Image */}
          <Image
            src="https://images.unsplash.com/photo-1608600712992-03e5325d94c8"
            alt="Ask IIT"
            width={600}
            height={400}
            className="rounded-xl shadow-2xl object-cover w-full h-auto max-w-md lg:max-w-full animate-float"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-blue-600/10 rounded-xl"></div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20 animate-float" />
      <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-20 animate-bounce-slow" />
      <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-gradient-to-r from-pink-400 to-red-500 rounded-full opacity-20 animate-pulse-slow" />
    </section>
  );
};

export default Hero;
