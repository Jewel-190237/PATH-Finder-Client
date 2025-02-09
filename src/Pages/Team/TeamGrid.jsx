import { FaWhatsapp } from "react-icons/fa";
import { RiTelegramLine } from "react-icons/ri";
import img1 from "../../../src/assets/Team/1.png"
import img2 from "../../../src/assets/Team/2.png"
import img3 from "../../../src/assets/Team/3.png"
import img4 from "../../../src/assets/Team/4.png"
import img5 from "../../../src/assets/Team/5.png"
import img6 from "../../../src/assets/Team/6.png"

const teamMembers = [
   {
      name: "Charlie Septimus",
      role: "Motion Graphics Designer",
      img: img1,
   },
   {
      name: "Jaylon Ekstrom",
      role: "Graphics Designer",
      img: img2,
   },

   {
      name: "Justin Vaccaro",
      role: "Copywriter",
      img: img3,
   },

   {
      name: "Jhon Smith",
      role: "Content Writer",
      img: img4,
   },

   {
      name: "Jakob Rosser",
      role: "UI/UX Designer",
      img: img5,
   },

   {
      name: "Emerson Arc",
      role: "Sound Designer",
      img: img6,
   },

];

const TeamGrid = () => {
   return (
      <div className="bg-[url('/src/assets/Rewards/bg.png')] bg-cover bg-center pt-10 pb-60 text-white">
         <div className="path-container">
            <div className="text-center mb-10">
               <h1 className="heading xl:text-5xl max-w-[750px] mx-auto">Unmatched Quality and Convenience with Our Services!</h1>
               <p className="heading2 max-w-[750px] mx-auto mt-6">
                  Unlock premium features, secure exchanges, and hassle-free recharges with our trusted services.
               </p>
            </div>
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:gap-[60px] lg:gap-12 md:gap-5 sm:gap-3 gap-2">
               {teamMembers.map((member, index) => (
                  <div key={index} className="relative rounded-lg shadow-lg overflow-hidden mx-auto w-full">
                     <img
                        src={member.img}
                        alt={member.name}
                        className="w-full lg:h-[300px] xl:h-[400px] object-cover"
                     />
                     <div className="bg-[#b10909] text-white lg:px-6 md:px-4 px-2 h-[135px] py-8">
                        <h3 className="heading">{member.name}</h3>
                        <p className="heading2 text-[#D9D9D9] mt-3">{member.role}</p>
                     </div>
                     <div className="absolute flex flex-col bottom-36 right-3 space-y-2">
                        <a href="https://wa.me/01660013379" className="bg-[#25d366] p-2 rounded-full">
                           <FaWhatsapp className="text-xl" />
                        </a>
                        <a href="https://t.me/PathFinderOfficial" className="bg-[#0088cc] p-2 rounded-full">
                           <RiTelegramLine className="text-xl" />
                        </a>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default TeamGrid;
