import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Pages/Shared-file/Footer/Footer";
import Navbar from "../Pages/Shared-file/Navbar/Navbar";
import CommonNav from "../Pages/Shared-file/commonNav/commonNav";
import { Modal } from "antd";
import "antd/dist/reset.css"; // Import Ant Design styles

const Main = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    // Check if the modal has already been shown in this session
    const modalShown = sessionStorage.getItem("modalShown");
    if (!modalShown) {
      setIsModalVisible(true); // Show the modal
      sessionStorage.setItem("modalShown", "true"); // Mark it as shown for this tab
    }
  }, []);

  const handleClose = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Navbar />
      <Outlet />
      <div className="mb-10 sm:mb-12 md:mb-16 lg:mb-20 xl:mb-24">
        <Footer />
      </div>
      <CommonNav />

      {/* Video Modal */}
      <Modal
        open={isModalVisible}
        onCancel={handleClose}
        footer={null}
        centered
        width={800}
        className="custom-modal"
      >
        <div className="flex justify-center items-center w-full">
          <iframe
            className="w-full aspect-video rounded-md"
            src="https://www.youtube.com/embed/668nUCeBHyY"
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </Modal>
    </div>
  );
};

export default Main;
