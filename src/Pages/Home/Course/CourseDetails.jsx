import axios from "axios";
import React from "react";

const CourseDetails = () => {
  const handlePayment = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/bkash/payment/create",
        { amount: 50, orderId: 1 },
        { withCredentials: true }
      );
      window.location.href = data.bkashURL;
    } catch (error) {
      console.log(error.response.data);
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
