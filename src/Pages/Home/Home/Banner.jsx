import { useState } from "react";
import HeroVideoDialog from "./HeroVideoDialog";
import heroBg from '../../../assets/banner/bg.png'
import posterImg from '../../../assets/banner/poster.png'
const Banner = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="relative h-[350px] sm:h-[650px] md:h-[680px] lg:h-[800px] xl:h-[982px] md:mb-20" >
     
        <div
            className="w-full h-full bg-cover bg-center -mt-24"
            style={{
                backgroundImage: `url(${heroBg})` ,
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative max-w-[1320px] mx-auto pb-40 pt-12  my-20 mb-16">
                <HeroVideoDialog
                    className="dark:hidden block"
                    animationStyle="top-in-bottom-out"
                    videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
                    thumbnailSrc={posterImg}
                    thumbnailAlt="Hero Video"
                />
                <div
                    className={ ` hidden sm:block absolute -bottom-8 sm:bottom-10 md:bottom-16 lg:bottom-20 xl:bottom-40 left-1/2  transform -translate-x-1/2 w-full bg-[rgba(35,7,19,0.30)] backdrop-blur-[30px] text-white p-10 rounded-lg shadow-xl transition-all duration-500 ease-in-out ${
                        isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    }`}
                >
                    <div className="bg-[#20010D] p-3  max-w-[675px] ">
                        <h2 className="heading font-bold font-roboto">
                            <span className="text-transparent bg-clip-text bg-[linear-gradient(90deg,#3F3FDE_0.07%,#FF0DEF_32.88%)]">
                                Experience
                            </span>{" "}
                            Unmatched Convenience <br /> with Our Services!
                        </h2>
                        <p className="text-sm md:text-xl lg:text-2xl font-roboto mt-4">
                            Enjoy premium features, secure exchanges, and seamless <br /> recharges with unmatched quality and value!
                        </p>
                    </div>
                </div>
            </div>
        </div>



      

    </div>
   
  );
};

export default Banner;

