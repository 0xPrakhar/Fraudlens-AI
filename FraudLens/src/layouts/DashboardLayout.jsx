import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-slate-50 dark:bg-slate-950 overflow-x-hidden overflow-y-hidden text-slate-900 dark:text-slate-100 transition-colors duration-300">
      
      {/* Top Navbar */}
      <Navbar toggleSidebar={toggleSidebar} />

      {/* Main Container */}
      <div className="flex flex-1 w-full overflow-hidden relative">
        
        {/* 🛠️ FIXED: Jab open ho toh w-64, jab band ho toh w-20 (Icon only view) */}
        <div className={`shrink-0 transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-20"}`}>
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 h-full overflow-y-auto overflow-x-hidden bg-slate-50/50 dark:bg-slate-900/50 scroll-smooth">
          <div className="w-full max-w-7xl mx-auto p-4 md:p-6 min-h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}