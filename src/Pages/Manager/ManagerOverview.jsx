import React, { useEffect, useState } from "react";
import RevenueChart from "../../CommonChart/RevenueChart";
import GetUser from "../../Backend/GetUser";
const ManagerOverview = () => {
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
      <div className="mt-4 md:mt-5 lg:mt-6 xl:mt-8 grid justify-between grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4 xl:gap-6">
        <RevenueChart title={"Total Revenue"} revenue={"$12,000"} />
        <RevenueChart title={"Total Sales"} revenue={"$6,000"} />
        <RevenueChart title={"Total Click"} revenue={"$2,000"} />
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

export default ManagerOverview;

