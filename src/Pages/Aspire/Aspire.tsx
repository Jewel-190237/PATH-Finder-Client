//@ts-nocheck
import React, { useEffect, useState } from "react";
import planImage from "../../assets/plan/plan.png";
import { FaCodePullRequest } from "react-icons/fa6";
import { FaBorderAll, FaIdeal } from "react-icons/fa";
import { TbBrandJavascript, TbWorldWww } from "react-icons/tb";
import { Empty, Form, Input, message, Modal, Select } from "antd";
import GetUser from "../../Backend/GetUser";
import { GiSkills, GiThink } from "react-icons/gi";
import { SiDavinciresolve } from "react-icons/si";

const Aspire = () => {
  const data = [
    { title: "All", number: <FaBorderAll /> },
    { title: "What IF", number: <FaCodePullRequest /> },
    { title: "Idea", number: <FaIdeal /> },
    { title: "Think", number: <GiThink /> },
    { title: "Problem-Solve", number: <SiDavinciresolve /> },
    { title: "New Skill", number: <GiSkills /> },
  ];
  const [active, setActive] = React.useState(data[0]);

  const [selectedUserShow, setSelectedUserShow] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [showModalOpen, setShowModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [currentUser, setCurrentUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);


  const user = GetUser();
  useEffect(() => {
    setCurrentUser(user);
    fetchProjects();
  }, [user]);
  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://api3.pathxfinder.com/projects/${currentUser?._id}`,
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
        setFilteredProjects(result.projects || []);
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
      category: values.category,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://api3.pathxfinder.com/add-new-project", {
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

  const handleCategoryChange = (category) => {
    setActive(category);
    if (category.title === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter((project) => project.category === category.title));
    }
  };

  return (
    <div
      className="bg-cover bg-center relative pb-16 md:pb-20 lg:pb-24 xl:pb-32"
      style={{ backgroundImage: `url(${planImage})` }}
    >
      <div className="path-container pt-14 md:pt-[80px] lg:pt-[100px] xl:pt-[120px] h-screen">
        <h1 className="heading text-white text-center">My Projects</h1>
        <div className="overflow-x-auto w-full">
          <div className="flex gap-2 md:gap-3 lg:gap-5 xl:gap-6 w-max mt-8 md:mt-10 lg:mt-12 xl:mt-[60px] text-white">
            {data.map((item, index) => (
              <button
                key={index}
                onClick={() => handleCategoryChange(item)}
                className={`min-w-[150px] sm:min-w-[200px] w-full rounded sm:rounded-lg px-4 py-2 flex items-center justify-center pt-5  gap-3 ${active.title === item.title ? "bg-blue-500" : "bg-[#2D2D2D]"}`}
              >
                <p className="description">{item.number}</p>
                <p className="description">{item.title}</p>
              </button>
            ))}
          </div>
        </div>

        {/* all projects */}
        <div className="mt-8 md:mt-10 lg:mt-12 xl:mt-[60px] text-white grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6">
          {
            filteredProjects?.length > 0 ? (
              filteredProjects?.map((item, index) => (
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
              ))
            ) : (
              <Empty className="text-white description" description="No projects found" />
            )
          }
        </div>
        <div className="flex items-center justify-end mt-10">
          <button onClick={showAddModal} className="common-button rounded sm:rounded-lg mt-1">
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
              <div className="mt-4">
                <Form.Item
                  label="Category:"
                  name="category"
                  required
                  className="text-white"
                >
                  <Select
                    className="p-2 md:p-3 lg:p-4 xl:p-5 rounded bg-[#78120D] !text-white border description
                 focus:bg-[#78120D] hover:bg-[#78120D] focus:border-white hover:border-white
                 placeholder-white"
                    allowClear
                    placeholder="Select Category"
                    dropdownStyle={{ backgroundColor: "#78120D", color: "white" }}
                    style={{ color: "white" }}
                    popupClassName="custom-select-dropdown"
                  >
                    {data.slice(1).map((item) => (
                      <Select.Option key={item.title} value={item.title} className="!text-white">
                        {item.title}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
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
