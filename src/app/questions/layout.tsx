import { Sidebar } from '@/components/Sidebar';
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const getHeaderInfo = (activeView: string) => {
    switch (activeView) {
      case 'students':
        return {
          title: 'Students',
          description: 'View all students and their current companies',
        };
      case 'chat':
        return {
          title: 'Chat',
          description: 'Communication center for all conversations',
        };
      case 'spl':
        return {
          title: 'SPL',
          description: 'Special Programming Language resources',
        };
      case 'question':
        return {
          title: 'Questions',
          description: 'Frequently asked questions and help',
        };
      case 'achievement':
        return {
          title: 'Achievements',
          description: 'Track progress and accomplishments',
        };
      default:
        return {
          title: 'Learning Batches',
          description: 'Manage and view all your learning sessions',
        };
    }
  };

  const activeView = 'question';
  const headerInfo = getHeaderInfo(activeView);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="flex">
        <Sidebar />

        {/* Main content area */}
        <main className="flex-1">
          {/* Header */}
          <header className="bg-white border-b border-slate-200 p-6">
            <h1 className="text-3xl font-bold text-slate-900">{headerInfo.title}</h1>
            <p className="text-slate-600 mt-2">{headerInfo.description}</p>
          </header>

          {/* Page Content */}
          <div className="p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
