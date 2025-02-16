import { useEffect, useState } from "react";
import { MdOutlineMan } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import bgimage from "../../../assets/explorePics/bg.png"
const ExplorePics = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchCourses = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:5000/courses");
            const data = await response.json();
            setCourses(data);
        } catch (error) {
            console.error("Error fetching courses:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleCardClick = (courseId) => {
        navigate(`/course/${courseId}`);
    };
   

    const rating = 5;
    const enrolled = 107;

    return (
        <div className="bg-cover bg-center relative text-white -mt-40 sm:-mt-20" style={{ backgroundImage: `url(${bgimage})` }}>
            <div className="path-container py-14 md:py-20 lg:py-[100px] xl:py-[120px]">
                <h1 className="text-4xl font-bold text-left">
                স্কিল নাই = কাজ নাই = টাকা নাই 💯
                </h1>
                <p className="text-lg mt-2 md:mt-3 lg:mt-4 text-left">
                    Trusted by hundreds, loved by all—here’s {" "}
                    <br className="hidden md:block" /> what they have to share.
                </p>
                <div className="grid grid-cols-3 xl:gap-6 lg:gap-5 md:gap-4 sm:gap-3 gap-1">
                    {courses?.slice(0, 3).map((course) => (
                        <div
                            key={course?._id}
                            onClick={() => handleCardClick(course?._id)}
                            className="rounded-lg sm:rounded-xl md:rounded-xl lg:rounded-2xl xl:rounded-3xl overflow-hidden w-full transform transition-transform hover:scale-105 shadow-[0px_4px_10px_0px_rgba(220,220,220,0.20)]"
                        >
                            <img
                                src={course?.thumbnail_image || '/src/assets/explorePics/3.png'}
                                alt={course?.course_name}
                                className="w-full h-16 sm:h-32 md:h-40 lg:h-52 xl:w-full xl:h-64 object-fill"
                            />
                            <div className="lg:p-4 md:p-3 p-2 text-center bg-[#20010D]">
                                <div className="flex justify-between">
                                    <h2 className="course-heading text-white">{course?.course_name}</h2>
                                    <p className="course-heading text-white">{course?.course_price}</p>
                                </div>
                                <div className="flex lg:mt-4 md:mt-3 sm:mt-2 justify-between">
                                    <p className="text-sm flex text-[#B0B0B0]">
                                        <span className="description"><MdOutlineMan className="text-[16px] md:text-xl" /></span> {enrolled}
                                    </p>
                                    <p className="text-yellow-500 description">⭐{rating}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-8">
                    <button
                        className="bg-[#3F3FDE] text-white px-6 py-4 rounded-lg transition"
                        onClick={() => navigate("/all-courses")}
                    >
                        Show More
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExplorePics;
