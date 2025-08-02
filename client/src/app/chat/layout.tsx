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
          {/* Page Content */}
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
