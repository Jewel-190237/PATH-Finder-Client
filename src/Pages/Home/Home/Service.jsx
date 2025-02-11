
import { RiArrowDropDownLine } from "react-icons/ri";
import facebook from "../../../assets/service/facebook.png"
import tiktok from "../../../assets/service/tiktok.png"
import youtube from "../../../assets/service/youtube.png"
import bgImg from "../../../assets/banner/bg.png"
import fbPng from "../../../assets/service/FB.png"
import { Link } from "react-router-dom";
const cardsData = [
   {
      id: 1,
      image: facebook,
      text: "Get rewards by following us on Facebook",
      link: "https://www.facebook.com/profile.php?id=61569871899271"
   },
   {
      id: 2,
      image: tiktok,
      text: "Get rewards by following us on TikTok",
      link: "https://www.tiktok.com/@pathx.finder?_t=ZS-8tm60WUmNke&_r=1"
   },
   {
      id: 3,
      image: youtube,
      text: "Get rewards by subscribing to us on YouTube",
      link: "https://www.youtube.com/@PathXFinder007ars"
   },
];

const Service = () => {
   return (
      <div
         className="bg-cover bg-center relative text-white -mt-40 sm:pb-20 "
         style={{ backgroundImage: `url(${bgImg})` }}
      >
         <div className="path-container relative z-10 p-6 lg:p-10 xl:p-12">
            <div className="mx-auto p-6 md:p-8 lg:p-12 xl:p-[60px] my-5 md:my-8 lg:my-[90px] xl:my-[110px]">
               <h1 className="font-roboto text-lg font-extrabold md:text-xl lg:text-2xl text-center mx-auto uppercase">
                  Earn Big Through
               </h1>
               <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-center font-extrabold font-roboto uppercase text-white mb-4">
                  Premium{" "}
                  <span className="text-transparent bg-clip-text bg-[linear-gradient(90deg,#3F3FDE_0.07%,#FF0DEF_32.88%)]">
                     Services
                  </span>
                  , Currency <br /> Exchange, and Phone Recharges!
               </h1>
               <p className="description text-center max-w-[650px] mx-auto">
                  Effortlessly by referring users. Start earning effortlessly by referring <br /> users into rewards today!
               </p>
               <div className="mt-4 md:mt-5 lg:mt-6 xl:mt-8 flex items-center justify-center gap-3 md:gap-4 lg:gap-5 xl:gap-6">
                  <Link to='/login' className="common-button rounded">GET STARTED</Link>
                  <Link to={'/about'} className="watch-button rounded capital">LEARN MORE</Link>
               </div>
            </div>
         </div>
         <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6 max-w-[1320px] mx-auto xl:-mt-20 pb-20">
            {cardsData.map((card) => (
               <div
                  key={card.id}
                  className="rounded-[30px] bg-[#20010D]"

               >
                  <div className="relative max-w-[250px] md:max-w-[365px] h-full mx-auto pb-4 lg:pb-8 mt-5">
                     {/* Icon Section */}
                     <Link to={card.link} className="absolute z-50 sm:top-0 lg:-top-8 left-1/2 transform -translate-x-1/2 flex items-center justify-center shadow-lg">
                        <img
                           src={card.image}
                           alt={card.text}
                           className="w-1/2  lg:w-full"
                        />
                     </Link>
                     {/* Lower Section */}
                     <div
                        className="max-w-28 h-28 sm:max-w-40 md:max-w-56 sm:h-40 lg:max-w-80 lg:h-48 bg-cover bg-center rounded-lg shadow-lg mx-auto flex flex-col justify-end p-4"
                        style={{
                           backgroundImage: `url(${fbPng})`,
                        }}
                     >
                        <div className="hidden w-full py-3 px-4 rounded-md lg:flex items-center justify-between">
                           <p className="text-white text-sm md:text-base font-medium">
                              {card.text}
                           </p>

                           <div className="bg-blue-700 w-6 h-4 rounded flex items-center justify-center">
                              <RiArrowDropDownLine className="text-[#FCBB58] -rotate-90 text-xl" />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

export default Service;
