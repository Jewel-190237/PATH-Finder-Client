import { useEffect, useState } from "react";
import { MdOutlineMan } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import bgImage from "../../../assets/explorePics/bg.png"
const Courses = () => {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch("https://api3.pathxfinder.com/courses");
                const data = await response.json();
                setCourses(data);
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };

        fetchCourses();
    }, []);
    const rating = 5;
    const enrolled = 10;

    const handleCardClick = (courseId) => {
        navigate(`/course/${courseId}`);
    };


    return (
        <div className="bg-cover bg-center pb-28 pt-10 relative text-white" style={{ backgroundImage: `url(${bgImage})` }}>
            <div className="path-container py-14 ">
                <h1 className="text-4xl font-bold text-center mb-8">Roadmap To Job</h1>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:gap-6 lg:gap-5 md:gap-4 sm:gap-3 gap-2" >
                    {courses.map((course) => (
                        <div
                            onClick={() => handleCardClick(course?._id)}
                            key={course.id}
                            className="rounded-lg sm:rounded-xl md:rounded-xl lg:rounded-2xl xl:rounded-3xl overflow-hidden w-full transform transition-transform hover:scale-105 shadow-[0px_4px_10px_0px_rgba(220,220,220,0.20)] cursor-pointer"
                        >
                            <img
                                src={course?.thumbnail_image || '/src/assets/explorePics/3.png'}
                                alt={course?.course_name}
                                className="w-full h-28 sm:h-32 md:h-40 lg:h-52 xl:w-full xl:h-64 object-fill"
                            />
                            <div className="lg:p-4 md:p-3 p-2 text-center bg-[#20010D]">
                                <div className="flex justify-between">
                                    <h2 className="heading2 text-white">{course?.course_name}</h2>
                                    <p className="heading2 text-white">$ {course?.course_price}</p>
                                </div>
                                <div className="flex lg:mt-4 md:mt-3 justify-between">
                                    <p className="text-sm flex text-[#B0B0B0]">
                                        <span className="text-xl"><MdOutlineMan /></span> {enrolled}
                                    </p>
                                    <p className="text-yellow-500">⭐{rating}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Courses;
