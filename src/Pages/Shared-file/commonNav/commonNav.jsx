import { useState, useEffect } from "react";
import { FaHome } from "react-icons/fa";
import { HiOutlineLightBulb } from "react-icons/hi";
import { IoPersonCircleOutline } from "react-icons/io5";
import { MdOutlineEditCalendar, MdOutlineForum } from "react-icons/md";
import { Link } from "react-router-dom";

const CommonNav = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const storedActiveIndex = localStorage.getItem("activeNavItem");
    if (storedActiveIndex !== null) {
      setActive(parseInt(storedActiveIndex));
    }
  }, []);

  const handleSetActive = (index) => {
    setActive(index);
    localStorage.setItem("activeNavItem", index);
  };

  const navItems = [
    { icon: <FaHome />, label: "Home", to: "/" },
    { icon: <MdOutlineEditCalendar />, label: "Plan", to: "/plan" },
    { icon: <HiOutlineLightBulb />, label: "Aspire", to: "/aspire" },
    { icon: <MdOutlineForum />, label: "Forum", to: "/forum" },
    { icon: <IoPersonCircleOutline />, label: "Profile", to: "/profile" },
  ];

  return (
    <div className="fixed z-50 bottom-0 w-full bg-[#20010D] description text-white mx-auto flex items-center justify-between">
      {navItems.map((item, index) => (
        <Link
          to={item.to}
          key={index}
          onClick={() => handleSetActive(index)}
          className="flex-1"
        >
          <button
            className={`py-4 sm:py-5 md:py-6 lg:py-8 xl:py-10 w-full text-center ${
              active === index ? "bg-[#78120D]" : ""
            }`}
          >
            <div className="description mx-auto flex flex-col sm:flex-row gap-1 lg:gap-2 items-center justify-center text-center">
              <span className="">{item.icon}</span>
              <span className=" inline-block">{item.label}</span>
            </div>
          </button>
        </Link>
      ))}
    </div>
  );
};

export default CommonNav;
