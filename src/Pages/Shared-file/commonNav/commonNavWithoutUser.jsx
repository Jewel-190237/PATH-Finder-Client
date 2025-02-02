import { useState, useEffect } from "react";
import { FaHome, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { HiOutlineLightBulb } from "react-icons/hi";
import { IoPersonCircleOutline } from "react-icons/io5";
import { MdOutlineForum } from "react-icons/md";
import { Link } from "react-router-dom";

const CommonNavWithoutUser = () => {
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

  const handleAction = (action) => {
    switch (action) {
      case "call":
        window.open("tel:+1234567890", "_self");
        break;
      case "messenger":
        window.open("https://www.messenger.com", "_blank");
        break;
      case "whatsapp":
        window.open("https://wa.me/+1234567890", "_blank");
        break;
      default:
        break;
    }
  };

  const navItems = [
    { icon: <FaHome />, label: "Home", to: "/" },
    { icon: <FaPhoneAlt />, label: "Call", action: "call" },
    { icon: <HiOutlineLightBulb />, label: "Offer", to: "/aspire" },
    { icon: <MdOutlineForum />, label: "Messenger", action: "messenger" },
    { icon: <FaWhatsapp />, label: "WhatsApp", action: "whatsapp" },
  ];

  return (
    <div className="fixed z-50 bottom-0 w-full bg-[#20010D] description text-white mx-auto flex items-center justify-between">
      {navItems.map((item, index) => (
        <Link
          to={item.to || "#"}
          key={index}
          onClick={() => {
            handleSetActive(index);
            if (item.action) handleAction(item.action);
          }}
          className="flex-1"
        >
          <button
            className={`py-4 sm:py-5 md:py-6 lg:py-8 xl:py-10 w-full text-center ${
              active === index ? "bg-[#78120D]" : ""
            }`}
          >
            <div className="description mx-auto flex flex-col sm:flex-row gap-1 lg:gap-2 items-center justify-center text-center">
              <span>{item.icon}</span>
              <span className="inline-block">{item.label}</span>
            </div>
          </button>
        </Link>
      ))}
    </div>
  );
};

export default CommonNavWithoutUser;
