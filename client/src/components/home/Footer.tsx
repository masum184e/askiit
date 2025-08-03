import { Github, Mail } from "lucide-react";
import Logo from "../Logo";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Branding */}
          <div>
            <div className="flex items-center space-x-2 mb-4 ">
              <Logo color="text-white" />
            </div>
            <p className="text-gray-400 text-justify">
              Connecting NSTU Software Engineering students through innovative
              technology and collaborative learning.
            </p>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Features</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/questions">Question Papers</Link>
              </li>
              <li>
                <Link href="/spls">Project Showcase</Link>
              </li>
              <li>
                <Link href="/students">Student Network</Link>
              </li>
              <li>
                <Link href="/chat">AI Assistant</Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/contact">Contact Us</Link>
              </li>
              <li>
                <Link href="/complaints">Complaints</Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  href="https://github.com/masum184e/askiit"
                  className="flex items-center gap-2"
                >
                  <Github size={16} /> GitHub
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:masum1834e@gmail.com"
                  className="flex items-center gap-2"
                >
                  <Mail size={16} /> Email
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}