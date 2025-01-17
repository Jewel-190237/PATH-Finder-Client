import React, { useEffect, useState } from "react";
import RevenueChart from "../../CommonChart/RevenueChart";
import GetUser from "../../Backend/GetUser";
import Marketing from "../../CommonChart/Marketing";
import { GiClick } from "react-icons/gi";
import { PiStudentDuotone } from "react-icons/pi";
import { TfiCommentAlt } from "react-icons/tfi";
import { FaBookAtlas } from "react-icons/fa6";
const StudentOverview = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const user = GetUser();
  useEffect(() => {
    setCurrentUser(user);
  }, [user]);
  const dashboardItems = [

    {
      icon: FaBookAtlas,
      count: 2,
      text: "Total Courses",
    },
    {
      icon: TfiCommentAlt,
      count: 3,
      text: "Total Reviews",
    },
    {
      icon: PiStudentDuotone,
      count: 2,
      text: "Total Enrolled",
    },
    {
      icon: GiClick,
      count: 2,
      text: "Total Clicked",
    },
  ];
  return (
    <div className="p-5 md:p-10 lg:p-12 xl:p-14 text-white">
      <h1 className="heading2">
        WellCome Back <span className="heading">{currentUser?.name}</span> Good
        Afternoon
      </h1>
      <div className="mx-6 md:mx-8 lg:mx-9 xl:mx-11 pt-6 md:pt-8 lg:pt-9 xl:pt-11">
        {/* Dashboard content */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 xl:gap-8 w-full justify-center">
          {dashboardItems.map((item, index) => (
            <div
              key={index}
              className="w-full py-5 md:py-6 lg:py-8 xl:py-10 text-white flex flex-col items-center justify-center bg-[#78120D] shadow-lg hover:scale-105 group rounded-lg transition-transform duration-200"
            >
              <item.icon className="heading group-hover:text-primary" />
              <h1 className=" group-hover:text-primary font-medium mt-3 lg:mt-4 xl:mt-5 text-center description">
                {item.text}: {item.count}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentOverview;
