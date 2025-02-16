import { useEffect, useState } from "react";
import { Progress, Slider, Space } from "antd";
import { Link } from "react-router-dom";
import bg from "../../assets/profile/Rank.png";
import person from "../../assets/user.jpg";
import GetUser from "../../Backend/GetUser";
import { MdVerified } from "react-icons/md";
const Profile = () => {
  const [salaryPercent, setSalaryPercent] = useState(50);
  const [taskPercent, setTaskPercent] = useState(70);
  const [skillPercent, setSkillPercent] = useState(30);
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const user = GetUser();
  useEffect(() => {
    setCurrentUser(user);
    fetchUsers();
  }, [user]);

  const fetchUsers = () => {
    const token = localStorage.getItem("token");
    fetch("https://api3.pathxfinder.com/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  };

  const selectedUsers = users.filter(
    (user) => user.subAdmin === currentUser?._id
  );

  const data = [
    {
      title: "Profit",
      value: currentUser?.balance || 0,
    },
    {
      title: "Junior Employee",
      value: selectedUsers.length || 0,
      link: "/axisPoint",
    },
    {
      title: "Axis Point",
      value: '06',
      link: "/team",
    },
  ]
  return (
    <div
      className="bg-cover bg-center bg-no-repeat w-full relative"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="path-container pt-28  flex flex-col items-center justify-center relative">
        <div className="text-center text-white">
          <h1 className="heading font-bold mb-4">
            Your Gateway to Exclusive Benefits!
          </h1>
          <p className="text-sm md:text-lg text-gray-300 max-w-[630px]">
            Create and customize your profile to unlock personalized offers,
            track your activities, and enjoy seamless access to all our
            services.access to all our services.
          </p>
        </div>
        <div className="bg-[#F38122] w-full rounded sm:rounded-md lg:rounded-lg xl:rounded-xl lg:p-4 xl:p-5 2xl:p-[30px] flex items-center justify-between relative shadow-lg xl:mt-40 lg:mt-32 md:mt-24 sm:mt-20 mt-10">
          <div className="absolute -top-6 sm:-top-[40px] lg:-top-[50px] xl:-top-[70px] 2xl:-top-[108px] left-1/2 transform -translate-x-1/2">
            <div className="rounded-full bg-red-800 overflow-hidden w-16 h-16 sm:w-[80px] sm:h-[80px] lg:w-[120px] lg:h-[120px] xl:w-[150px] xl:h-[150px] 2xl:w-[200px] 2xl:h-[200px]">
              <img
                src={person}
                alt="Profile"
                className="w-full h-full object-fill rounded-full"
              />
            </div>
            <div className="absolute bottom-0 right-0 rounded-full flex items-center justify-center">
              <MdVerified className="w-7 h-7 sm:w-9 sm:h-9 lg:w-12 lg:h-12 xl:w-14 xl:h-14 text-blue-700" />
            </div>
          </div>
          <div className="text-white flex-1 text-left ml-5 mt-3">
            <p className="text-lg font-semibold">
              Coins: {currentUser?.coins || 0}
            </p>
          </div>
          <div className="text-white flex-1 text-right mr-5 mt-3">
            <p className="text-lg font-semibold">
              Level : {currentUser?.level || 0}
            </p>
          </div>
        </div>
        <div className="mt-5 text-white mx-auto md:mx-0 md:ml-auto">
          <p className="description">Name : {currentUser?.name}</p>
          <p className="description">ID : {currentUser?._id.slice(0, 5)}</p>
        </div>
        {currentUser?.role !== "student" && (
          <>
            <div className="hidden md:flex justify-between md:gap-5 gap-2 mt-10 mb-20 w-full">
              <div className="bg-[#78120D] text-white p-3 shadow-md md:w-64 rounded-[12px]">
                <p className="heading3 text-[#B0B0B0] whitespace-pre">My Profit</p>
                <p className="text-sm">{currentUser?.balance || 0}</p>
              </div>
              <p className="text-[#F38122] hidden xl:flex items-center">
                ------------------------------------
              </p>
              <Link to="/axisPoint">
                <div className="md:w-64 w-32 p-3 bg-[#78120D] text-white shadow-md rounded-[12px] cursor-pointer">
                  <p className="text-[#B0B0B0] heading3 !text-[8px] ">
                    Junior Employee
                  </p>
                  <p className="text-sm">{selectedUsers.length}</p>
                </div>
              </Link>
              <p className="text-[#F38122] hidden xl:flex items-center">
                ------------------------------------
              </p>
              <Link to="/team">
                <div className="bg-[#78120D] text-white p-3 shadow-md md:w-64 rounded-[12px]">
                  <p className="heading3 text-[#B0B0B0] whitespace-pre">Axis Point</p>
                  <p className="text-sm">06</p>
                </div>
              </Link>
            </div>
            <div className="grid grid-cols-3 md:hidden justify-between sm:gap-3 gap-2 w-full mt-6">
              {data.map((item, index) => (
                <div key={index}>
                  <Link to={item.link}>
                    <div className="bg-[#78120D] text-white sm:p-3 p-1 shadow-md rounded-[12px]">
                      <p className="heading3 !text-[12px] text-[#B0B0B0] whitespace-pre">{item.title}</p>
                      <p className="text-sm">{item.value}</p>
                    </div>
                  </Link> </div>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="mt-5 md:mt-0 flex flex-col lg:flex-row w-full gap-6">
        <div className="w-full lg:w-1/2 bg-[rgba(120,18,13,0.3)] max-w-[480px] h-[650px] rounded-[20px] mb-20 lg:mb-0">
          <div className="flex justify-between items-center text-white p-5">
            <h2 className="text-lg font-semibold">Personal Statistics</h2>
          </div>
          <p className="text-sm text-white mb-6 px-5">Personal Statistics</p>
          <div
            className="flex flex-col items-center justify-center space-y-8"
            style={{ padding: "20px" }}
          >
            <div className="relative">
              <div className="transform rotate-90">
                <Progress
                  type="circle"
                  percent={skillPercent}
                  strokeColor="#F6170C"
                  format={() => ` `}
                  width={150}
                />
              </div>
              <div className="absolute top-[20px] left-5 transform rotate-90">
                <Progress
                  type="circle"
                  percent={taskPercent}
                  strokeColor="#F38122"
                  format={() => ` `}
                  width={110}
                />
              </div>

              <div className="absolute top-[34px] left-[38px] transform rotate-90">
                <Progress
                  type="circle"
                  percent={salaryPercent}
                  strokeColor="#FCBB58"
                  format={() => ` `}
                  width={80}
                />
              </div>
            </div>
            <Space direction="vertical" size="large" className="w-full">
              <div className="w-80">
                <p className="text-white">Salary</p>
                <Slider
                  value={salaryPercent}
                  onChange={(value) => setSalaryPercent(value)}
                  min={0}
                  max={100}
                  trackStyle={{ backgroundColor: "#FCBB58" }}
                  handleStyle={{ borderColor: "#FCBB58" }}
                />
              </div>
              <div className="w-80 -mt-6">
                <p className="text-white">Task Plan</p>
                <Slider
                  value={taskPercent}
                  onChange={(value) => setTaskPercent(value)}
                  min={0}
                  max={100}
                  trackStyle={{ backgroundColor: "#F38122" }}
                  handleStyle={{ borderColor: "#F38122" }}
                />
              </div>
              <div className="w-80 -mt-6">
                <p className="text-white">Skill Plan</p>
                <Slider
                  value={skillPercent}
                  onChange={(value) => setSkillPercent(value)}
                  min={0}
                  max={100}
                  trackStyle={{ backgroundColor: "#F6170C " }}
                  handleStyle={{ borderColor: "#F6170C" }}
                />
              </div>
            </Space>
          </div>
        </div>

        <div className="w-full lg:w-1/2 absolute bottom-0 right-0 lg:pl-20 pb-12 :">
          <div className="bg-[#F6170C] p-12  rounded-tl-[60px] max-w-[710px] shadow-lg mx-auto border-[1px] border-[#F5F8FC] -mr-0 relative">
            {selectedUsers.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-[rgba(255,255,255,0.20)]  p-3 mb-3 rounded-lg shadow-inner"
              >
                <div className="flex  items-center">
                  <p className="text-white font-bold  w-8 flex items-center justify-center mr-4 border-r-4 border-white ">
                    {index + 1}{" "}
                    <span className="border-r-4 border-white "></span>
                  </p>
                  <p className="text-white font-medium">{item?.name}</p>
                </div>
                <p className="text-white font-semibold">
                  {item?.role === "student"
                    ? item?.coins || 0
                    : item?.balance || 0}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
