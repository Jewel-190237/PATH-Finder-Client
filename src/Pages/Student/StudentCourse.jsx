import { useEffect, useState } from "react";
import GetUser from "../../Backend/GetUser";
import { MdPlayCircleOutline } from "react-icons/md";

const StudentCourse = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeCourseId, setActiveCourseId] = useState(null);
  const [videoProgress, setVideoProgress] = useState({}); // Store progress per course
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [modalVideoUrl, setModalVideoUrl] = useState(""); // URL for the modal video
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
      initializeVideoProgress(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const initializeVideoProgress = (courses) => {
    const progress = {};
    courses.forEach((course) => {
      progress[course._id] = 0; // Initialize progress to 0
    });
    setVideoProgress(progress);
  };

  useEffect(() => {
    if (currentUser) {
      fetchCourses();
    }
  }, [currentUser]);

  const handleCourseClick = (courseId) => {
    setActiveCourseId((prevId) => (prevId === courseId ? null : courseId));
  };

  const handleVideoCompletion = (courseId) => {
    setVideoProgress((prevProgress) => {
      const nextVideoIndex = prevProgress[courseId] + 1;
      return {
        ...prevProgress,
        [courseId]: nextVideoIndex,
      };
    });
  };
  const handleCourseCompletion = (courseId) => {
    console.log(`Course ${courseId} completed!`);
    alert("Congratulations! You have completed the course 🎉");
    // You can add API calls or state updates here
  };

  const openModal = (videoUrl) => {
    setModalVideoUrl(videoUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalVideoUrl("");
  };

  return (
    <div className="p-5 md:p-10 lg:p-12 xl:p-14 text-white">
      {loading ? (
        <p>Loading courses...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-2 lg:gap-3 xl:gap-4">
          {courses?.map((course) => (
            <div key={course?._id} className="w-full">
              <div
                className="rounded-xl overflow-hidden transform transition-transform hover:scale-105 shadow-md cursor-pointer"
                onClick={() => handleCourseClick(course?._id)}
              >
                <div className="relative">
                  <img
                    src={course?.thumbnail_image || "/src/assets/explorePics/3.png"}
                    alt={course?.course_name}
                    className="w-full h-64 object-fill"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-50">
                    <MdPlayCircleOutline size={50} className="text-white" />
                  </div>
                </div>
                <div className="px-4 py-2 text-center bg-[#20010D]">
                  <h2 className="text-lg font-bold text-white">{course?.course_name}</h2>
                </div>
              </div>

              {activeCourseId === course?._id && (

                <div className="mt-4">
                  {course?.videos?.length > 0 ? (
                    course?.videos.map((video, index) => (
                      <div
                        key={index}
                        className={`bg-[#20010D] rounded-lg overflow-hidden shadow-md mt-4 ${index > videoProgress[course?._id] ? "hidden" : "block"
                          }`}
                      >
                        <div
                          onClick={() => openModal(video)}
                          className="cursor-pointer p-4 bg-gray-700 text-white"
                        >
                          Module {index + 1} (Click to Play)
                        </div>
                        {index === videoProgress[course?._id] && (
                          <div className="p-3 text-center">
                            {index === course.videos.length - 1 ? (
                              <button
                                onClick={() => handleCourseCompletion(course?._id)}
                                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mt-4"
                              >
                                Course Completed 🎉
                              </button>
                            ) : (
                              <button
                                onClick={() => handleVideoCompletion(course?._id)}
                                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg mt-4"
                              >
                                Completed module {index + 1}
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-red-400 mt-4">No videos available.</p>
                  )}
                </div>

              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal for Video */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-white w-[90%] max-w-3xl p-4 rounded-lg">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-black text-2xl"
            >
              X
            </button>
            <iframe
              src={modalVideoUrl.replace("watch?v=", "embed/")}
              title="Video Modal"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-[400px]"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentCourse;
