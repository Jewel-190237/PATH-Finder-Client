import { useState, useEffect } from "react";
import { FaHome, FaFacebookMessenger, FaWhatsapp } from "react-icons/fa";
import { HiOutlineLightBulb } from "react-icons/hi";
import { IoPersonCircleOutline } from "react-icons/io5";
import { MdOutlineEditCalendar, MdOutlineForum } from "react-icons/md";
import { Link } from "react-router-dom";

const CommonNav = () => {
  const [active, setActive] = useState(0);

  // When the component mounts, retrieve the active item from localStorage
  useEffect(() => {
    const storedActiveIndex = localStorage.getItem("activeNavItem");
    if (storedActiveIndex !== null) {
      setActive(parseInt(storedActiveIndex));
    }
  }, []);

  // Update localStorage whenever the active item changes
  const handleSetActive = (index) => {
    setActive(index);
    localStorage.setItem("activeNavItem", index); // Store the active index in localStorage
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
            <div className="description mx-auto flex gap-1 lg:gap-2 items-center justify-center text-center">
              <span>{item.icon}</span>
              <span className="mr-2 inline-block">{item.label}</span>
            </div>
          </button>
        </Link>
      ))}
    </div>
  );
};

export default CommonNav;
