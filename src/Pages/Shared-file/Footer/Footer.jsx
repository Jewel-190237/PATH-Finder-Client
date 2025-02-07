
import { useState } from "react";
import Swal from "sweetalert2";
import footerImg from "../../../assets/footerbg.png";
import facebook from "../../../assets/facebook.png";
import person from "../../../assets/person.png";
import shape from "../../../assets/shape.png";
import logo from "../../../assets/logo1.png";
import call from "../../../assets/call.png";
import mail from "../../../assets/email.png";
import { Link } from "react-router-dom";
const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address!",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Subscribed Successfully",
      text: "Thank you for subscribing!",
    });

    setEmail(""); // Reset input field
  };
  return (
    <footer
      className="bg-cover bg-center"
      style={{ backgroundImage: `url(${footerImg})` }}
    >
      <div className="py-10 md:py-14 lg:py-[70px] xl:py-[90px] max-w-[1320px] px-8 md:px-4 lg:px-2 xl:px-0 mx-auto text-white">
        <div className="w-full bg-[#20010D] border-[1px] border-[#FFFFFF1A] px-3 md:px-4 lg:px-5 xl:px-6 py-1 md:py-2 lg:py-3 xl:py-4 rounded-lg">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <img
              className=" rounded-full"
              width={92}
              height={42}
              src={logo}
              alt=""
            />
            <div className="flex items-center gap-2 md:gap-3 lg:gap-6 xl:gap-7">
              <div className="flex items-center gap-2">
                <img className="w-[30px] h-[30px]" src={call} alt="Call" />
                <p className="description -mb-1">+0123 456 7891</p>
              </div>
              <div className="flex items-center gap-2">
                <img className="w-[30px] h-[30px]" src={mail } alt="email" />
                <p className="description -mb-1">info@pathfinder.com</p>
              </div>
            </div>
          </div>
        </div>
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
                <a href="/review" className="">
                  Client Says
                </a>
              </li>
              <li>
                <a href="#" className="">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/faq" className="">
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#78120D] text-white p-3 lg:p-4 xl:p-5 rounded"
              />
              <button
                type="button"
                onClick={handleSubscribe}
                className="heading3 uppercase absolute top-1/2 right-[1px] transform -translate-y-1/2 bg-[#3F3FDE] text-white px-5 lg:px-6 xl:px-8 py-[11px] lg:py-[15px] xl:py-[18px] rounded"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="mt-2 md:mt-3 lg:-mt-5 xl:-mt-6 flex items-center justify-center">
          <Link to='/all-courses' className="common-button rounded-[16px] lg:rounded-[24px] xl:rounded-[32px]">
            Start Shopping
          </Link>
        </div>
        <div className="bg-[#20010D] flex items-center justify-between border-[1px] border-[#FFFFFF33] border-b-0 rounded-t-[12px] mt-12 ">
          <p className="description p-3 lg:p-4 xl:p-5">
            CopyRights {new Date().getFullYear()} All rights reserved.
            <span className="text-primary"> PATH Finder</span>
          </p>
          <Link to={'/privacy'} className="description p-3 lg:p-4 xl:p-5">Privacy and Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
