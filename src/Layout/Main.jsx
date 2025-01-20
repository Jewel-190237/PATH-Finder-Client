import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared-file/Navbar/Navbar";
import CommonNav from "../Pages/Shared-file/commonNav/commonNav";
import { Modal } from "antd";
import "antd/dist/reset.css";
import GetUser from "../Backend/GetUser";
import CommonNavWithoutUser from "../Pages/Shared-file/commonNav/commonNavWithoutUser";

const Main = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const user = GetUser();
  useEffect(() => {
    setCurrentUser(user);
  }, [user]);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
