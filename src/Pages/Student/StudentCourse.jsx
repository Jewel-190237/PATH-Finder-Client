import { useEffect, useState } from "react";
import GetUser from "../../Backend/GetUser";
import { MdOutlineMan, MdPlayCircleOutline } from "react-icons/md";

const StudentCourse = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null); 
  const user = GetUser();

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);


  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/courses/student/${currentUser?._id}`
      );
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

  const handleCardClick = (videoUrl) => {
    console.log("Selected Video URL:", videoUrl);
    setSelectedVideo(videoUrl); 
  };

  const closeModal = () => {
    setSelectedVideo(null); 
  };

  return (
    <div className="p-5 md:p-10 lg:p-12 xl:p-14 text-white">
      {loading ? (
        <p>Loading courses...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-2 lg:gap-3 xl:gap-4">
          {courses?.map((course) => (
            <div
              key={course?._id}
              className="rounded-xl overflow-hidden w-full transform transition-transform hover:scale-105 shadow-[0px_4px_10px_0px_rgba(220,220,220,0.20)]"
            >
              <div className="relative">
                <img
                  src={course?.thumbnail_image || "/src/assets/explorePics/3.png"}
                  alt={course?.course_name}
                  className="w-full h-20 object-cover"
                />
                <div
                  onClick={() => handleCardClick(course?.video)}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-50 cursor-pointer"
                >
                  <MdPlayCircleOutline size={50} className="text-white" />
                </div>
              </div>
              <div className="px-4 py-2 text-center bg-[#20010D]">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-bold text-white">
                    {course?.course_name}
                  </h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg overflow-hidden w-[90%] md:w-[70%] lg:w-[50%]">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-2 py-1 hover:bg-red-600"
            >
              Close
            </button>
            <iframe src={selectedVideo} width="800px" height="600px" allow="autoplay">
            </iframe>
          </div>
        </div>
      )}

    </div>

  );
};

export default StudentCourse;