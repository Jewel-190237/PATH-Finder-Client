import { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdCloseCircle } from "react-icons/io";
import { BsSun, BsMoon } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { AiOutlineDown } from "react-icons/ai";
import AuthButton from "../../../Authentication/AuthButton/AuthButton";
import logoImage from "../../../../src/assets/others/logo.png"
import searchImg from "../../../assets/navbar/search.png"
import  coinImg from "../../../assets/navbar/coin.png"
const links = [
  { name: "Home", path: "/" },
  { name: "Course", path: "/all-courses" },
  { name: "Review", path: "/review" },
  { name: "FAQ", path: "/faq" },
  {
    name: "Others",
    path: "/others",
    submenu: [
      { name: "About", path: "/about" },
      { name: "Contact", path: "/contact" },
      { name: "Privacy Policy", path: "/privacy" },
      { name: "Premium Services", path: "/premiumServe" },   
    ],
  },
];

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const currentPath = window.location.pathname;
    const activeItem = links.find(
      (link) =>
        link.path === currentPath ||
        link.submenu?.some((sublink) => sublink.path === currentPath)
    );
    if (activeItem) {
      setActiveLink(activeItem.name);
    }
  }, []);

  const handleLinkClick = (linkName, path) => {
    setActiveLink(linkName);
    setIsOpen(false);
    if (path) {
      navigate(path);
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const renderLinks = () =>
    links.map((link, index) => (
      <div key={index} className="relative group">
        <div className="flex items-center space-x-2">
          <a
            href={link.path || "#"}
            className={`font-noto text-[18px] hover:text-[#3F3FDE] font-medium ${
              activeLink === link.name ? "text-[#3F3FDE]" : "text-gray-300"
            } hover:text-white`}
            onClick={() =>
              link.submenu ? null : handleLinkClick(link.name, link.path)
            }
          >
            {link.name}
          </a>
          {link.submenu && (
            <AiOutlineDown className="text-gray-300 group-hover:text-[#3F3FDE]" />
          )}
        </div>
        {link.submenu && (
          <div className="hidden group-hover:block w-36 z-50 absolute top-full left-0 bg-gray-800 text-white shadow-md rounded-md p-2 space-y-2">
            {link.submenu.map((sublink, subIndex) => (
              <a
                key={subIndex}
                href={sublink.path}
                className="block text-sm hover:text-[#3F3FDE]"
                onClick={() => handleLinkClick(sublink.name, sublink.path)}
              >
                {sublink.name}
              </a>
            ))}
          </div>
        )}
      </div>
    ));

  return (
    <nav className="bg-[#20010D]">
      <div className="max-w-[1320px] mx-auto px-4 flex items-center justify-between h-16">
        {/* Left Side: Logo and Menu */}
        <div className="flex items-center space-x-8">
          <a href="/">
            <img
              src={logoImage}
              alt="logoImage"
              className="w-24 h-14"
            />
          </a>
          <div className="hidden lg:flex space-x-8">{renderLinks()}</div>
        </div>

        {/* Right Side: Search and Icons */}
        <div className="flex items-center space-x-4">
          <div className="hidden lg:block relative w-80">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 pr-10 rounded-[8px] border bg-[#78120D] text-white focus:outline-none"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white cursor-pointer">
              <img
                src={searchImg}
                className="w-7 h-7"
              ></img>
            </div>
          </div>
          <img src={coinImg} className="w-7 h-7"></img>
          {/* <img src='/src/assets/navbar/login.png' className='w-7 h-7'></img> */}
          <AuthButton />
          <button onClick={toggleDarkMode} className="focus:outline-none">
            {darkMode ? (
              <BsSun className="text-xl text-orange-400" />
            ) : (
              <BsMoon className="text-xl text-orange-900" />
            )}
          </button>
          <button onClick={toggleMenu} className="lg:hidden text-2xl">
            {isOpen ? <IoMdCloseCircle /> : <GiHamburgerMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-gray-800 text-white p-4 space-y-4">
          {renderLinks()}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
