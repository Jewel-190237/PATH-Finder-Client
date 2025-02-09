

import { useState } from "react";
import reviewBg from "../../assets/reviewBg.png";
import review1 from "../../assets/review1.png";
import mem1 from "../../assets/mem1.png";
import mem2 from "../../assets/mem2.png";
import mem3 from "../../assets/mem3.png";
import ReviewCard from "../Shared-file/card/ReviewCard";

const Review = () => {
  const reviewsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const reviewData = [
    { image: review1, name: "John Markot", rating: 4.5, description: "Incredible work! The final video exceeded our expectations, and the process was seamless." },
    { image: mem1, name: "Melinium Nakari", rating: 4.5, description: "Incredible work! The final video exceeded our expectations, and the process was seamless." },
    { image: mem2, name: "Mararas Kumari", rating: 4.5, description: "Incredible work! The final video exceeded our expectations, and the process was seamless." },
    { image: mem3, name: "Markol Devid", rating: 4.5, description: "Incredible work! The final video exceeded our expectations, and the process was seamless." },
    { image: review1, name: "Alaskan Fore", rating: 4.5, description: "Incredible work! The final video exceeded our expectations, and the process was seamless." },
    { image: mem1, name: "Medium Sheti", rating: 4.5, description: "Incredible work! The final video exceeded our expectations, and the process was seamless." },
    { image: mem2, name: "Himalaya Nodni", rating: 4.5, description: "Incredible work! The final video exceeded our expectations, and the process was seamless." },
    { image: mem3, name: "Bhutan Gouri", rating: 4.5, description: "Incredible work! The final video exceeded our expectations, and the process was seamless." },
    { image: review1, name: "John Doe", rating: 4.5, description: "Amazing service, highly recommend." },
    { image: mem1, name: "Jane Smith", rating: 5.0, description: "The team did a fantastic job!" },
  ];

  const totalPages = Math.ceil(reviewData.length / reviewsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * reviewsPerPage;
  const currentReviews = reviewData.slice(startIndex, startIndex + reviewsPerPage);

  return (
    <div
      className="bg-cover bg-center relative text-white"
      style={{ backgroundImage: `url(${reviewBg})` }}
    >
      <div className="path-container py-14 md:py-20 lg:py-[100px] xl:py-[120px]">
        <h1 className="heading text-left">Hear from Our Happy Clients</h1>
        <p className="description mt-2 md:mt-3 lg:mt-4">
          Trusted by hundreds, loved by all—here’s <br className="hidden md:block" />
          what they have to share.
        </p>
        <div className="mt-6 md:mt-10 lg:mt-12 xl:mt-[60px] review grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-6 lg:gap-5 md:gap-4 sm:gap-3 gap-2">
          {currentReviews.map((item, index) => (
            <ReviewCard
              key={index}
              image={item.image}
              name={item.name}
              rating={item.rating}
              description={item.description}
            />
          ))}
        </div>

        <div className="flex justify-center mt-8">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`px-4 py-2 mx-1 rounded ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Review;
