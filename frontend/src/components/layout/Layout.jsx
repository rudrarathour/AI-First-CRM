import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import DashboardShell from "./DashboardShell";

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex bg-slate-100 overflow-hidden">

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex flex-col flex-1 overflow-hidden">

        <Header
          setSidebarOpen={setSidebarOpen}
        />

        <DashboardShell />

      </div>

    </div>
  );
}

export default Layout;