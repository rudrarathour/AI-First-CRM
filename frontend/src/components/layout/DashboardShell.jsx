import { Outlet } from "react-router-dom";

function DashboardShell() {
  return (
    <main className="flex-1 overflow-auto bg-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <Outlet />
      </div>
    </main>
  );
}

export default DashboardShell;