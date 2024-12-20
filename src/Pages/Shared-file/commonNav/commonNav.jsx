import { useState, useEffect } from "react";
import { FaHome, FaPhoneAlt, FaGift, FaFacebookMessenger, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link for navigation

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
    { icon: <FaPhoneAlt />, label: "Call", to: "/call" },
    { icon: <FaGift />, label: "Offer", to: "/offer" },
    { icon: <FaFacebookMessenger />, label: "Messenger", to: "/messenger" },
    { icon: <FaWhatsapp />, label: "WhatsApp", to: "/whatsapp" },
  ];

  return (
    <div className="fixed z-50 bottom-0 w-full bg-[#20010D] description text-white mx-auto flex items-center justify-between">
      {navItems.map((item, index) => (
        <Link to={item.to} key={index} onClick={() => handleSetActive(index)} className="flex-1">
          <button
            className={`py-4 sm:py-5 md:py-6 lg:py-8 xl:py-10 w-full text-center ${
              active === index ? "bg-[#78120D]" : ""
            }`}
          >
            <div className="mx-auto flex gap-1 lg:gap-2 items-center justify-center text-center">
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
