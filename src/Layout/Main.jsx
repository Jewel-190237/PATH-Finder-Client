import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared-file/Navbar/Navbar";
import CommonNav from "../Pages/Shared-file/commonNav/commonNav";
import CommonNavWithoutUser from "../Pages/Shared-file/commonNav/commonNavWithoutUser";
import { Modal } from "antd";
import "antd/dist/reset.css";
import useGetUser from "../Backend/GetUser";
import { updateVisitCount } from "../Backend/VisitCount";

const Main = () => {
  const currentUser = useGetUser(); // Get current user from custom hook
  const [visitCount, setVisitCount] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchVisitCount = async () => {
      if (currentUser?._id) {
        try {
          const count = await updateVisitCount(currentUser._id);
          setVisitCount(count);
        } catch (err) {
          console.error("Error updating visit count:", err);
        }
      }
    };

    fetchVisitCount();
  }, [currentUser]);

  useEffect(() => {
    const modalShown = sessionStorage.getItem("modalShown");
    if (!modalShown) {
      setIsModalVisible(true);
      sessionStorage.setItem("modalShown", "true");
    }
  }, []);

  const handleClose = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Navbar />
      <Outlet />
      {currentUser ? <CommonNav /> : <CommonNavWithoutUser />}
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
