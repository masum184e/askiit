"use client";

import {
  MessageCircle,
  Code,
  Users,
  HelpCircle,
  Trophy,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const navigationItems = [
  { icon: MessageCircle, label: "Chat", view: "/chat" },
  { icon: Code, label: "SPL", view: "/spls" },
  { icon: Users, label: "Students", view: "/batches" },
  { icon: HelpCircle, label: "Question", view: "/questions" },
  { icon: Trophy, label: "Achievement", view: "/achievements" },
];

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-card rounded-lg shadow-card"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-sidebar border-r border-sidebar-border z-40 
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 lg:static lg:h-screen
        `}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold text-slate-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            AskIIT
          </h1>
        </div>

        <nav className="px-4 space-y-2">
          {navigationItems.map((item) => {
            const isActive = pathname.startsWith(item.view);
            return (
              <button
                key={item.label}
                onClick={() => {
                  router.push(item.view);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition-all duration-200 group ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
              >
                <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
};
