import React from "react";
import footerImg from "../../../assets/footerbg.png";
import facebook from "../../../assets/facebook.png";
import person from "../../../assets/person.png";
import shape from "../../../assets/shape.png";

const Footer = () => {
  return (
    <footer
      className="mt-20 bg-cover bg-center"
      style={{ backgroundImage: `url(${footerImg})` }}
    >
      <div className="max-w-[1320px] px-8 md:px-4 lg:px-2 xl:px-0 mx-auto text-white">
        <div className="pt-6 lg:pt-8 xl:pt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div className="w-full bg-[#2307134D] p-3 lg:p-4 rounded-lg">
            <p className="heading3 text-center !font-medium">About Me</p>
            <div className="">
              <img className="w-[72px] h-[72px]" src={person} alt="CEO" />
              <div className="flex items-center gap-3 lg:gap-4 xl:gap-5">
                <div className="">
                  <h3 className="heading2 !font-medium mt-2 lg:mt-3">
                    Ashikur Rahman
                  </h3>
                  <p className="description">CEO and Founder</p>
                </div>
                <img className="w-[6px] h-[44px]" src={shape} alt="Facebook" />
                <div className="flex items-center gap-2 xl:gap-3">
                  <img
                    className="w-[30px] h-[30px]"
                    src={facebook}
                    alt="Facebook"
                  />
                  <img
                    className="w-[30px] h-[30px]"
                    src={facebook}
                    alt="Facebook"
                  />
                </div>
              </div>
              <p className="description !font-medium mt-2">
                Our team is dedicated to creating polished, impactful videos
                tailored to your vision. From brands to creators, we turn ideas
                into unforgettable visuals.
              </p>
            </div>
          </div>
          <div className="lg:ml-10 xl:ml-14 p-4">
            <p className="heading3 !font-medium">Jump To</p>
            <ul className="mt-4 space-y-3">
              <li>
                <a href="#" className="">
                  Work Process
                </a>
              </li>
              <li>
                <a href="#" className="">
                  Client Says
                </a>
              </li>
              <li>
                <a href="#" className="">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="">
                  Faq
                </a>
              </li>
            </ul>
          </div>
          <div className="-ml-4 p-4">
            <p className="heading2 !font-medium">Subscribe to our newsletter</p>
            <p className="description mt-2">
              Get pro video editing tips, trends, and insights—delivered to your
              inbox!
            </p>
            <div className="relative w-full mt-5 md:mt-6 lg:mt-7 xl:mt-8">
              <input
                type="text"
                placeholder="Enter your email"
                className="w-full bg-[#78120D] text-white p-3 lg:p-4 xl:p-5 rounded"
              />
              <button
                type="button"
                className="heading3 uppercase absolute top-1/2 right-[1px] transform -translate-y-1/2 bg-[#3F3FDE] text-white px-5 lg:px-6 xl:px-8 py-[11px] lg:py-[15px] xl:py-[18px] rounded"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button className="common-button rounded-[16px] lg:rounded-[24px] xl:rounded-[32px]">Start Shopping</button>
        </div>
        <div className="bg-[#20010D] flex items-center justify-between border border-b-0 rounded-t-[12px] mt-12 ">
          <p className="description p-3 lg:p-4 xl:p-5">
            CopyRights {new Date().getFullYear()} All rights reserved.
            <span className="text-primary"> PATH Finder</span>
          </p>
          <p className="description p-3 lg:p-4 xl:p-5">Privacy and Policy</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
