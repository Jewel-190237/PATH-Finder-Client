import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Dropdown, Space } from "antd";
import loginPerson from "../../assets/loginPerson.png";
import GetUser from "../../Backend/GetUser";

const AuthButton = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const user = GetUser();
  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);

    const handleStorageChange = () => {
      const updatedToken = localStorage.getItem("token");
      setIsAuthenticated(!!updatedToken);
    };

    // Add event listener for localStorage changes
    window.addEventListener("storage", handleStorageChange);

    return () => {
      // Clean up the event listener on component unmount
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleSignOut = () => {
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

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  const handleDashboardRedirect = () => {
    if (currentUser?.role === "admin") {
      return navigate("/dashboard/adminHome");
    } else if (currentUser?.subRole === "Manager") {
      return navigate("/managerDashboard/managerHome");
    } else if (currentUser?.subRole === "HR") {
      return navigate("/hrDashboard/hrHome");
    } else {
      return navigate("/login");
    }
  };

  const menuItems = [
    {
      key: "1",
      label: (
        <button
          onClick={handleDashboardRedirect}
          className="block w-full text-left"
        >
          Dashboard
        </button>
      ),
    },
    {
      key: "2",
      label: (
        <button
          onClick={handleSignOut}
          className="block w-full text-left text-red-500"
        >
          Sign Out
        </button>
      ),
    },
  ];

  return (
    <>
      {isAuthenticated ? (
        <Dropdown
          menu={{ items: menuItems }}
          trigger={["hover"]}
          placement="bottom"
        >
          <Space>
            <img
              src={loginPerson}
              alt="User"
              className="w-8 h-8 cursor-pointer rounded-full"
            />
          </Space>
        </Dropdown>
      ) : (
        <button
          onClick={handleLoginRedirect}
          className="button px-2 text-white"
        >
          Login
        </button>
      )}
    </>
  );
};

export default AuthButton;
