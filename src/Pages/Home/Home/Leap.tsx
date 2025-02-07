//@ts-nocheck
import React from "react";
import leapBg from "../../../assets/leapBg.png";
import bgImage from "../../../assets/bgImage.png";
import { Link } from "react-router-dom";

const Leap = () => {
  return (
    <div
      className="bg-cover bg-center relative text-white"
      style={{ backgroundImage: `url(${leapBg})` }}
    >
      <div className="max-w-[1320px] mx-auto relative z-10 p-6 lg:p-10 xl:p-12">
        <div
          className="max-w-[900px] border-[1px] border-[#a09e9e] mx-auto bg-[#2307134D] p-6 md:p-8 lg:p-12 xl:p-[60px] my-5 md:my-8 lg:my-[90px] xl:my-[110px] rounded-[10px] md:rounded-[14px] lg:rounded-[20px] xl:rounded-[30px]"
          style={{ backdropFilter: "blur(30px)" }}
        >
          <h1 className="heading text-center text-white mb-4">
            Take the Leap Toward Unmatched Quality and Convenience with Our
            Services!
          </h1>
          <p className="description text-center max-w-[500px] mx-auto">
            Unlock premium features, secure exchanges, and hassle-free recharges
            with our trusted services. Take the first step toward convenience
            today!
          </p>
          <div className="mt-4 md:mt-5 lg:mt-6 xl:mt-8 flex items-center justify-center gap-3 md:gap-4 lg:gap-5 xl:gap-6">
            <Link to='/offer' className="common-button !bg-red-600 rounded">GET STARTED</Link>
            <button className="watch-button !bg-green-600/50 rounded">WATCH NOW</button>
          </div>
        </div>
      </div>
      <img
        className="absolute bottom-0 left-0 z-0 opacity-90"
        src={bgImage}
        alt=""
      />
    </div>
  );
};

export default Leap;
