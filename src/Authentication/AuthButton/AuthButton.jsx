import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown, message, Space } from "antd";
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
    message.success("Sign out successful");
    navigate("/login");
    setIsAuthenticated(false);
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  const handleDashboardRedirect = () => {
    if (currentUser?.role == "admin") {
      return navigate("/dashboard/adminHome");
    } else if (currentUser?.subRole === "CEO") {
      return navigate("/CEODashboard/CEOHome");
    } else if (currentUser?.subRole === "Marketing Panel") {
      return navigate("/managerDashboard/managerHome");
    } else if (currentUser?.subRole === "Marketing Executive") {
      return navigate("/marketingDashboard/marketingHome");
    } else if (currentUser?.subRole === "Skill Strategist") {
      return navigate("/skillStrategist/strategistHome");
    } else if (currentUser?.subRole === "Skill Specialist") {
      return navigate("/skillSpecialist/specialistDashboard");
    } else if (currentUser?.subRole === "Dev Advisor") {
      return navigate("/devAdvisorDashboard/advisorHome");
    } else if (currentUser?.subRole === "Sales Director") {
      return navigate("/salesDirectorDashboard/directorHome");
    } else if (currentUser?.subRole === "Virtual assistant") {
      return navigate("/virtualAssistantDashboard/assistantHome");
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
