import { useState } from "react";

import InteractionForm from "../components/dashboard/InteractionForm";
import AIAssistant from "../components/dashboard/AIAssistant";
import RecentActivity from "../components/dashboard/RecentActivity";

function Home() {
  const [interactionData, setInteractionData] = useState({
  doctorName: "",
  hospital: "",
  product: "",
  date: "",
  time: "",
  notes: "",
});

  return (
    <div className="space-y-20">

      {/* Page Header */}
      
      {/* Main Dashboard */}
      <div className="grid gap-6 xl:grid-cols-12 items-start">

        {/* Interaction Form */}
        <div className="xl:col-span-8">
          <InteractionForm
            interactionData={interactionData}
            setInteractionData={setInteractionData}
          />
        </div>

        {/* AI Assistant */}
        <div className="xl:col-span-4">
          <AIAssistant
  interactionData={interactionData}
  setInteractionData={setInteractionData}
/>
        </div>

      </div>

      {/* Recent Activity */}
      <RecentActivity />

    </div>
  );
}

export default Home;