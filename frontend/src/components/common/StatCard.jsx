import { ArrowUpRight } from "lucide-react";

function StatCard({ title, value, icon: Icon, iconBg, change }) {
  return (
    <div className="group w-full rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-xs sm:text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className="mt-2 sm:mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800">
            {value}
          </h2>
        </div>

        <div
          className={`flex h-11 w-11 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl ${iconBg}`}
        >
          <Icon className="text-white" size={20} />
        </div>
      </div>

      <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-1 sm:gap-2 text-xs sm:text-sm text-emerald-600">
        <ArrowUpRight size={14} className="sm:hidden" />
        <ArrowUpRight size={16} className="hidden sm:block" />

        <span>{change}</span>

        <span className="text-slate-400">this month</span>
      </div>
    </div>
  );
}

export default StatCard;