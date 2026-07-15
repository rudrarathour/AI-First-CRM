import { Bell, Search, Menu, Sun } from "lucide-react";

function Header({ setSidebarOpen }) {
  return (
    <header className="h-16 sm:h-20 bg-white border-b border-slate-200 flex items-center justify-between gap-2 px-3 sm:px-4 lg:px-8">

      {/* Left */}
      <div className="flex min-w-0 items-center gap-2 sm:gap-4">

        {/* Mobile Menu */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden shrink-0 p-1.5 sm:p-2 rounded-xl hover:bg-slate-100 transition"
        >
          <Menu size={20} className="sm:hidden" />
          <Menu size={22} className="hidden sm:block" />
        </button>

        <div className="min-w-0">
          <h1 className="truncate text-base sm:text-xl lg:text-2xl font-bold text-slate-800">
            Dashboard
          </h1>

          <p className="hidden sm:block truncate text-sm text-slate-500">
            Welcome back, Ramrudra 👋
          </p>
        </div>

      </div>

      {/* Right */}
      <div className="flex shrink-0 items-center gap-1.5 sm:gap-2 lg:gap-4">

        {/* Search - desktop */}
        <div className="hidden md:flex items-center gap-2 bg-slate-100 rounded-xl px-4 py-2 w-56 lg:w-72">
          <Search size={18} className="shrink-0 text-slate-500" />
          <input
            type="text"
            placeholder="Search doctors..."
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>

        {/* Search - mobile icon only */}
        <button className="md:hidden flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 transition hover:bg-slate-200">
          <Search size={17} />
        </button>

        {/* Theme */}
        <button className="hidden xs:flex h-9 w-9 sm:h-10 sm:w-10 lg:h-11 lg:w-11 items-center justify-center rounded-xl bg-slate-100 transition hover:bg-slate-200">
          <Sun size={17} className="sm:hidden" />
          <Sun size={18} className="hidden sm:block" />
        </button>

        {/* Notification */}
        <button className="relative flex h-9 w-9 sm:h-10 sm:w-10 lg:h-11 lg:w-11 items-center justify-center rounded-xl bg-slate-100 transition hover:bg-slate-200">
          <Bell size={17} className="sm:hidden" />
          <Bell size={18} className="hidden sm:block" />
          <span className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        {/* User */}
        <div className="flex items-center gap-2 sm:gap-3 rounded-xl bg-slate-100 px-1.5 sm:px-3 py-1.5 sm:py-2">
          <div className="flex h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 font-bold text-white text-sm">
            R
          </div>

          <div className="hidden md:block">
            <p className="text-sm font-semibold">Ramrudra</p>
            <p className="text-xs text-slate-400">Medical rep</p>
          </div>
        </div>

      </div>

    </header>
  );
}

export default Header;