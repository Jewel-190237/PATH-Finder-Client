import { useEffect, useState } from "react";
import { MdOutlineMan } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch("http://localhost:5000/courses");
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
        <div className="bg-cover bg-center pb-28 pt-10 relative text-white" style={{ backgroundImage: 'url("/src/assets/explorePics/bg.png")' }}>
            <div className="max-w-[1320px] mx-auto py-14 ">
                <h1 className="text-4xl font-bold text-center mb-8">Roadmap To Job</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 " >
                    {courses.map((course) => (
                        <div
                            onClick={() => handleCardClick(course?._id)}
                            key={course.id}
                            className="rounded-3xl overflow-hidden w-full transform transition-transform hover:scale-105 shadow-[0px_4px_10px_0px_rgba(220,220,220,0.20)] cursor-pointer"
                        >
                            <img
                                src={course?.thumbnail_image || '/src/assets/explorePics/3.png'}
                                alt={course?.course_name}
                                className="w-full h-64 object-fill"
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
            </div>
        </div>
    );
};

export default Courses;
