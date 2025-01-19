import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "../DashboardHeader";
import VirtualAssistantDashboardHeader from "./VirtualAssistantDashboardHeader";

const VirtualAssistantDashboard = () => {
  return (
    <div className="flex h-screen w-full">
      <div className="bg-[#78120D] flex-shrink-0">
        <DashboardSidebar />
      </div>
      <main className="flex flex-col w-full h-full">
        <VirtualAssistantDashboardHeader />
        <div className="bg-[#20010D] flex-grow overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default VirtualAssistantDashboard;
