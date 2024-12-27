import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";

const ManagerDashboard = () => {
  return (
    <>
      <div className="flex w-full">
        <DashboardSidebar />
        <main className="w-full">
          <div className="">
            {" "}
            <DashboardHeader />
          </div>
          <div className="bg-[#20010D] w-full h-screen">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
};

export default ManagerDashboard;
