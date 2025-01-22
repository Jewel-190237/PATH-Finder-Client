import React, { useEffect, useState } from "react";
import planImage from "../../assets/plan/plan.png";
import { HiOutlineCalendar } from "react-icons/hi";
import { GrAnnounce } from "react-icons/gr";
import { CiSquareQuestion } from "react-icons/ci";
import { MdPostAdd } from "react-icons/md";
import { FaRegCommentAlt } from "react-icons/fa";
import person from "../../assets/person.png";
import coin from "../../assets/plan/coin.png";
import bit from "../../assets/plan/bit.png";
import { IoHeartCircleOutline } from "react-icons/io5";

const Forum = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [active, setActive] = useState({ title: "Feed" });

  useEffect(() => {
    fetchAnnouncement();
  }, []);

  const fetchAnnouncement = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/all-announcement", {
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

  const data = [
    { title: "Feed", number: <HiOutlineCalendar /> },
    { title: "Announcements", number: <GrAnnounce /> },
    { title: "My Posts", number: <MdPostAdd /> },
  ];

  const renderContent = () => {
    const isAnnouncementActive = active.title === "Announcements";
    const contentData = isAnnouncementActive ? announcements : commentData;

    return contentData.map((item, index) => (
      <div
        key={index}
        className="mt-4 md:mt-6 lg:mt-7 xl:mt-[34px] text-white"
      >
        <div className="bg-[#F6170C] rounded lg:gap-4 p-3 md:p-4 lg:p-5 xl:p-6">
          <div className="flex items-center gap-3 ">
            <img
              className="w-[70px] items-center h-[70px] rounded-full"
              src={person}
              alt="person"
            />
            <div>
              <p className="description">
                Ashikur Rahamn
              </p>
              <p className="description">
                {isAnnouncementActive
                  ? new Date(item.createdAt).toLocaleString()
                  : item.time}
              </p>
            </div>
          </div>
          <p className="mt-4 heading3">
            {item.title || ""}
          </p>
          <p className="-mt-3 description">
            {item.announcement || ""}
          </p>
        </div>
      </div>
    ));
  };

  const commentData = [
    {
      id: 1,
      name: "Lincoln Gouse",
      coins: 16,
      bits: 16,
      time: "3 hours ago",
      text: "Lorem ipsum dolor sit amet consectetur. Odio aliquam ac eu vel.Proin lorem laoreet posuere est sollicitudin commodoLorem ipsum.",
    },
    {
      id: 2,
      name: "Jane Doe",
      coins: 25,
      bits: 12,
      time: "5 hours ago",
      text: "Viverra urna arcu lorem varius. Proin lorem laoreet posuere est sollicitudin commodoLorem ipsum dolor sit amet consectetur.",
    },
  ];

  return (
    <div
      className="bg-cover bg-center relative"
      style={{ backgroundImage: `url(${planImage})` }}
    >
      <div className="path-container text-white pt-14 md:pt-[80px]">
        <h1 className="heading text-center">
          Join the Conversation: Connect, <br /> Share, and Grow!
        </h1>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3">
          {data.map((item, index) => (
            <button
              key={index}
              onClick={() => setActive(item)}
              className={`rounded-[4px] p-2 ${
                active.title === item.title ? "bg-blue-500" : "bg-[#2D2D2D]"
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>
        <div className="mt-16">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Forum;
