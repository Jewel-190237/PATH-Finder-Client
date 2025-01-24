//@ts-nocheck
import React, { useEffect, useState } from "react";
import planImage from "../../assets/plan/plan.png";
import { FiBookOpen } from "react-icons/fi";
import { FaC } from "react-icons/fa6";
import { FaJava, FaPython } from "react-icons/fa";
import { TbBrandJavascript, TbWorldWww } from "react-icons/tb";
import { Form, Input, message, Modal } from "antd";
import GetUser from "../../Backend/GetUser";

const Aspire = () => {
  const data = [
    { title: "All", number: <FiBookOpen /> },
    { title: "Python", number: <FaPython /> },
    { title: "Web", number: <TbWorldWww /> },
    { title: "Java", number: <FaJava /> },
    { title: "C", number: <FaC /> },
    { title: "JavaScript", number: <TbBrandJavascript /> },
  ];
  const [active, setActive] = React.useState(data[0]);

  const [selectedUserShow, setSelectedUserShow] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [showModalOpen, setShowModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [currentUser, setCurrentUser] = useState(null);
  const [projects, setProjects] = useState([]);
  console.log("🚀 ~ Aspire ~ projects:", projects);

  const user = GetUser();
  useEffect(() => {
    setCurrentUser(user);
    fetchProjects();
  }, [user]);
  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/projects/${currentUser?._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        setProjects(result.projects || []);
      } else {
        console.error("Failed to fetch projects");
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const showAddModal = () => {
    setAddModalOpen(true);
  };

  const handleAddOk = () => {
    setAddModalOpen(false);
  };

  //show Modal
  const showModal = (user) => {
    setSelectedUserShow(user);
    setShowModalOpen(true);
  };

  const handleOk = () => {
    setShowModalOpen(false);
    setSelectedUserShow(null);
  };

  const onFinish = async (values) => {
    const data = {
      userId: currentUser._id,
      ProjectName: values.ProjectName,
      problem: values.problem,
      idea: values.idea,
      solve: values.solve,
      userName: currentUser.name,
    };
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/add-new-project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        message.success("Project added successfully");
        fetchProjects();
        setAddModalOpen(false);
        form.resetFields();
      } else {
        message.error("Error adding Project");
        console.error("Error adding Project");
      }
    } catch (error) {
      message.error("Error adding Project");
      console.error("Error adding Project:", error);
    }
  };

  return (
    <div
      className="bg-cover bg-center relative pb-16 md:pb-20 lg:pb-24 xl:pb-32"
      style={{ backgroundImage: `url(${planImage})` }}
    >
      <div className="path-container pt-14 md:pt-[80px] lg:pt-[100px] xl:pt-[120px] h-screen">
        <h1 className="heading text-white text-center">My Projects</h1>
        <div className="mt-8 md:mt-10 lg:mt-12 xl:mt-[60px] text-white grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 md:gap-4 lg:gap-5 xl:gap-6">
          {data.map((item, index) => (
            <button
              key={index}
              onClick={() => setActive(item)}
              className={`rounded-[4px] p-2 flex items-center gap-3 ${
                active.title === item.title ? "bg-blue-500" : "bg-[#2D2D2D]"
              }`}
            >
              <p className="description">{item.number}</p>
              <p className="description">{item.title}</p>
            </button>
          ))}
        </div>
        {/* all projects */}
        <div className="mt-8 md:mt-10 lg:mt-12 xl:mt-[60px] text-white grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 lg:gap-5 xl:gap-6">
          {projects?.map((item, index) => (
            <div
              key={index}
              className="bg-[#78120D] p-8 rounded-lg shadow-lg text-center hover:bg-red-900 transition duration-300"
            >
              <h3 className="heading2 mb-2">{item?.ProjectName}</h3>
              <p className="description">{item?.problem}</p>
              <button
                onClick={() => showModal(item)}
                className="course-button !bg-red-500 mt-4"
              >
                Details
              </button>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-end mt-10">
          <button onClick={showAddModal} className="common-button rounded-lg">
            Create New Project
          </button>
        </div>
      </div>

      {/* Add modal */}
      <Modal
        visible={addModalOpen}
        onOk={handleAddOk}
        onCancel={() => setAddModalOpen(false)}
        footer={null}
        className="custom-modal"
        bodyStyle={{
          backgroundColor: "#78120D",
          color: "white",
        }}
      >
        <div>
          <h2 className="heading2 mb-4 text-center">Add Task</h2>
          <div
            className="max-w-[1000px] task-form rounded-[16px] mx-auto my-4 md:my-8"
            style={{ backdropFilter: "blur(30px)" }}
          >
            <Form
              layout="vertical"
              className="space-y-4 p-4"
              onFinish={onFinish}
              form={form}
            >
              <Form.Item
                label="Project Name Name:"
                name="ProjectName"
                required
                className="text-white"
              >
                <Input
                  placeholder="Input Project Name"
                  type="text"
                  className="p-2 md:p-3 lg:p-4 xl:p-5 bg-[#78120D] text-white border description focus:bg-[#78120D] hover:bg-[#78120D] focus:border-white hover:border-white placeholder-white"
                />
              </Form.Item>

              <Form.Item
                label="Real Life Problem:"
                name="problem"
                required
                className="text-white"
              >
                <Input.TextArea
                  placeholder="Input Real Life Problem"
                  type="text"
                  className="p-2 md:p-3 lg:p-4 xl:p-5 bg-[#78120D] text-white border description focus:bg-[#78120D] hover:bg-[#78120D] focus:border-white hover:border-white placeholder-white"
                />
              </Form.Item>
              <Form.Item
                label="Real Life solution:"
                name="solve"
                required
                className="text-white"
              >
                <Input.TextArea
                  placeholder="Input Real Life Solution"
                  type="text"
                  className="p-2 md:p-3 lg:p-4 xl:p-5 bg-[#78120D] text-white border description focus:bg-[#78120D] hover:bg-[#78120D] focus:border-white hover:border-white placeholder-white"
                />
              </Form.Item>
              <Form.Item
                label="Solution Idea:"
                name="idea"
                required
                className="text-white"
              >
                <Input.TextArea
                  placeholder="Input Solution Idea"
                  type="text"
                  className="p-2 md:p-3 lg:p-4 xl:p-5 bg-[#78120D] text-white border description focus:bg-[#78120D] hover:bg-[#78120D] focus:border-white hover:border-white placeholder-white"
                />
              </Form.Item>

              <button
                type="submit"
                className="common-button w-full !mt-10 !rounded-md"
              >
                Submit
              </button>
            </Form>
          </div>
        </div>
      </Modal>

      {/* show modal */}
      <Modal
        visible={showModalOpen}
        onOk={handleOk}
        onCancel={() => {
          setShowModalOpen(false);
          setSelectedUserShow(null);
        }}
        footer={null}
        className="custom-modal"
        bodyStyle={{
          backgroundColor: "#78120D",
          color: "white",
        }}
      >
        <div>
          <h2 className="heading2 mb-4 text-center">
            {selectedUserShow?.ProjectName}
          </h2>
          <div
            className="max-w-[1000px] task-form rounded-[16px] mx-auto my-4 md:my-8"
            style={{ backdropFilter: "blur(30px)" }}
          >
            <div className="px-4">
              <div>
                <h3 className="description">Real Life Problem:</h3>
                <p className="description bg-[#78120D] px-3 pb-3 rounded-md border-b">
                  {selectedUserShow?.problem ||
                    "No problem description available."}
                </p>
              </div>
              <div>
                <h3 className="description ">Solution Idea:</h3>
                <p className="description bg-[#78120D] px-3 pb-3 rounded-md border-b">
                  {selectedUserShow?.idea || "No solution idea provided."}
                </p>
              </div>
              <div>
                <h3 className="description ">Real Life Solution:</h3>
                <p className="description bg-[#78120D] px-3 pb-3 rounded-md border-b">
                  {selectedUserShow?.solve || "No solution described."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Aspire;
