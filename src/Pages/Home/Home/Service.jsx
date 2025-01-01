
import { RiArrowDropDownLine } from "react-icons/ri";

const cardsData = [
    {
        id: 1,
        image: "/src/assets/service/facebook.png",
        text: "Get rewards by following us on Facebook",
       
    },
    {
        id: 2,
        image: "/src/assets/service/tiktok.png" , 
        text: "Get rewards by following us on TikTok",
        
    },
    {
        id: 3,
        image: "/src/assets/service/youtube.png",
        text: "Get rewards by subscribing to us on YouTube",
       
    },
];

const Service = () => {
    return (
        <div
            className="bg-cover bg-center relative text-white -mt-40 mb-20"
            style={{ backgroundImage: `url(/src/assets/banner/bg.png)` }}
        >
            <div className="max-w-[1320px] mx-auto relative z-10 p-6 lg:p-10 xl:p-12">
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
                        <button className="common-button rounded">GET STARTED</button>
                        <button className="watch-button rounded capital">LEARN MORE</button>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1320px] mx-auto xl:-mt-20 pb-20">
                {cardsData.map((card) => (
                    <div
                        key={card.id}
                        className="rounded-[30px] bg-[#20010D]"
                        
                    >
                        <div className="relative max-w-[365px] h-full mx-auto pb-8">
                            {/* Icon Section */}
                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 flex items-center justify-center shadow-lg">
                                <img
                                    src={card.image}
                                    alt={card.text}
                                    className="w-28 h-28"
                                />
                            </div>
                            {/* Lower Section */}
                            <div
                                className="relative w-80 h-48 bg-cover bg-center rounded-lg shadow-lg mx-auto flex flex-col justify-end p-4"
                                style={{
                                    backgroundImage: `url(/src/assets/service/FB.png)`,
                                }}
                            >
                                <div className="w-full py-3 px-4 rounded-md flex items-center justify-between">
                                    {/* Text */}
                                    <p className="text-white text-sm md:text-base font-medium">
                                        {card.text}
                                    </p>

                                    {/* Arrow */}
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
