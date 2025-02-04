import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import GetUser from "../../../Backend/GetUser";
import { div } from "framer-motion/client";

const CourseDetails = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const user = GetUser();
  useEffect(() => {
    setCurrentUser(user);
  }, [user]);
  const { id } = useParams();
  let discount = 0;
  const [course, setCourse] = useState(null);
  const [offer, setOffer] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`http://localhost:5000/courses/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch course details");
        }
        const data = await response.json();
        setCourse(data);
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };

    fetchCourse();
  }, [id]);

  // fetch offer
  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const response = await fetch(`http://localhost:5000/offer`);
        if (!response.ok) {
          throw new Error("Failed to fetch offer");
        }
        const data = await response.json();
        setOffer(data);
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };

    fetchOffer();
  }, []);

  discount = offer?.find(
    (offerPrice) => offerPrice?.phone === currentUser?.phone
  );

  let finalPrice = course?.course_price;
  if (discount) {
    finalPrice = course?.course_price - course?.course_price * 0.1;
  } else {
    finalPrice = course?.course_price;
  }

  console.log("final price", finalPrice);
  const handlePayment = async () => {
    if (currentUser) {
      try {
        const { data } = await axios.post(
          "http://localhost:5000/api/bkash/payment/create",
          {
            amount: finalPrice || course?.course_price,
            userId: currentUser?._id,
            courseId: course?._id,
            subAdminId: currentUser?.subAdmin,
            revenue: (course?.course_price * course?.course_discount) / 100,
          },
          { withCredentials: true }
        );
        window.location.href = data.bkashURL;
      } catch (error) {
        console.log(error.response?.data || "Error occurred");
      }
    } else {
      window.location.href = "/login";
    }
  };

  if (!course) {
    return <p>Loading...</p>;
  }

  return (
    <div
      className="bg-cover bg-center relative text-white min-h-screen"
      style={{ backgroundImage: 'url("/src/assets/explorePics/bg.png")' }}
    >
      <div className="path-container py-20 rounded-lg shadow-lg ">
        {/* Course Image */}
        <div className="flex flex-col sm:flex-row gap-4 md:gap-4 lg:gap-6 p-6 md:p-7 lg:p-8 xl:p-10 bg-[#20010D] rounded-2xl ">
          <div className="w-full  md:w-1/2  rounded-2xl">
            <img
              src={
                course.thumbnail_image ||
                "/src/assets/explorePics/placeholder.png"
              }
              alt={course.course_name}
              className="w-full h-[250px] sm:h-96 object-fill rounded-lg"
            />
          </div>

          {/* Course Name and Details */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <div className="mt-6">
              <h1 className="text-3xl font-bold">
                Course Name: {course?.course_name}
              </h1>
              <div className="">
                {discount ? (
                  <div className="flex items-center justify-between">
                    <p className="mt-4 text-base text-yellow-500">
                      <del>Regular Price: ${course?.course_price}</del>
                    </p>
                    <p className="mt-4 text-base text-yellow-500">
                      Offer Price: $
                      {course?.course_price - course?.course_price * 0.1}
                    </p>
                  </div>
                ) : (
                  <p className="mt-4 text-base text-yellow-500">
                    Price: ${course?.course_price}
                  </p>
                )}
              </div>
              <p className="mt-4 md:mt-5 lg:mt-6 text-lg text-[#B0B0B0] leading-relaxed">
                Course Description:{" "}
                {course?.description ||
                  "No description available for this course."}
              </p>
            </div>

            {/* Buy It Button */}
            <div className="mt-16 flex justify-end items-end">
              <button
                className="px-8 py-3 bg-[#3F3FDE] text-black text-lg font-semibold rounded-lg hover:bg-yellow-600 transition-all duration-200"
                onClick={handlePayment}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
