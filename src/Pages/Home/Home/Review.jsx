import React from "react";
import reviewBg from "../../../assets/reviewBg.png";
import review1 from "../../../assets/review1.png";
import content from "../../../assets/content.png";
import { Rate } from "antd";
import ReviewCard from "../../Shared-file/card/ReviewCard";

const Review = () => {
  const reviewData = [
    {
      image: review1,
      name: "John Doe",
      rating: 4.5,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, eveniet.",
    },
    {
      image: review1,
      name: "John Doe",
      rating: 4.5,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, eveniet.",
    },
    {
      image: review1,
      name: "John Doe",
      rating: 4.5,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, eveniet.",
    },
    {
      image: review1,
      name: "John Doe",
      rating: 4.5,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, eveniet.",
    },
    {
      image: review1,
      name: "John Doe",
      rating: 4.5,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, eveniet.",
    },
    {
      image: review1,
      name: "John Doe",
      rating: 4.5,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, eveniet.",
    },
    {
      image: review1,
      name: "John Doe",
      rating: 4.5,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, eveniet.",
    },
    {
      image: review1,
      name: "John Doe",
      rating: 4.5,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, eveniet.",
    },
  ];
  return (
    <div
      className="bg-cover bg-center relative text-white"
      style={{ backgroundImage: `url(${reviewBg})` }}
    >
      <div className="max-w-[1320px] mx-auto py-14 md:py-20 lg:py-[100px] xl:py-[120px]">
        <h1 className="heading text-left">Hear from Our Happy Clients</h1>
        <p className="description mt-2 md:mt-3 lg:mt-4">
          Trusted by hundreds, loved by all—here’s{" "}
          <br className="hidden md:block" /> what they have to share.
        </p>
        <div className="mt-6 md:mt-10 lg:mt-12 xl:mt-[60px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {reviewData.map((item, index) => (
              <ReviewCard
                key={index}
                image={item.image}
                name={item.name}
                rating={item.rating}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
