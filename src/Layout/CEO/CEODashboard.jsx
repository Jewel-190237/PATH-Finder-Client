import { Outlet } from "react-router-dom";
import CEODashboardHeader from "./CEODashboardHeader";
import DashboardSidebar from "./DashboardSidebar";

const CEODashboard = () => {
  return (
    <div className="flex h-screen w-full">
      <div className="bg-[#78120D] flex-shrink-0">
        <DashboardSidebar />
      </div>
      <main className="flex flex-col w-full h-full">
        <CEODashboardHeader />
        <div className="bg-[#20010D] flex-grow overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default CEODashboard;
