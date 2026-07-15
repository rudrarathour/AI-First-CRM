import {
  CalendarDays,
  Clock3,
  Pill,
  UserRound,
  ChevronRight,
} from "lucide-react";

const activities = [
  {
    doctor: "Dr. Ankit",
    product: "Dolo 650",
    date: "Today",
    time: "10:30 AM",
  },
  {
    doctor: "Dr. Sharma",
    product: "Azithral",
    date: "Yesterday",
    time: "4:15 PM",
  },
];

function RecentActivity() {
  // return (
  //   <div className="w-full rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">

  //     <div className="mb-4 sm:mb-6 flex items-center justify-between gap-2">
  //       <h2 className="text-lg sm:text-xl font-bold text-slate-800">
  //         Recent Interactions
  //       </h2>

  //       <button className="flex items-center gap-1 text-xs sm:text-sm font-medium text-blue-600 transition hover:text-blue-700 hover:underline">
  //         View all
  //         <ChevronRight size={14} />
  //       </button>
  //     </div>

  //     <div className="space-y-2.5 sm:space-y-3">
  //       {activities.map((item, index) => (
  //         <div
  //           key={index}
  //           className="flex flex-col gap-3 rounded-xl sm:rounded-2xl border border-slate-100 p-3.5 sm:p-4 transition hover:border-slate-200 hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
  //         >
  //           {/* Doctor + Product */}
  //           <div className="flex min-w-0 items-center gap-3">
  //             <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
  //               <UserRound size={18} />
  //             </div>

  //             <div className="min-w-0">
  //               <div className="truncate font-semibold text-slate-800 text-sm sm:text-base">
  //                 {item.doctor}
  //               </div>
  //               <div className="mt-0.5 sm:mt-1 flex items-center gap-1.5 text-xs sm:text-sm text-slate-500">
  //                 <Pill size={14} className="shrink-0" />
  //                 <span className="truncate">{item.product}</span>
  //               </div>
  //             </div>
  //           </div>

  //           {/* Date + Time */}
  //           <div className="flex items-center justify-between gap-4 pl-13 sm:pl-0 sm:flex-col sm:items-end sm:justify-center sm:gap-1.5 sm:text-right">
  //             <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-600">
  //               <CalendarDays size={14} />
  //               {item.date}
  //             </div>

  //             <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-500">
  //               <Clock3 size={14} />
  //               {item.time}
  //             </div>
  //           </div>
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // );
}

export default RecentActivity;