import axios from "axios";
import { p } from "framer-motion/client";
import { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import { FaBookAtlas, FaMoneyBillTrendUp } from "react-icons/fa6";
import { GiClick, GiPoliceOfficerHead } from "react-icons/gi";
import { GrAnnounce } from "react-icons/gr";
import { MdShoppingCart } from "react-icons/md";
import { PiStudentDuotone } from "react-icons/pi";
import { SiPolymerproject } from "react-icons/si";
import { TbCoinTaka } from "react-icons/tb";

const AdminHome = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [mastersCount, setMastersCount] = useState(0);
  const [course, setCourse] = useState(0);
  const [order, setOrder] = useState(0);
  const [announcements, setAnnouncements] = useState(0);
  const [projects, setProjects] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("https://api3.pathxfinder.com/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        return response.json();
      })
      .then((data) => {
        const allUsers = data.length;
        const masters = data.filter((user) => user.role === "subAdmin").length;
        setTotalUsers(allUsers);
        setMastersCount(masters);

      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("https://api3.pathxfinder.com/courses");
        setCourse(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCourses();
  }, []);

  //get all orders
  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("https://api3.pathxfinder.com/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrder(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrders();
  }, []);

  //  get all announcement 
  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("https://api3.pathxfinder.com/all-announcement", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAnnouncements(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrders();
  }, []);

  //get all projects
  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("https://api3.pathxfinder.com/all-project", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProjects(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrders();
  }, []);


  const soldOrder = Array.isArray(order)
    ? order.filter((order) => order.status === "paid").length
    : 0;
  const totalSales = Array.isArray(order)
    ? order.reduce((acc, order) => acc + order.amount, 0)
    : 0;

  const uniqueOrders = Array.from(
    Array.isArray(order)
      ? order.reduce((map, orderItem) => {
        if (!map.has(orderItem.userId)) {
          map.set(orderItem.userId, orderItem);
        }
        return map;
      }, new Map())
      : new Map()
        .values()
  );

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
      count: course?.length,
      text: "Total Courses",
    },
    {
      icon: FaMoneyBillTrendUp,
      count: soldOrder,
      text: "Total Orders",
    },
    {
      icon: MdShoppingCart,
      count: totalSales,
      text: "Total Sales",
    },
    {
      icon: SiPolymerproject,
      count: projects?.projects?.length,
      text: "Total Projects",
    },
    {
      icon: PiStudentDuotone,
      count: uniqueOrders.length,
      text: "Total Enrolled",
    },
    {
      icon: GrAnnounce,
      count: announcements?.announcements?.length,
      text: "Total Announcement",
    },
  ];

  return (
    <div className="mx-6 md:mx-8 lg:mx-9 xl:mx-11 pt-6 md:pt-8 lg:pt-9 xl:pt-11">
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
