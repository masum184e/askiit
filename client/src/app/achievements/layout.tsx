import { Sidebar } from "@/components/Sidebar";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="flex">
        <Sidebar />

        {/* Main content area */}
        <main className="flex-1">
          {/* Header */}
          <header className="bg-white border-b border-slate-200 p-3 fixed top-0 left-64 right-0">
            <h1 className="text-2xl font-bold font-sans text-slate-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Achievements</h1>
            <p className="text-sm text-slate-600 mt-2">Track progress and accomplishments</p>
          </header>
          {/* Page Content */}
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
