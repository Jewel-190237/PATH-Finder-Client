import React from "react";
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
  const data = [
    {
      title: "Feed",
      number: <HiOutlineCalendar />,
    },
    {
      title: "Announcements",
      number: <GrAnnounce />,
    },
    {
      title: "Questions",
      number: <CiSquareQuestion />,
    },
    {
      title: "My Posts",
      number: <MdPostAdd />,
    },
  ];

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
    {
      id: 3,
      name: "John Smith",
      coins: 10,
      bits: 20,
      time: "1 hour ago",
      text: "Ut diam facilisi justo augue massa dictumst. Lorem ipsum dolor sit amet consectetur. Odio aliquam ac eu vel.",
    },
  ];

  const [active, setActive] = React.useState(data[0]);

  return (
    <div
      className="bg-cover bg-center relative"
      style={{ backgroundImage: `url(${planImage})` }}
    >
      <div className="path-container text-white pt-14 md:pt-[80px] lg:pt-[100px] xl:pt-[120px]">
        <h1 className="heading text-center">
          Join the Conversation: Connect, <br /> Share, and Grow!
        </h1>
        <p className="heading2 text-center mt-3 lg:mt-4">
          Be part of a vibrant community where ideas flourish <br /> Discuss
          topics, seek advice, and share your knowledge to <br /> inspire and be
          inspired!
        </p>
        <div className="mt-8 md:mt-10 lg:mt-12 xl:mt-[60px] text-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 lg:gap-5 xl:gap-6">
          {data.map((item, index) => (
            <button
              onClick={() => setActive(item)} // Update the active state on click
              key={index}
              className={`rounded-[4px] p-2 flex items-center gap-3 ${
                active.title === item.title ? "bg-blue-500" : "bg-[#2D2D2D]"
              }`}
            >
              <p className="description">{item.number}</p>
              <p className="description">{item.title}</p>
            </button>
          ))}
        </div>

        <div className="mt-16">
          {commentData.map((comment) => (
            <div
              key={comment.id}
              className="mt-4 md:mt-6 lg:mt-7 xl:mt-[34px] text-white"
            >
              <div className="bg-[#F6170C] rounded">
                <div className="flex gap-3 lg:gap-4 p-3 md:p-4 lg:p-5 xl:p-6">
                  <img
                    className="w-[70px] items-center h-[70px] rounded-full"
                    src={person}
                    alt="person"
                  />
                  <div>
                    <p className="description">{comment.name}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="bg-[#F38122] px-2 flex items-center gap-1 rounded-lg">
                        <img
                          className="w-[20px] h-[20px]"
                          src={coin}
                          alt="coin"
                        />
                        <p className="description">{comment.coins}</p>
                      </div>
                      <div className="bg-[#F38122] px-2 flex items-center gap-1 rounded-lg">
                        <img
                          className="w-[20px] h-[20px]"
                          src={bit}
                          alt="bit"
                        />
                        <p className="description">{comment.bits}</p>
                      </div>
                      <p className="ml-2 description">{comment.time}</p>
                    </div>
                  </div>
                </div>
                <p className="-mt-2 description px-3 md:px-4 lg:px-5 xl:px-6">
                  {comment.text}{" "}
                  <span className="text-[#2B35FF]">
                    <button>Read More</button>
                  </span>
                </p>
                <div className="w-full h-[1px] my-2 md:my-3 lg:my-4 xl:my-6 bg-[#FCBB58]"></div>
                <div className="px-3 md:px-4 lg:px-5 xl:px-6 flex items-center gap-5 pb-3 md:pb-4 lg:pb-5 xl:pb-6">
                  <div className="flex items-center gap-2">
                    <button>
                      <IoHeartCircleOutline className="text-[16px] lg:text-xl xl:text-2xl" />
                    </button>
                    <p className="description">16</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button>
                      <FaRegCommentAlt className="text-sm lg:text-[16px] xl:text-xl" />
                    </button>
                    <p className="description">16</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Forum;
