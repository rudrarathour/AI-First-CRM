import {
  LayoutDashboard,
  Users,
  MessageSquareText,
  Bot,
  BarChart3,
  Settings,
  X,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "HCP",
    icon: Users,
  },
  {
    title: "Interactions",
    icon: MessageSquareText,
  },
  {
    title: "AI Assistant",
    icon: Bot,
  },
  {
    title: "Analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    icon: Settings,
  },
];

function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}) {
  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed lg:static
          z-50
          top-0 left-0
          h-screen
          w-72
          bg-slate-950
          text-white
          border-r border-slate-800
          transform transition-transform duration-300

          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          lg:translate-x-0
          lg:flex
          flex-col
        `}
      >
        {/* Logo */}
        <div className="h-20 flex items-center px-8 border-b border-slate-800 justify-between">

          <div className="flex items-center">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-xl font-bold">
              AI
            </div>

            <div className="ml-4">
              <h1 className="text-xl font-bold">
                AI First CRM
              </h1>

              <p className="text-xs text-slate-400">
                Medical Representative
              </p>
            </div>
          </div>

          {/* Mobile Close */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-5 py-8">

          <p className="text-xs uppercase tracking-widest text-slate-500 mb-4">
            Navigation
          </p>

          <div className="space-y-2">

            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.title}
                  className="group flex items-center gap-4 w-full rounded-2xl px-4 py-3 text-slate-300 hover:bg-blue-600 hover:text-white transition-all duration-300"
                >
                  <Icon size={20} />

                  <span className="font-medium">
                    {item.title}
                  </span>
                </button>
              );
            })}

          </div>

        </nav>

        {/* Footer */}
        <div className="border-t border-slate-800 p-6">

          <div className="rounded-2xl bg-slate-900 p-4">

            <p className="text-sm font-semibold">
              AI CRM v1.0
            </p>

            <p className="text-xs text-slate-400 mt-1">
              Powered by FastAPI + LangGraph
            </p>

          </div>

        </div>

      </aside>
    </>
  );
}

export default Sidebar;