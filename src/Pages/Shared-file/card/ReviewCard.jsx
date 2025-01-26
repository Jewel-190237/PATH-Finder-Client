import content from "../../../assets/content.png";
import content1 from "../../../assets/content1.png";
import { Rate } from "antd";

const ReviewCard = ({ image, name, rating, description }) => {
  return (
    <div className="relative group">
      {/* Card Image */}
      <img className="w-full" src={image} alt="" />

      {/* Initial Content */}
      <div className="group-hover:hidden relative">
        <img className="-mt-1 w-full" src={content} alt="" />
        <div className="absolute inset-0 p-3 xl:p-4 text-white">
          <h2 className="heading2">{name}</h2>
          <div className="description mt-2 xl:mt-3 flex items-center gap-2">
            <p className="-mb-[6px]">4.9</p>
            <Rate
              disabled
              count={5}
              className="text-[#F5A714] "
              defaultValue={rating}
            />
          </div>
        </div>
      </div>

      {/* Hover Content */}
      <div
        className="absolute  md:-bottom-[120px] lg:-bottom-[110px] xl:-bottom-[120px] w-full opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-1000 ease-in-out"
      >
        <div
          className="bg-cover w-full object-fill bg-center relative text-white"
          style={{ backgroundImage: `url(${content1})` }}
        >
          <div className="p-3 xl:p-4 text-white w-full px-6">
            <h2 className="heading2">{name}</h2>
            <div className="description mt-2 xl:mt-3 flex items-center gap-2">
              <p className="mb-[6px]">4.9</p>
              <Rate
                disabled
                count={5}
                className="text-[#F5A714] "
                defaultValue={rating}
              />
            </div>
            <p className="description mt-2 xl:mt-3 pb-3">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ReviewCard;
