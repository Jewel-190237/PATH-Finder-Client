import { useEffect, useState } from "react";
import planImage from "../../assets/plan/plan.png";
import person from "../../assets/person.png";
import personImage from "../../assets/user.jpg";
import { HiOutlineCalendar } from "react-icons/hi";
import { GrAnnounce } from "react-icons/gr";

const Forum = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("Feed"); 

  useEffect(() => {
    fetchAnnouncement();
    fetchPost();
  }, []);

  const fetchAnnouncement = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://api3.pathxfinder.com/all-announcement", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        setAnnouncements(result?.announcements || []);
      } else {
        console.error("Failed to fetch announcements");
      }
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  const fetchPost = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://api3.pathxfinder.com/all-post", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        setPosts(result?.announcements || []);
      } else {
        console.error("Failed to fetch posts");
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const tabs = [
    { title: "Feed", icon: <HiOutlineCalendar /> },
    { title: "Announcements", icon: <GrAnnounce /> },
  ];

  const renderContent = () => {
    return (activeTab === "Feed" ? posts : announcements).map((item, index) => (
      <div
        key={index}
        className="mt-4 md:mt-6 lg:mt-7 xl:mt-[34px] text-white"
      >
        <div className="bg-[#F6170C] rounded lg:gap-4 p-3 md:p-4 lg:p-5 xl:p-6">
          <div className="flex items-center gap-3">
            <img
              className={`w-[70px] h-[70px] rounded-full ${activeTab == "Feed" ? "border-2 border-white" : ""}`}
              src={activeTab === "Feed" ? personImage : person}
              alt="person"
            />
            <div>
              <p className="description">{activeTab === "Feed" ? item.name : "Ashikur Rahman"}</p>
              <p className="description">
                {new Date(item.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
          <p className="mt-4 heading3">{item.title || ""}</p>
          <p className="-mt-3 description">{item.announcement || ""}</p>
        </div>
      </div>
    ));
  };

  return (
    <div
      className="bg-cover bg-center relative pb-48"
      style={{ backgroundImage: `url(${planImage})` }}
    >
      <div className="path-container text-white py-14 md:py-[80px] lg:py-[100px] xl:pt-[120px] ">
        <h1 className="heading text-center">
          Join the Conversation: Connect, <br /> Share, and Grow!
        </h1>
        <div className="mt-8 grid grid-cols-2 gap-3 lg:gap-6">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(tab.title)}
              className={`rounded-[4px] flex items-center justify-center gap-2 p-2 ${
                activeTab === tab.title ? "bg-blue-500" : "bg-[#2D2D2D]"
              }`}
            >
              {tab.icon} {tab.title}
            </button>
          ))}
        </div>
        <div className="mt-16">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Forum;
