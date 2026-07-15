import { useState, useEffect } from "react";
import {
  CalendarDays,
  Clock3,
  Save,
  Building2,
  UserRound,
  Pill,
  ClipboardList,
} from "lucide-react";

function InteractionForm({ interactionData }) {
  const [formData, setFormData] = useState({
    doctorName: "",
    hospital: "",
    product: "",
    date: "",
    time: "",
    interactionType: "Meeting",
    notes: "",
  });

 useEffect(() => {
  console.log("INTERACTION DATA =>", interactionData);

  setFormData((prev) => ({
    ...prev,
    doctorName: interactionData?.doctorName || "",
    hospital: interactionData?.hospital || "",
    product: interactionData?.product || "",
    date: interactionData?.date || "",
    time: interactionData?.time || "",
    notes: interactionData?.notes || "",
  }));
}, [interactionData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  const inputClass =
    "w-full rounded-xl sm:rounded-2xl border border-slate-300 px-3.5 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base transition focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100";

  const labelClass =
    "mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-slate-700";

  return (
    <div className="w-full rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 lg:p-8 shadow-sm">

      {/* Header */}
      <div className="mb-6 sm:mb-8 flex items-start gap-3 sm:gap-4">
        <div className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md">
          <ClipboardList size={22} />
        </div>
        <div className="min-w-0">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800">
            Log HCP Interaction
          </h2>
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm lg:text-base text-slate-500">
            Record and manage your healthcare professional interactions.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">

        {/* Doctor + Product */}
        <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2">
          <div>
            <label className={labelClass}>
              <UserRound size={15} className="text-blue-600" />
              Doctor Name
            </label>
            <input
              type="text"
              name="doctorName"
              value={formData.doctorName}
              onChange={handleChange}
              placeholder="Enter doctor name"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              <Pill size={15} className="text-blue-600" />
              Product
            </label>
            <input
              type="text"
              name="product"
              value={formData.product}
              onChange={handleChange}
              placeholder="Product discussed"
              className={inputClass}
            />
          </div>
        </div>

        {/* Hospital */}
        <div>
          <label className={labelClass}>
            <Building2 size={15} className="text-blue-600" />
            Hospital / Clinic
          </label>
          <input
            type="text"
            name="hospital"
            value={formData.hospital}
            onChange={handleChange}
            placeholder="Hospital or clinic name"
            className={inputClass}
          />
        </div>

        {/* Date Time */}
        <div className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass}>
              <CalendarDays size={15} className="text-blue-600" />
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              <Clock3 size={15} className="text-blue-600" />
              Time
            </label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>

        {/* Interaction Type */}
        <div>
          <label className={labelClass}>Interaction Type</label>
          <select
            name="interactionType"
            value={formData.interactionType}
            onChange={handleChange}
            className={`${inputClass} bg-white`}
          >
            <option>Meeting</option>
            <option>Call</option>
            <option>Email</option>
            <option>Conference</option>
          </select>
        </div>

        {/* Notes */}
        <div>
          <label className={labelClass}>Discussion Notes</label>
          <textarea
            rows="5"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Write discussion summary..."
            className={`${inputClass} resize-none sm:rows-7`}
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3.5 sm:py-4 text-sm sm:text-base font-semibold text-white shadow-lg transition hover:scale-[1.01] hover:shadow-xl active:scale-[0.99]"
        >
          <Save size={18} className="sm:hidden" />
          <Save size={20} className="hidden sm:block" />
          Save Interaction
        </button>

      </form>
    </div>
  );
}

export default InteractionForm;