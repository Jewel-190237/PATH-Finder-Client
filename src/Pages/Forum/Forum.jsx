import React from "react";
import planImage from "../../assets/plan/plan.png";
import { HiOutlineCalendar } from "react-icons/hi";
import { GrAnnounce } from "react-icons/gr";
import { BsQuestionSquare } from "react-icons/bs";
import { CiSquareQuestion } from "react-icons/ci";
import { MdPostAdd } from "react-icons/md";

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
      </div>
    </div>
  );
};

export default Forum;
