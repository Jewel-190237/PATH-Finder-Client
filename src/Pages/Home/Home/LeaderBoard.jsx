import React from "react";
import LeaderBoardImage from "../../../assets/leaderboard.png";

const LeaderBoard = () => {
  return (
    <div
      className="bg-cover bg-center relative"
      style={{ backgroundImage: `url(${LeaderBoardImage})` }}
    >
      <div className="path-container pt-14 md:pt-[80px] lg:pt-[100px] xl:pt-[120px]">
        <p className="heading text-white">Leaderboard</p>
      </div>
    </div>
  );
};

export default LeaderBoard;


