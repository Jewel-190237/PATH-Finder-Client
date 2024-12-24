import { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import { FaBookAtlas } from "react-icons/fa6";
import { GiClick, GiPoliceOfficerHead } from "react-icons/gi";
import { MdShoppingCart } from "react-icons/md";
import { PiStudentDuotone } from "react-icons/pi";
import { TbCoinTaka } from "react-icons/tb";
import { TfiCommentAlt } from "react-icons/tfi";

const AdminHome = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [mastersCount, setMastersCount] = useState(0);
  const [normalUsersCount, setNormalUsersCount] = useState(0);
  const [totalBuses, setTotalBuses] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Assuming you have token stored in localStorage
    fetch("http://localhost:5000/users", {
      headers: {
        Authorization: `Bearer ${token}`, // Include token in headers
      },
    })
      .then((response) => {
        if (!response.ok) {
          // Handle unauthorized access
          throw new Error("Failed to fetch users");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        const allUsers = data.length;
        const masters = data.filter((user) => user.role === "subAdmin").length;
        const normalUsers = data.filter(
          (user) => user.role === "student"
        ).length;

        setTotalUsers(allUsers);
        setMastersCount(masters);
        setNormalUsersCount(normalUsers);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // Fetch total buses
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/buses", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch buses");
        }
        return response.json();
      })
      .then((data) => {
        setTotalBuses(data.length);
      })
      .catch((error) => console.error("Error fetching buses:", error));
  }, []);

  const dashboardItems = [
    {
      icon: FaUsers,
      count: totalUsers - 1,
      text: "Total Users",
    },
    {
      icon: GiPoliceOfficerHead,
      count: mastersCount,
      text: "Total Sub Admins",
    },
    {
      icon: FaBookAtlas,
      count: normalUsersCount,
      text: "Total Courses",
    },
    {
      icon: TfiCommentAlt,
      count: totalBuses,
      text: "Total Reviews",
    },
    {
      icon: MdShoppingCart,
      count: 2,
      text: "Total Sales",
    },
    {
      icon: TbCoinTaka,
      count: 2,
      text: "Total Revenue",
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
    <div className="mx-10 pt-10">
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
  );
};

export default AdminHome;
