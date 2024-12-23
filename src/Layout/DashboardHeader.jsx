import { Dropdown, Space } from "antd";
import { BiUser } from "react-icons/bi";
import { FiLogOut, FiUser } from "react-icons/fi";
import { ImExit } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";

const DashboardHeader = () => {
  const navigate = useNavigate();

  const handleProfile = () => {
    navigate("/dashboard/admin/profile");
  };

  const user = 'Admin'

  const logout = () => {
    // localStorage.removeItem("token");
    // localStorage.removeItem("userId");
    navigate("/");
  };

  const items = [
    {
      label: "Profile",
      icon: <FiUser />,
      key: "1",
      onClick: handleProfile,
    },
    {
      label: "Logout",
      icon: <FiLogOut />,
      key: "3",
      onClick: logout,
    },
  ];

  return (
    <header className="z-10 bg-[#78120D]">
      <div className="flex items-center justify-between gap-1 sm:gap-8 px-2 sm:px-4 py-2 md:py-3 lg:py-4 xl:py-5">
        <h1 className="heading5 !font-inter">Dashboard</h1>
        <div className="flex justify-between items-center h-full p-4">
          <div className="flex items-center space-x-1 sm:space-x-3 md:gap-x-6 notification-popover">
            <Link
              to="/"
              target="_blank"
              className="flex items-center gap-1 hover:text-primary"
            >
              <ImExit className="text-sm sm:text-lg " />
              <p className="text-sm whitespace-pre sm:text-lg ">
                Live Site
              </p>
            </Link>

            {/* Language Selector */}
            {/* <div className="rounded-full bg-[#E0E0E0]">
              <MdNotificationsActive className="md:p-1 text-xl xl:text-3xl" />
            </div> */}
            <Dropdown menu={{ items }}>
              <a className="flex items-center">
                <Space>
                  {user && (
                    <span className="cursor-pointer hidden sm:block">
                      {user}
                    </span>
                  )}
                  <BiUser className="cursor-pointer" size={20} />
                </Space>
              </a>
            </Dropdown>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
