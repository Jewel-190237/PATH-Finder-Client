

const Banner = () => {
  return (
    <div className="relative h-[982px] -mt-2 mb-20 " >
      {/* Background Image */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: "url('/src/assets/banner/bg.png')",
        }}

      ></div>

      {/* Video Section */}
      <div className="relative max-w-[1320px]  pb-10 mx-auto h-full flex items-center justify-center">
        <video
          className="max-w-[1320px] h-[720px] rounded-lg shadow-lg"
          poster="/src/assets/banner/poster.png"
          controls
        >
          <source src="/path-to-your-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 w-full   bg-[#2307134D] text-white p-10 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold">Experience Unmatched Convenience <br /> with Our Services!</h2>
        <p className="text-sm mt-4">
        Enjoy premium features, secure exchanges, and  seamless <br /> recharges with unmatched quality and value!
        </p>
      </div>
      </div>

      {/* Shadowed Section */}

    </div>
   
  );
};

export default Banner;

