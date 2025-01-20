//@ts-nocheck
import React from "react";
import planImage from "../../assets/plan/plan.png";
import { FiBookOpen } from "react-icons/fi";
import { FaC } from "react-icons/fa6";
import { FaJava, FaPython } from "react-icons/fa";
import { TbBrandJavascript, TbWorldWww } from "react-icons/tb";

const Aspire = () => {
  const data = [
    { title: "All", number: <FiBookOpen /> },
    { title: "Python", number: <FaPython /> },
    { title: "Web", number: <TbWorldWww /> },
    { title: "Java", number: <FaJava /> },
    { title: "C", number: <FaC /> },
    { title: "JavaScript", number: <TbBrandJavascript /> },
  ];

  const [active, setActive] = React.useState(data[0]);

  return (
    <div
      className="bg-cover bg-center relative"
      style={{ backgroundImage: `url(${planImage})` }}
    >
      <div className="path-container pt-14 md:pt-[80px] lg:pt-[100px] xl:pt-[120px] h-screen">
        <h1 className="heading text-white text-center">My Projects</h1>
        <div className="mt-8 md:mt-10 lg:mt-12 xl:mt-[60px] text-white grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 md:gap-4 lg:gap-5 xl:gap-6">
          {data.map((item, index) => (
            <button
              key={index}
              onClick={() => setActive(item)}
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

export default Aspire;
