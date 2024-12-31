import { useState } from "react";
import HeroVideoDialog from "./HeroVideoDialog";

const VideoFrame = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="w-full h-full bg-cover bg-center -mt-24"
            style={{
                backgroundImage: "url('/src/assets/banner/bg.png')",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative max-w-[1320px] mx-auto py-40 my-20 mb-16">
                <HeroVideoDialog
                    className="dark:hidden block"
                    animationStyle="top-in-bottom-out"
                    videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
                    thumbnailSrc="/src/assets/banner/poster.png"
                    thumbnailAlt="Hero Video"
                />
                <HeroVideoDialog
                    className="hidden dark:block"
                    animationStyle="top-in-bottom-out"
                    videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
                    thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
                    thumbnailAlt="Hero Video"
                />
                <div
                    className={`absolute bottom-40 left-1/2 transform -translate-x-1/2 w-full bg-[rgba(35,7,19,0.30)] backdrop-blur-[30px] text-white p-10 rounded-lg shadow-xl transition-all duration-500 ease-in-out ${
                        isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    }`}
                >
                    <div className="bg-[#20010D] max-w-[675px]">
                        <h2 className="text-2xl md:text-3xl lg:text-[40px] font-bold font-roboto">
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
    );
};

export default VideoFrame;
