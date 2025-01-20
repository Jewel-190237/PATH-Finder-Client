
import {  useEffect, useState } from "react";
import { MdOutlineMan, MdPlayCircleOutline } from "react-icons/md";

const VideoCourse = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null); // For modal video

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch("http://localhost:5000/courses");
                if (!response.ok) {
                    throw new Error("Failed to fetch courses");
                }
                const data = await response.json();
                setCourses(data);
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };

        fetchCourses();
    }, []);
 
  console.log("all course 123", courses)



  const handleCardClick = (videoUrl) => {
    console.log("Selected Video URL:", videoUrl);
    setSelectedVideo(videoUrl); // Show the modal with the selected video
  };


  const closeModal = () => {
    setSelectedVideo(null); // Close the modal
  };

  const rating = 5;
  const enrolled = 10;

  return (
    <div className="p-5 md:p-10 lg:p-12 xl:p-14 text-black">
        h3fjrgtjbgnhk
      {loading ? (
        <p>Loading courses...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {courses?.map((course) => (
            <div
              key={course?._id}
              className="rounded-3xl overflow-hidden w-full transform transition-transform hover:scale-105 shadow-[0px_4px_10px_0px_rgba(220,220,220,0.20)]"
            >
              {/* Thumbnail Image */}
              <div className="relative">
                <img
                  src={course?.thumbnail_image || "/src/assets/explorePics/3.png"}
                  alt={course?.course_name}
                  className="w-full h-48 object-cover"
                />
                {/* Video Icon */}
                <div
                  onClick={() => handleCardClick(course?.video)}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-50 cursor-pointer"
                >
                  <MdPlayCircleOutline size={50} className="text-white" />
                </div>
              </div>
              {/* Course Details */}
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

      {/* Video Modal */}
      {selectedVideo && (
  <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
    <div className="relative bg-white rounded-lg overflow-hidden w-[90%] md:w-[70%] lg:w-[50%]">
      <button
        onClick={closeModal}
        className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-2 py-1 hover:bg-red-600"
      >
        Close
      </button>
      <div className="aspect-w-16 aspect-h-9">
        <iframe
          src={selectedVideo.replace("watch?v=", "embed/")}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-[400px]"
        ></iframe>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default VideoCourse;
