import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
const CourseDetails = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const handlePayment = async () => {
        try {
         
          const { data } = await axios.post(
            "http://localhost:5000/api/bkash/payment/create",
            { amount: 50, userId: "3iu9475hi9045u4" },
            { withCredentials: true } // Allow credentials if needed
          );
          window.location.href = data.bkashURL; // Redirect to bKash payment page
        } catch (error) {
          console.log(error.response?.data || "Error occurred");
        }
      };

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

    if (!course) {
        return <p>Loading...</p>;
    }

    return (
        <div
            className="bg-cover bg-center relative text-white min-h-screen"
            style={{ backgroundImage: 'url("/src/assets/explorePics/bg.png")' }}
        >
            <div className="max-w-[1320px] mx-auto p-6  rounded-lg shadow-lg">
                {/* Course Image */}
                <img
                    src={course.thumbnail_image || '/src/assets/explorePics/placeholder.png'}
                    alt={course.course_name}
                    className="w-full h-64 object-cover rounded-lg"
                />

                {/* Course Name and Details */}
                <div className="mt-6 text-center">
                    <h1 className="text-3xl font-bold">{course.course_name}</h1>
                    <p className="mt-4 text-xl text-yellow-500">Price: ${course.course_price}</p>
                    <p className="mt-6 text-lg text-[#B0B0B0] leading-relaxed">
                        {course.description || "No description available for this course."}
                    </p>
                </div>

                {/* Buy It Button */}
                <div className="mt-8 text-center">
                    <button
                        className="px-8 py-3 bg-[#3F3FDE] text-black text-lg font-semibold rounded-lg hover:bg-yellow-600 transition-all duration-200"
                        onClick={handlePayment}
                    >
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CourseDetails;
