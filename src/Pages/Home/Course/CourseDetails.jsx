import axios from "axios";
import React from "react";

const CourseDetails = () => {
  const handlePayment = async () => {
    try {
      // Use the correct server-side base URL
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

  return (
    <div>
      <div className="flex items-center justify-center py-5">
        <button
          onClick={handlePayment}
          className="bg-[#FF4E25] text-white py-2 px-4 rounded"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default CourseDetails;
