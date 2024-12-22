import { useState } from "react";
import { FaHome, FaBars, FaTimes, FaUserGraduate } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoHomeOutline } from "react-icons/io5";
import { FaUserTie } from "react-icons/fa6";
import logo from "../assets/logo2.png";

const Dashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { to: "/dashboard/adminHome", label: "Overview", icon: LuLayoutDashboard },
    { to: "/dashboard/dashboard", label: "Dashboard", icon: IoHomeOutline },
    { to: "/dashboard/subAdmin", label: "Sub Admins", icon: FaUserTie },
    { to: "/dashboard/student", label: "Students", icon: FaUserGraduate },
    // { to: '/dashboard/payment', label: 'Payment', icon: FaMoneyCheckAlt },
    // { to: '/dashboard/counterPayment', label: "Counter's Payment", icon: FaMoneyCheckAlt },
    // { to: '/dashboard/addBus', label: 'Add A Bus', icon: FaBus  },
    // { to: '/dashboard/manageBus', label: 'Manage Bus', icon: GiBus },
    // { to: '/dashboard/addRoute', label: 'Add Route', icon: FaRoute },
    // { to: '/dashboard/routeManage', label: 'Route Management', icon: FaRoute },
    // { to: '/dashboard/allUsers', label: 'All Users Management', icon: FaUsers },
    // { to: '/dashboard/allMaster', label: 'All Master Management', icon: GiPoliceOfficerHead },
    { to: "/", label: "Home", icon: FaHome },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-[#78120D] pl-6 md:pl-8 lg:pl-10 xl:pl-12 pt-6 md:pt-8 lg:pt-10 xl:pt-12">
        <img className="w-[110px] h-[60px]" src={logo} alt="logo" />
        <div
          className={`w-[260px] min-h-screen sm:block ${
            isMenuOpen ? "block absolute top-0 left-0" : "hidden"
          } sm:relative`}
        >
          <ul className="space-y-2 md:space-y-3 lg:space-y-4 mt-10">
            {navItems.map((item, index) => (
              <li key={index} className="p-1 uppercase">
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center  text-white space-x-2 p-2 ${
                      isActive ? " bg-[#FCBB5833] p-2 rounded" : ""
                    }`
                  }
                >
                  <item.icon className="text-xl" />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Hamburger Icon for small devices */}
      <div className="sm:hidden fixed top-0 left-0 w-full bg-[#78120D] text-white p-4 flex justify-between items-center">
        <h1 className="text-white text-lg">Admin Dashboard</h1>
        <button onClick={toggleMenu} className="text-white">
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      <div className="flex-1 mt-16 sm:mt-0 bg-[#20010D]">
        {/* add here nav */}
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
