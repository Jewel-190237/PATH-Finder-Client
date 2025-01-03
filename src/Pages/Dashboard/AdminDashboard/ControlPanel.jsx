import React, { useState } from "react";
import CEO from "./CEO";
import Marketing from "./Marketing";
import MarketingExecutive from "./MarketingExecutive";
import SkillStrategist from "./SkillStrategist";
import SkillSpecialist from "./SkillSpecialist";
import DevAdvisor from "./DevAdvisor";
import SalesDirector from "./SalesDirector";
import VirtualAssistant from "./VirtualAssistant";

const tabs = [
  { path: "ceo", label: "CEO" },
  { path: "marketing", label: "Head of Marketing" },
  { path: "executive", label: "Marketing Executive" },
  { path: "skillStrategist", label: "Skill Strategist" },
  { path: "skillSpecialist", label: "Skill Specialist" },
  { path: "devAdvisor", label: "Dev Advisor" },
  { path: "salesDirector", label: "Sales Director" },
  { path: "virtualAssistant", label: "Virtual Assistant" },
];

const ControlPanel = () => {
  const [activeTab, setActiveTab] = useState("ceo"); // Default to CEO

  const renderComponent = () => {
    switch (activeTab) {
      case "ceo":
        return <CEO />;
      case "marketing":
        return <Marketing />;
      case "executive":
        return <MarketingExecutive />;
      case "skillStrategist":
        return <SkillStrategist />;
      case "skillSpecialist":
        return <SkillSpecialist />;
      case "devAdvisor":
        return <DevAdvisor />;
      case "salesDirector":
        return <SalesDirector />;
      case "virtualAssistant":
        return <VirtualAssistant />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-8 items-center justify-center gap-4 p-5 md:p-10 lg:p-12 xl:p-14 text-white">
        {tabs.map(({ path, label }) => (
          <button
            key={path}
            className={` py-2 text-sm font-semibold rounded-md transition-colors ${
              activeTab === path
                ? "bg-red-700/30 text-white border"
                : "bg-red-400 text-white hover:bg-red-600/50 hover:text-white"
            }`}
            onClick={() => setActiveTab(path)}
          >
            <p className="description whitespace-pre">{label}</p>
          </button>
        ))}
      </div>

      <div className="p-5 md:p-10 lg:p-12 xl:p-14 text-white">
        {renderComponent()}
      </div>
    </div>
  );
};

export default ControlPanel;
