import LeaderBoardImage from "../../../assets/leaderboard.png";

const LeaderBoard = () => {
  const data = [
    { id: 4, name: "Omar Saris", amount: "35469 $" },
    { id: 5, name: "Marley Septimus", amount: "35469 $" },
    { id: 6, name: "Talan Donin", amount: "35469 $" },
    { id: 7, name: "Cheyenne Kenter", amount: "35469 $" },
    { id: 8, name: "Tiana Baptista", amount: "35469 $" },
  ];

  return (
    <div
      className="bg-cover bg-center relative h-[768px]"
      style={{ backgroundImage: `url(${LeaderBoardImage})` }}
    >
      <div className="path-container pt-14 md:pt-[80px] lg:pt-[100px] xl:pt-[120px] flex flex-col lg:flex-row w-full gap-6">
       <div className="w-full lg:w-1/2">
          <div>
            <img src="/src/assets/leaderboard/mans.png" alt="image" className="" />
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl  font-extrabold font-roboto text-white mb-4 mt-10">Leaderbord Spotlight: Highest <br /> <span className="text-transparent bg-clip-text bg-[linear-gradient(90deg,#3F3FDE_0.07%,#FF0DEF_32.88%)]">Earners</span> This Month!</h1>
          <p className="text-white text-lg md:text-xl lg:text-[24px] mt-4 font-medium font-roboto">Why settle for less when you can have the best? Our services are designed to offer unmatched quality, reliability.</p>
          <img src="/src/assets/leaderboard/design.png" alt="design.png" className="relative ml-auto -mr-20 hidden lg:flex" />
       </div>
       <div className="w-full lg:w-1/2 absolute bottom-0 right-0 lg:pl-20 ">
       <div className="bg-[#F6170C] p-12  rounded-tl-[60px] max-w-[710px] shadow-lg mx-auto border-[1px] border-[#F5F8FC] -mr-0 relative">
      {data.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center bg-[rgba(255,255,255,0.20)]  p-3 mb-3 rounded-lg shadow-inner"
        >
          <div className="flex  items-center">
            <p className="text-white font-bold  w-8 flex items-center justify-center mr-4 border-r-4 border-white ">
              {item.id} <span className="border-r-4 border-white "></span>
            </p>
            <p className="text-white font-medium">{item.name}</p>
          </div>
          <p className="text-white font-semibold">{item.amount}</p>
        </div>
      ))}
      <img src="/src/assets/leaderboard/group.png" alt="group.png" className="absolute hidden lg:flex -top-20 -left-14" />
    </div>
       </div>
      </div>
    </div>
  );
};

export default LeaderBoard;


