import Link from "next/link";
import Logo from "../Logo";

const Navbar = () => {
  return (
    <nav className="bg-white/80 backdrop-blur-md shadow fixed w-full top-0 z-50 animate-fade-in-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Title */}
          <div className="flex items-center space-x-2">
            <Logo />
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8 items-center">
            <a
              href="#features"
              className="text-slate-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:text-blue-600 transition-colors duration-300 font-medium"
            >
              Features
            </a>
            <a
              href="#about"
              className="text-slate-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:text-blue-600 transition-colors duration-300 font-medium"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-slate-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:text-blue-600 transition-colors duration-300 font-medium"
            >
              Contact
            </a>
            {/* Call to Action */}
            <Link
              href="/chat"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;