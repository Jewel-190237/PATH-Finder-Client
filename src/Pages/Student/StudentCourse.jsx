import React, { useEffect, useState } from "react";
import GetUser from "../../Backend/GetUser";
import { MdOutlineMan } from "react-icons/md";

const StudentCourse = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const user = GetUser();

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/courses/student/${currentUser?._id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchCourses();
    }
  }, [currentUser]);

  const rating = 5;
  const enrolled = 10;

  return (
    <div className="p-5 md:p-10 lg:p-12 xl:p-14 text-white">
      {loading ? (
        <p>Loading courses...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {courses?.map((course) => (
            <div
              key={course?._id}
              onClick={() => handleCardClick(course?._id)}
              className="rounded-3xl overflow-hidden w-full transform transition-transform hover:scale-105 shadow-[0px_4px_10px_0px_rgba(220,220,220,0.20)]"
            >
              <img
                src={course?.thumbnail_image || "/src/assets/explorePics/3.png"}
                alt={course?.course_name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 text-center bg-[#20010D]">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-bold text-white">
                    {course?.course_name}
                  </h2>
                  {course?.isOnOffer ? (
                    <div>
                      <p className="text-lg font-bold text-red-500 line-through">
                        $ {course?.course_price}
                      </p>
                      <p className="text-lg font-bold text-green-500">
                        $ {course?.offerPrice}
                      </p>
                    </div>
                  ) : (
                    <p className="text-lg font-bold text-white">
                      $ {course?.course_price}
                    </p>
                  )}
                </div>
                {course?.isOnOffer && (
                  <p className="text-sm text-yellow-400 mt-1">
                    Save {course?.discountPercentage}%!
                  </p>
                )}
                <div className="flex mt-4 justify-between">
                  <p className="text-sm flex text-[#B0B0B0]">
                    <span className="text-xl">
                      <MdOutlineMan />
                    </span>{" "}
                    {enrolled}
                  </p>
                  <p className="text-yellow-500">⭐ {rating}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentCourse;
