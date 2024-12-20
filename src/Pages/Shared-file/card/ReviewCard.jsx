import React from "react";
import content from "../../../assets/content.png";
import { Rate } from "antd";

const ReviewCard = ({image, name, rating}) => {
  return (
    <div className="relative">
      <img src={image} alt="" />
      <div className="relative">
        <img className="-mt-1" src={content} alt="" />
        <div className="absolute inset-0 p-3 xl:p-4 text-white">
          <h2 className="heading2">{name}</h2>
          <div className="description mt-2 xl:mt-3 flex items-center gap-2">
            <p>4.9</p>
            <Rate
              disabled
              count={5}
              className="text-[#F5A714] "
              defaultValue={rating}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
