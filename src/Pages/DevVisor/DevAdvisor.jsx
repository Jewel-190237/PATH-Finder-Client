import React, { useEffect, useState } from "react";
import RevenueChart from "../../CommonChart/RevenueChart";
import GetUser from "../../Backend/GetUser";
import Marketing from "../../CommonChart/Marketing";
const DevAdvisorOverview = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const user = GetUser();
  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  console.log("Current User:", currentUser);
  return (
    <div className="p-5 md:p-10 lg:p-12 xl:p-14 text-white">
      <h1 className="heading2">
        WellCome Back <span className="heading">{currentUser?.name}</span> Good
        Afternoon
      </h1>
      <div className="bg-[#F6170C] bg-opacity-20 px-4 py-3 rounded-xl mt-4 md:mt-5 lg:mt-6 xl:mt-8 ">
        <div className="flex items-center justify-between">
          <h2 className="heading2">CEO Activities </h2>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-[#8979FF] bg-opacity-30 flex items-center justify-center">
                <div className="h-[10px] w-[10px] rounded-full bg-[#8979FF]"></div>
              </div>
              <p>Canava</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-[#FF928A] bg-opacity-30 flex items-center justify-center">
                <div className="h-[10px] w-[10px] rounded-full bg-[#FF928A]"></div>
              </div>
              <p>E-Book</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-[#3CC3DF] bg-opacity-30 flex items-center justify-center">
                <div className="h-[10px] w-[10px] rounded-full bg-[#3CC3DF]"></div>
              </div>
              <p>Copyright</p>
            </div>
          </div>
        </div>
        <div className="mt-3 lg:mt-4 flex items-center flex-col sm:flex-row justify-between w-full gap-3 md:gap-4 xl:gap-6">
          <Marketing title={"Revenue"} amount={"12,000"} />
          <Marketing title={"Sales"} amount={"6,000"} />
        </div>
      </div>
      <h3 className="heading2 py-3 lg:py-4 xl:py-6">Course activities </h3>
      <div className="mt-4 md:mt-5 lg:mt-6 xl:mt-8 grid justify-between grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4 xl:gap-6">
        <RevenueChart title={"Total Enrolled"} revenue={"$12,000"} />
        <RevenueChart title={"Total Revenue"} revenue={"$6,000"} />
        <RevenueChart title={"Total Click"} revenue={"$2,000"} />
      </div>
    </div>
  );
};

export default DevAdvisorOverview;
