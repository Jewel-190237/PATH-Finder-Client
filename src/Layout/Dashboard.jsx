import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";

const Dashboard = () => {
  return (
    <>
      <div className="flex w-full">
        <DashboardSidebar />
        <main className="w-full">
          <div className="mt-14 lg:mt-0"> {/* <DashboardHeader /> */}</div>
          {/* #20010D */}
          <div className="bg-[#20010D] w-full h-screen">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
