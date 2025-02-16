import { useState, useRef, useEffect } from "react";
import { FaBars, FaTimes, FaUserGraduate } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { MdDashboard, MdOutlineControlCamera, MdOutlinePostAdd } from "react-icons/md";
import { useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { PiBookDuotone } from "react-icons/pi";
import { FcIdea } from "react-icons/fc";
import { GrAnnounce } from "react-icons/gr";
export default function DashboardSidebar() {
  const navItems = [
    {
      navTitle: "General",
      link: [
        { to: "/dashboard/adminHome", label: "Overview", icon: MdDashboard },
        {
          to: "/dashboard/adminDashboard",
          label: "Dashboard",
          icon: RxDashboard,
        },
        { to: "/dashboard/users", label: "Students", icon: FaUserGraduate },
        { to: "/dashboard/subAdmin", label: "Sub Admins", icon: FaUsers },
        { to: "/dashboard/courses", label: "All Courses", icon: PiBookDuotone },
        {
          to: "/dashboard/controlPanel",
          label: "Control Panel",
          icon: MdOutlineControlCamera,
        },
        {
          to: "/dashboard/projects",
          label: "Projects",
          icon: FcIdea,
        },
        {
          to: "/dashboard/announcements",
          label: "Announcements",
          icon: GrAnnounce,
        },
        {
          to: "/dashboard/posts",
          label: "Posts",
          icon: MdOutlinePostAdd,
        },

      ],
    },

  ];

  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sidebarRef = useRef(null);

  const activePath = location.pathname;
  const activeItem = navItems
    .flatMap((section) => section.link)
    .find((link) => link.to === activePath)?.label;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="health-shadow">
      <div className="flex">
        {/* Sidebar for small and medium devices */}
        <div
          ref={sidebarRef}
          className={`bg-[#78120D] rounded-xl p-4 ${isMenuOpen ? "block absolute top-0 left-0 z-50" : "hidden"
            } block lg:hidden`}
        >
          <ul className="mt-14">
            <div className="bg-[#78120D] p-4 rounded-xl mb-6">
              <img
                className="w-[120px]"
                src={logo}
                width={140}
                height={43}
                alt="Logo"
              />
            </div>
            {navItems.map((section, sectionIndex) => (
              <div key={sectionIndex} className="mb-4">
                {/* <p className="description !text-xs px-3 !font-inter uppercase">
                  {section.navTitle}
                </p> */}
                {section.link.map((item, index) => (
                  <li key={index} className="p-1 ml-5">
                    <Link to={item.to}>
                      <div
                        className={`flex items-center  space-x-2 p-1 hover:bg-[#FCBB5833] hover:text-white rounded duration-300 ${activeItem === item.label
                            ? "bg-[#FCBB5833] text-white border"
                            : ""
                          }`}
                      >
                        <item.icon className="text-sm" />
                        <span className="text-sm !font-medium font-roboto">
                          {item.label}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </div>
            ))}
          </ul>
        </div>

        {/* Sidebar for large and above devices */}
        <div className="hidden lg:flex flex-col justify-between bg-[#78120D] text-white">
          <div className="">
            <img className="p-6 xl:p-7 w-[200px]" src={logo} alt="Logo" />
            {navItems.map((section, sectionIndex) => (
              <div key={sectionIndex} className="mb-6">
                {/* <p className="description px-7 xl:px-8 !font-inter uppercase">
                  {section.navTitle}
                </p> */}
                <ul className="py-4">
                  {section.link.map((item, index) => (
                    <li key={index} className="py-2 uppercase">
                      <Link to={item.to}>
                        <div
                          className={`flex items-center space-x-3 px-10 py-4 hover:bg-[#FCBB5833] hover:text-white duration-300 ${activeItem === item.label
                              ? "bg-[#FCBB5833] text-white"
                              : ""
                            }`}
                        >
                          <item.icon className="text-xl" />
                          <span className="description font-roboto">
                            {item.label}
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Hamburger Icon */}
        <div className="lg:hidden fixed top-0 left-0 w-full bg-[#78120D] p-4 flex justify-between items-center z-50">
          <h1 className="heading5 text-white !font-inter">Admin Dashboard</h1>
          <button onClick={toggleMenu} className="text-white">
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>
    </section>
  );
}
