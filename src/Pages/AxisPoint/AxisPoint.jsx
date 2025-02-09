import { useEffect, useState } from "react";
import GetUser from "../../Backend/GetUser";
import bgImg from "../../assets/service/premium.png"

const AxisPoint = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const user = GetUser();
  useEffect(() => {
    setCurrentUser(user);
  }, [user]);
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  };


  const selectedUsers = users.filter((user) => user.subAdmin === currentUser?._id);

  return (
    < div
      style={{
        backgroundImage: `url(${bgImg})`,
      }
      }
      className="bg-cover bg-center text-white pt-40 pb-96 px-5"
    >
      <div className="max-w-[1320px] mx-auto">
        <div className="text-center text-white">
          <h1 className="heading font-bold mb-4">
            Your Gateway to Exclusive Benefits!
          </h1>
          <p className="text-sm md:text-lg text-gray-300 mx-auto max-w-[630px]">
            Create and customize your profile to unlock personalized offers,
            track your activities, and enjoy seamless access to all our
            services.access to all our services.
          </p>
        </div>
        <div className="p-6 mt-20 -mb-28 border-[1px] border-[#F5F8FC] rounded-t-[60px]">
          <div
            className="p-12  rounded-t-[40px]  shadow-lg mx-auto border-[1px] border-[#F5F8FC]"
            style={{ background: "rgba(246, 23, 12, 0.2)" }}
          >
            {selectedUsers?.map((item, index) => (
              <div
                key={index}
                style={{ backdropFilter: "blur(30px)" }}
                className="flex justify-between items-center bg-[rgba(255,255,255,0.20)]  p-3 mb-3 rounded-lg shadow-inner"
              >
                <div className="flex  items-center">
                  <p className="text-white font-bold  w-8 flex items-center justify-center mr-4 border-r-4 border-white ">
                    {index + 1}{" "}
                    <span className="border-r-4 border-white"></span>
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
    </div >
  );
};

export default AxisPoint;
