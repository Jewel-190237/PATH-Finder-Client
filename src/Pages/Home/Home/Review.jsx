import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Mousewheel, Pagination, } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import reviewBg from "../../../assets/reviewBg.png";
import review1 from "../../../assets/review1.png";
import mem1 from "../../../assets/mem1.png";
import mem2 from "../../../assets/mem2.png";
import mem3 from "../../../assets/mem3.png";
import ReviewCard from "../../Shared-file/card/ReviewCard";

const Review = () => {
  const reviewData = [
    {
      image: review1,
      name: "John Markot",
      rating: 4.5,
      description:
        "Incredible work! The final video exceeded our expectations, and the process was seamless..",
    },
    {
      image: mem1,
      name: "Melinium Nakari",
      rating: 4.5,
      description:
        "Incredible work! The final video exceeded our expectations, and the process was seamless..",
    },
    {
      image: mem2,
      name: "Mararas Kumari",
      rating: 4.5,
      description:
        "Incredible work! The final video exceeded our expectations, and the process was seamless..",
    },
    {
      image: mem3,
      name: "Markol Devid",
      rating: 4.5,
      description:
        "Incredible work! The final video exceeded our expectations, and the process was seamless..",
    },
    {
      image: review1,
      name: "Alaskan Fore",
      rating: 4.5,
      description:
        "Incredible work! The final video exceeded our expectations, and the process was seamless..",
    },
    {
      image: mem1,
      name: "Medium Sheti",
      rating: 4.5,
      description:
        "Incredible work! The final video exceeded our expectations, and the process was seamless..",
    },
    {
      image: mem2,
      name: "Himalaya Nodni",
      rating: 4.5,
      description:
        "Incredible work! The final video exceeded our expectations, and the process was seamless.",
    },
    {
      image: mem3,
      name: "Bhutan Gouri",
      rating: 4.5,
      description:
        "Incredible work! The final video exceeded our expectations, and the process was seamless.",
    },
  ];
  return (
    <div
      className="bg-cover bg-center relative text-white"
      style={{ backgroundImage: `url(${reviewBg})` }}
    >
      <div className="path-container py-14 md:py-20 lg:py-[100px] xl:py-[120px]">
        <h1 className="heading text-left">Hear from Our Happy Clients</h1>
        <p className="description mt-2 md:mt-3 lg:mt-4">
          Trusted by hundreds, loved by all—here’s{" "}
          <br className="hidden md:block" /> what they have to share.
        </p>
        <div className="mt-6 md:mt-10 lg:mt-12 xl:mt-[60px] review">
          <Swiper
            spaceBetween={20}
            breakpoints={{
              0: { slidesPerView: 2, spaceBetween: 4 },
              640: { slidesPerView: 3, spaceBetween: 8 },
              768: { slidesPerView: 3, spaceBetween: 10 },
              1024: { slidesPerView: 3, spaceBetween: 16 },
              1280: { slidesPerView: 4, spaceBetween: 20 },
            }}
            pagination={{ clickable: true }}
            keyboard={{ enabled: true }}
            modules={[ Keyboard, Pagination, Mousewheel]}
            className="my-8"
          >
            {reviewData.map((item, index) => (
              <SwiperSlide key={index}>
                <ReviewCard
                  image={item.image}
                  name={item.name}
                  rating={item.rating}
                  description={item.description}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Review;
