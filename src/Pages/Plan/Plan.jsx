import React from "react";
import planImage from "../../assets/plan/plan.png";
import level from "../../assets/plan/level.png";
import coin from "../../assets/plan/coin.png";

const Plan = () => {
  const data = [
    {
      title: "Facebook Post",
      number: 16,
    },
    {
      title: "Youtube",
      number: 16,
    },
    {
      title: "TikTok",
      number: 16,
    },
    {
      title: "WhatsApp",
      number: 16,
    },
    {
      title: "Telegram",
      number: 16,
    },
    {
      title: "Linkedin",
      number: 16,
    },
    {
      title: "Instagram",
      number: 16,
    },
  ];
  return (
    <div
      className="bg-cover bg-center relative"
      style={{ backgroundImage: `url(${planImage})` }}
    >
      <div className="path-container pt-14 md:pt-[80px] lg:pt-[100px] xl:pt-[120px]">
        <h1 className="heading text-white text-center">My challenge </h1>
        <div className="mt-8 md:mt-10 lg:mt-12 xl:mt-[60px] text-white flex flex-col md:flex-row gap-3 md:gap-4 lg:gap-5 xl:gap-6">
          <div className="flex-1">
            <div className="bg-[#F38122] rounded-lg text-white py-1 md:py-2 lg:py-3 px-2 md:px-3 lg:px-4">
              <h3 className="heading2">Ongoing</h3>
            </div>
            <div className="mt-4 md:mt-6 lg:mt-8 xl:mt-10">
              <p className="heading2">Level complete road map </p>
              <img src={level} className="w-full" alt="" />
            </div>
          </div>
          <div className="flex-1">
            <div className="bg-[#F38122] rounded-lg text-white py-1 md:py-2 lg:py-3 px-2 md:px-3 lg:px-4">
              <h3 className="heading2">Achievements</h3>
            </div>
            <div className="mt-4 md:mt-6 lg:mt-8 xl:mt-10">
              <p className="heading2">
                Get bonuses by completing task; like ,Share , Comments
              </p>
              <div className="bg-[#3F3FDE] mt-2 lg:mt-3 xl:mt-4 text-center rounded-lg text-white py-1 md:py-2 lg:py-3 px-2 md:px-3 lg:px-4">
                <h3 className="description">Coin: 300</h3>
              </div>
              <div className="mt-5 md:mt-6 lg:mt-8 xl:mt-10 space-y-2 lg:space-y-3 xl:space-y-4">
                {data.map((item, index) => (
                  <div
                    key={index}
                    className="bg-[#F38122] flex items-center justify-between rounded-lg text-white py-1 md:py-2 lg:py-3 px-2 md:px-3 lg:px-4"
                  >
                    <h3 className="heading2">{item.title}</h3>
                    <div className="bg-[#78120D] rounded-[16px] flex items-center gap-1 px-2 py-1">
                      <img src={coin} alt="icon" />
                      <p className="description">{item.number}</p>
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
