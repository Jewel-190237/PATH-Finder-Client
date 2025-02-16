import { useState } from "react";
import planImage from "../../assets/plan/plan.png";
import level from "../../assets/plan/level.png";
import coin from "../../assets/plan/coin.png";

const Plan = () => {
  const [activeTab, setActiveTab] = useState("ongoing");
  const data = [
    { title: "Facebook Post", number: 16 },
    { title: "Youtube", number: 16 },
    { title: "TikTok", number: 16 },
    { title: "WhatsApp", number: 16 },
    { title: "Telegram", number: 16 },
    { title: "Linkedin", number: 16 },
    { title: "Instagram", number: 16 },
  ];

  return (
    <div
      className="bg-cover bg-center relative"
      style={{ backgroundImage: `url(${planImage})` }}
    >
      <div className="path-container py-14 md:py-[80px] lg:py-[100px] xl:py-[120px]">
        <h1 className="heading text-white text-center">My challenge</h1>

        {/* Tabs (Visible only on small devices) */}
        <div className="sm:hidden flex justify-center gap-4 mt-6">
          <button
            className={`py-2 px-4 rounded-lg w-full ${
              activeTab === "ongoing" ? "bg-[#F38122] text-white" : "bg-gray-300"
            }`}
            onClick={() => setActiveTab("ongoing")}
          >
            Ongoing
          </button>
          <button
            className={`py-2 px-4 rounded-lg w-full ${
              activeTab === "achievements" ? "bg-[#F38122] text-white" : "bg-gray-300"
            }`}
            onClick={() => setActiveTab("achievements")}
          >
            Achievements
          </button>
        </div>

        {/* Content */}
        <div className="mt-8 md:mt-10 lg:mt-12 xl:mt-[60px] text-white flex flex-col sm:flex-row gap-3 md:gap-4 lg:gap-5 xl:gap-6">
          {/* Ongoing Section (Visible on larger screens or when active on small screens) */}
          <div className={`flex-1 ${activeTab === "achievements" ? "sm:block hidden" : ""}`}>
            <div className="bg-[#F38122] rounded-lg text-white py-2 px-4">
              <h3 className="heading2 mt-2">Ongoing</h3>
            </div>
            <div className="mt-4">
              <p className="heading2">Level Complete Road Map</p>
              <img src={level} className="w-full" alt="" />
            </div>
          </div>

          {/* Achievements Section (Visible on larger screens or when active on small screens) */}
          <div className={`flex-1 mb-6 sm:mb-0 ${activeTab === "ongoing" ? "sm:block hidden" : ""}`}>
            <div className="bg-[#F38122] rounded-lg text-white py-2 px-3">
              <h3 className="heading2 mt-2">Achievements</h3>
            </div>
            <div className="mt-4">
              <p className="heading2">
                Get bonuses by completing tasks: Like, Share, Comments
              </p>
              <div className="bg-[#3F3FDE] mt-2 text-center rounded-lg text-white py-2 px-3">
                <h3 className="description">Coin: 300</h3>
              </div>
              <div className="mt-5 space-y-2">
                {data.map((item, index) => (
                  <div
                    key={index}
                    className="bg-[#F38122] flex items-center justify-between rounded-lg text-white md:py-2 md:px-3 py-1 px-2"
                  >
                    <h3 className="heading2 mt-2">{item.title}</h3>
                    <div className="bg-[#78120D] md:rounded-[16px] rounded-xl flex items-center gap-1 px-3">
                      <img src={coin} className="w-4 h-4 " alt="icon" />
                      <p className="description pt-4">{item.number}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plan;
