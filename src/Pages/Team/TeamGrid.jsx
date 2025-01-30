import { FaWhatsapp } from "react-icons/fa";
import { RiTelegramLine } from "react-icons/ri";
import img1 from "../../../src/assets/Team/1.png"
import img2 from "../../../src/assets/Team/2.png"
import img3 from "../../../src/assets/Team/3.png"
import img4 from "../../../src/assets/Team/4.png"

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
        img: img1,
    },

    {
        name: "Emerson Arc",
        role: "Sound Designer",
        img: img2,
    },
    
];

const TeamGrid = () => {
    return (
        <div className="bg-[url('/src/assets/Rewards/bg.png')] bg-cover bg-center pt-10 pb-60 text-white">
            <div className="max-w-[1320px] mx-auto">
                <div className="text-center mb-10">
                    <h1 className="heading xl:text-5xl max-w-[750px] mx-auto">Unmatched Quality and Convenience with Our Services!</h1>
                    <p className="heading2 max-w-[750px] mx-auto mt-6">
                        Unlock premium features, secure exchanges, and hassle-free recharges with our trusted services.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="relative bg-[#4b0404] rounded-lg shadow-lg overflow-hidden h-[535px] max-w-[400px] mx-auto">
                        <img
                          src={member.img} 
                          alt={member.name}
                          className=" h-[400px] object-cover"
                        />
                        <div className="bg-[#b10909] text-white px-6 h-[135px] py-8">
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
