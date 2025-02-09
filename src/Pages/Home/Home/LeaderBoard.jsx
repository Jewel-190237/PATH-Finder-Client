
import LeaderBoardImage from "../../../assets/leaderboard.png";
import mansPng from '../../../assets/leaderboard/mans.png'
import groupPng from "../../../assets/leaderboard/group.png"
import design from "../../../assets/leaderboard/design.png"
const LeaderBoard = () => {
  const data = [
    { id: 4, name: "Omar Saris", amount: "35469" },
    { id: 5, name: "Marley Septimus", amount: "35469" },
    { id: 6, name: "Talan Donin", amount: "35469" },
    { id: 7, name: "Cheyenne Kenter", amount: "35469" },
    { id: 8, name: "Tiana Baptista", amount: "35469" },
  ];

  return (
    <div
      className="bg-cover bg-center relative pb-4 sm:pb-5 md:pb-6 lg:pb-0"
      style={{ backgroundImage: `url(${LeaderBoardImage})` }}
    >
      <div className="path-container pt-14 md:pt-20 lg:pt-[100px] xl:pt-[120px] flex xl:gap-6 lg:gap-5 md:gap-4 sm:gap-3 gap-1">
        <div className="w-1/2 ">
          <div>
            <img src={mansPng} alt="image" className="" />
          </div>
          <h1 className="text-[14px] sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl  font-extrabold font-roboto text-white mb-4 mt-10">Leaderbord Spotlight: Highest <br /> <span className="text-transparent bg-clip-text bg-[linear-gradient(90deg,#3F3FDE_0.07%,#FF0DEF_32.88%)]">Earners</span> This Month!</h1>
          <p className="text-white description mt-4 font-medium font-roboto">Why settle for less when you can have the best? Our services are designed to offer unmatched quality, reliability.</p>
          <img src={design} alt="design.png" className="relative ml-auto -mr-20 hidden lg:flex" />
        </div>
        <div className="w-1/2 absolute md:top-20 lg:bottom-0 right-0 pl-2 sm:pl-3 md:pl-5 lg:pl-20 ">
          <div className="bg-[#F6170C] p-1 sm:p-4 md:p-12 rounded-md  md:rounded-tl-[60px] max-w-[710px] shadow-lg mx-auto border-[1px] border-[#F5F8FC] -mr-0 relative">
            {data.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center bg-[rgba(255,255,255,0.20)] p-2 md:p-3 mb-1 sm:mb-2 md:mb-3 rounded-lg shadow-inner"
              >
                <div className="flex items-center">
                  <p className="hidden text-white font-bold w-8 sm:flex items-center justify-center mr-4 border-r-4 border-white">
                    {item.id} <span className="border-r-4 border-white "></span>
                  </p>
                  <p className="text-white description">{item.name}</p>
                </div>
                <p className="text-white description">{item.amount}</p>
              </div>
            ))}
            <img src={groupPng} alt="group.png" className="absolute hidden lg:flex -top-20 -left-14" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
