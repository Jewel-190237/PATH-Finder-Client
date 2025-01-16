import { message } from "antd";
import { useEffect, useState } from "react";
import { MdOutlineMan } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const ExplorePics = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchCourses = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:5000/courses");
            if (!response.ok) {
                throw new Error("Failed to fetch courses");
            }
            const data = await response.json();
            setCourses(data);
        } catch (error) {
            message.error("Failed to fetch courses.");
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
    const enrolled = 10;

    return (
        <div className="bg-cover bg-center relative text-white -mt-20" style={{ backgroundImage: 'url("/src/assets/explorePics/bg.png")' }}>
            <div className="max-w-[1320px] mx-auto py-14 md:py-20 lg:py-[100px] xl:py-[120px]">
                <h1 className="text-4xl font-bold text-left">
                    Explore Our Top Picks Just<br /> for You!
                </h1>
                <p className="text-lg mt-2 md:mt-3 lg:mt-4 text-left">
                    Trusted by hundreds, loved by all—here’s {" "}
                    <br className="hidden md:block" /> what they have to share.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                    {courses.slice(0, 3).map((course) => (
                        <div
                            key={course?._id}
                            onClick={() => handleCardClick(course?._id)}
                            className="rounded-3xl overflow-hidden w-full transform transition-transform hover:scale-105 shadow-[0px_4px_10px_0px_rgba(220,220,220,0.20)]"
                        >
                            <img
                                src={course?.thumbnail_image || '/src/assets/explorePics/3.png'}
                                alt={course?.course_name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4 text-center bg-[#20010D]">
                                <div className="flex justify-between">
                                    <h2 className="text-lg font-bold text-white">{course?.course_name}</h2>
                                    <p className="text-lg font-bold text-white">$ {course?.course_price}</p>
                                </div>
                                <div className="flex mt-4 justify-between">
                                    <p className="text-sm flex text-[#B0B0B0]">
                                        <span className="text-xl"><MdOutlineMan /></span> {enrolled}
                                    </p>
                                    <p className="text-yellow-500">⭐ {rating}</p>
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
