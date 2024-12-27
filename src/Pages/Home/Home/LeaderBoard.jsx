import React, { useEffect, useState } from "react";
import LeaderBoardImage from "../../../assets/leaderboard.png";
import GetUser from "../../../Backend/GetUser";

const LeaderBoard = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const user = GetUser();
  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  console.log("Current User:", currentUser);

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
