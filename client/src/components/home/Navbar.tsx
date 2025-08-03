"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "../Logo";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-colors duration-300 backdrop-blur-md shadow ${
        scrolled ? "bg-white/80" : "bg-transparent"
      } animate-fade-in-up`}
    >
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
              className="relative text-slate-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-semibold
             after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-blue-600
             after:transition-all after:duration-300 hover:after:w-full"
            >
              Features
            </a>
            <a
              href="/about"
              className="relative text-slate-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-semibold
             after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-blue-600
             after:transition-all after:duration-300 hover:after:w-full"
            >
              About
            </a>
            <a
              href="/contact"
              className="relative text-slate-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-semibold
             after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-blue-600
             after:transition-all after:duration-300 hover:after:w-full"
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
