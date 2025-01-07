import { useState } from 'react';
import { Progress, Slider, Space } from "antd";
// import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Profile = () => {
    const [salaryPercent, setSalaryPercent] = useState(50);
    const [taskPercent, setTaskPercent] = useState(70);
    const [skillPercent, setSkillPercent] = useState(30);
    const data = [
        { id: 1, name: "Omar Saris", amount: "35469 $" },
        { id: 2, name: "Omar Saris", amount: "35469 $" },
        { id: 3, name: "Omar Saris", amount: "35469 $" },
        { id: 4, name: "Marley Septimus", amount: "35469 $" },
        { id: 5, name: "Talan Donin", amount: "35469 $" },
        { id: 6, name: "Cheyenne Kenter", amount: "35469 $" },
        { id: 7, name: "Tiana Baptista", amount: "35469 $" },
    ];

    return (
        <div
            className="bg-cover bg-center bg-no-repeat w-full relative"
            style={{ backgroundImage: `url('/src/assets/profile/Rank.png')` }}
        >
            <div className=" max-w-[1320px] mx-auto pt-28 flex flex-col items-center justify-center relative">
                {/* Heading Section */}
                <div className="text-center text-white">
                    <h1 className="heading font-bold mb-4">
                        Your Gateway to Exclusive Benefits!
                    </h1>
                    <p className="text-sm md:text-lg text-gray-300 max-w-[630px]">
                        Create and customize your profile to unlock personalized offers, track
                        your activities, and enjoy seamless access to all our services.access to all our services.
                    </p>
                </div>
                <div className="bg-[#F38122] w-full rounded-xl p-[30px] flex items-center justify-between relative shadow-lg mt-40">
                    <div className="absolute -top-[108px] left-1/2 transform -translate-x-1/2">
                        <div className="rounded-full  overflow-hidden w-[200px] h-[200px]">
                            <img
                                src="/src/assets/profile/Profile.png"
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute bottom-0 right-0 rounded-full flex items-center justify-center">
                            <img src="/src/assets/profile/verified.svg" alt="img.png" className='w-14 h-14' />
                        </div>
                    </div>
                    <div className="text-white flex-1 text-left ml-5">
                        <p className="text-lg font-semibold">Rank : 1245</p>
                    </div>
                    <div className="text-white flex-1 text-right mr-5">
                        <p className="text-lg font-semibold">Level : 12</p>
                    </div>
                </div>
                <div className="mt-5 text-white ml-auto">
                    <p className="font-bold">Name : Ashiqur Rahman</p>
                    <p>ID : 4612316</p>
                </div>
                <div className="flex flex-wrap justify-between gap-5 mt-10 mb-20 w-full">
                    <div className="bg-[#78120D] text-white p-3 shadow-md w-64 rounded-[12px]">
                        <p className="text-lg font-bold text-[#B0B0B0]">Profit</p>
                        <p className="text-sm">4684654564</p>
                    </div>
                    <p className='text-[#F38122] hidden xl:flex items-center'>------------------------------------</p>


                    <Link to="/team">
                        <div className="w-64 p-3 bg-[#78120D] text-white shadow-md rounded-[12px] cursor-pointer">
                            <p className="text-[#B0B0B0] text-lg font-bold">Team friends</p>
                            <p className="text-sm">564</p>
                        </div>
                    </Link>
                    <p className='text-[#F38122] hidden xl:flex items-center'>------------------------------------</p>
                    <Link to="/axisPoint">
                    <div className="bg-[#78120D] text-white  p-3 shadow-md w-64 rounded-[12px]">
                        <p className="text-lg font-bold text-[#B0B0B0]">Axis Point</p>
                        <p className="text-sm">06</p>
                    </div>
                    </Link>
                </div>
            </div>

            <div className=" pt-14 md:pt-[80px] lg:pt-[100px] xl:pt-[120px] flex flex-col lg:flex-row w-full gap-6">
                <div className="w-full lg:w-1/2 bg-[rgba(120,18,13,0.3)] max-w-[480px]  h-[650px] rounded-[20px]">
                    <div className="flex justify-between items-center text-white p-5 ">
                        <h2 className="text-lg font-semibold">Personal Statistics</h2>
                        <button className="bg-[#F6170C] text-white text-sm px-4 py-2 rounded flex items-center">
                            Today
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                className="w-4 h-4 ml-1"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>
                    </div>
                    <p className="text-sm text-white mb-6 px-5">Personal Statistics</p>
                    <div
                        className="flex flex-col items-center justify-center  space-y-8"
                        style={{ padding: "20px" }}
                    >
                        {/* Radial Progress Bars */}
                        <div className="space-y-4">
                            <Progress
                                type="circle"
                                percent={salaryPercent}
                                strokeColor="#FF4D4F"
                                format={() => `${salaryPercent}%`}
                            />
                            <Progress
                                type="circle"
                                percent={taskPercent}
                                strokeColor="#FFA940"
                                format={() => `${taskPercent}%`}
                            />
                            <Progress
                                type="circle"
                                percent={skillPercent}
                                strokeColor="#FFC53D"
                                format={() => `${skillPercent}%`}
                            />
                        </div>

                        {/* Linear Progress Bars with Sliders */}
                        <Space direction="vertical" size="large" className="w-full">
                            <div className="w-80">
                                <p>Salary</p>
                                {/* <Progress percent={salaryPercent} type="line" strokeColor="#FF4D4F" /> */}
                                <Slider
                                    value={salaryPercent}
                                    onChange={(value) => setSalaryPercent(value)}
                                    min={0}
                                    max={100}
                                    trackStyle={{ backgroundColor: "#FF4D4F" }}
                                    handleStyle={{ borderColor: "#FF4D4F" }}
                                />
                            </div>
                            <div className="w-80 -mt-6">
                                <p>Task Plan</p>
                                {/* <Progress percent={taskPercent} type="line" strokeColor="#FFA940" /> */}
                                <Slider
                                    value={taskPercent}
                                    onChange={(value) => setTaskPercent(value)}
                                    min={0}
                                    max={100}
                                    trackStyle={{ backgroundColor: "#FFA940" }}
                                    handleStyle={{ borderColor: "#FFA940" }}
                                />
                            </div>
                            <div className="w-80 -mt-6">
                                <p>Skill Plan</p>
                                {/* <Progress percent={skillPercent} type="line" strokeColor="#FFC53D" /> */}
                                <Slider
                                    value={skillPercent}
                                    className='!h-12'
                                    onChange={(value) => setSkillPercent(value)}
                                    min={0}
                                    max={100}
                                    trackStyle={{ backgroundColor: "#FFC53D" }}
                                    handleStyle={{ borderColor: "#FFC53D" }}
                                />
                            </div>
                        </Space>
                    </div>



                    {/* <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl  font-extrabold font-roboto text-white mb-4 mt-10">Leaderbord Spotlight: Highest <br /> <span className="text-transparent bg-clip-text bg-[linear-gradient(90deg,#3F3FDE_0.07%,#FF0DEF_32.88%)]">Earners</span> This Month!</h1> */}

                </div>

                <div className="w-full lg:w-1/2 absolute bottom-0 right-0 lg:pl-20 ">
                    <div className="bg-[#F6170C] p-12  rounded-tl-[60px] max-w-[710px] shadow-lg mx-auto border-[1px] border-[#F5F8FC] -mr-0 relative">
                        {data.map((item) => (
                            <div
                                key={item.id}
                                className="flex justify-between items-center bg-[rgba(255,255,255,0.20)]  p-3 mb-3 rounded-lg shadow-inner"
                            >
                                <div className="flex  items-center">
                                    <p className="text-white font-bold  w-8 flex items-center justify-center mr-4 border-r-4 border-white ">
                                        {item.id} <span className="border-r-4 border-white "></span>
                                    </p>
                                    <p className="text-white font-medium">{item.name}</p>
                                </div>
                                <p className="text-white font-semibold">{item.amount}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Profile;