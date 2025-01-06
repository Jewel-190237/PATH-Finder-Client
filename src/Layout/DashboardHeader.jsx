import { Dropdown, Space } from "antd";
import { useEffect, useState } from "react";
import { BiUser } from "react-icons/bi";
import { FiLogOut, FiUser } from "react-icons/fi";
import { ImExit } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import GetUser from "../Backend/GetUser";
import coin from "../assets/coin.png";

const DashboardHeader = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const user = GetUser();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);

    const handleStorageChange = () => {
      const updatedToken = localStorage.getItem("token");
      setIsAuthenticated(!!updatedToken);
    };

    window.addEventListener("storage", handleStorageChange);

    if (user) {
      setCurrentUser(user);
    }

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [user]);

  // Handle profile navigation
  const handleProfile = () => {
    navigate("/dashboard/admin/profile");
  };

  // Handle logout functionality
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    Swal.fire({
      icon: "success",
      title: "Signed out successfully",
      showConfirmButton: false,
      timer: 2000,
    });
    navigate("/login");
    setIsAuthenticated(false);
  };

  // Handle menu item clicks
  const handleMenuClick = ({ key }) => {
    if (key === "profile") {
      handleProfile();
    } else if (key === "logout") {
      logout();
    }
  };

  // Dropdown menu items
  const menuItems = [
    {
      label: "Profile",
      key: "profile",
      icon: <FiUser />,
    },
    {
      label: "Logout",
      key: "logout",
      icon: <FiLogOut />,
    },
  ];

  // Format name to display only the first two words
  const formattedName = currentUser?.name
    ? currentUser.name.split(" ").length > 3
      ? currentUser.name.split(" ").slice(0, 2).join(" ")
      : currentUser.name
    : "";

  return (
    <header className="z-10 bg-[#78120D] bg-opacity-90 mt-14 lg:mt-0">
      <div className="flex items-center justify-between gap-1 sm:gap-8 px-2 sm:px-4 py-4 md:py-6 lg:py-8 xl:py-10">
        <h1 className="heading2 text-white">Dashboard</h1>
        <div className="flex justify-between items-center h-full">
          <div className="flex items-center space-x-1 sm:space-x-3 md:gap-x-6 notification-popover">
            {user?.subRole && (
              <div className="flex items-center">
                <img
                  className="w-10 h-10 rounded-full -mr-4 relative z-50"
                  src={coin}
                  alt="coin"
                />
                <div className="heading3 bg-[#78120D] rounded-[20px] ">
                  <p className="text-white px-6 py-1 pr-3">999</p>
                </div>
              </div>
            )}
            <Link
              to="/"
              target="_blank"
              className="flex items-center gap-1 hover:text-primary"
            >
              <ImExit className="text-sm sm:text-lg text-white" />
              <p className="text-sm whitespace-pre sm:text-lg text-white">
                Live Site
              </p>
            </Link>
            {isAuthenticated && (
              <Dropdown
                menu={{
                  items: menuItems,
                  onClick: handleMenuClick,
                }}
              >
                <a className="flex items-center">
                  <Space>
                    {formattedName && (
                      <span className="cursor-pointer hidden sm:block text-white">
                        {formattedName}
                      </span>
                    )}
                    <BiUser className="cursor-pointer text-white" size={20} />
                  </Space>
                </a>
              </Dropdown>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
