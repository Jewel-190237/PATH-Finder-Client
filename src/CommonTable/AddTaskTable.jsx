import React, { useEffect, useState } from "react";
import { Form, Input, message, Modal } from "antd";
import { IoMdAddCircleOutline } from "react-icons/io";
import { LuView } from "react-icons/lu";
import GetUser from "../Backend/GetUser";

const AddTaskTable = ({ subRole }) => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(12);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserShow, setSelectedUserShow] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [showModalOpen, setShowModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [currentUser, setCurrentUser] = useState(null);

  const user = GetUser();
  useEffect(() => {
    setCurrentUser(user);
  }, [user]);
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    const token = localStorage.getItem("token");
    fetch("https://api3.pathxfinder.com/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  };

  const subAdmin = currentUser?._id;

  // CEO Table Pagination
  const memberUsers = subRole
    ? users.filter((user) => user.subRole == subRole)
    : users.filter((user) => user.subAdmin == subAdmin);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = memberUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(memberUsers.length / usersPerPage);

  const showAddModal = (user) => {
    setSelectedUser(user);
    setAddModalOpen(true);
  };

  const handleAddOk = () => {
    setAddModalOpen(false);
    setSelectedUser(null);
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
      userId: selectedUser._id,
      taskName: values.taskName,
      taskDescription: values.taskDescription,
      coin: values.coin,
    };
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://api3.pathxfinder.com/add-task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        message.success("Task added successfully");
        fetchUsers();
        setAddModalOpen(false);
        setSelectedUser(null);
        form.resetFields();
      } else {
        message.error("Error adding task");
        console.error("Error adding task");
      }
    } catch (error) {
      message.error("Error adding task");
      console.error("Error adding task:", error);
    }
  };

  return (
    <>
      <div className="flex justify-center py-8 text-white">
        <h2 className="heading2">
          Add task to {subRole ? subRole : "Students"}
        </h2>
      </div>
      <div className="w-full px-4 lg:px-10">
        <div className="overflow-x-auto text-white">
          <table className="table-auto w-full divide-y divide-gray-300 text-center text-sm lg:text-base">
            <thead className="bg-[#78120D] text-white">
              <tr>
                <th className="px-4 py-2">Sl No</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Coin</th>
                <th className="px-4 py-2">Level</th>
                <th className="px-4 py-2">Add Task</th>
                <th className="px-4 py-2">View Task</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 description">
              {currentUsers.map((user, index) => (
                <tr key={user._id}>
                  <td className="px-4 py-2">{index + indexOfFirstUser + 1}</td>
                  <td className="px-4 py-2">{user?.name}</td>
                  <td className="px-4 py-2">{user?.coins || 0} </td>
                  <td className="px-4 py-2">{user?.level || 0} </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => showAddModal(user)}
                      className="btn btn-ghost btn-sm"
                    >
                      <IoMdAddCircleOutline className="text-green-800 text-lg xl:text-2xl" />
                    </button>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => showModal(user)}
                      className="btn btn-ghost btn-sm"
                    >
                      <LuView className="text-lg" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-primary text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* add task modal */}
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
        {selectedUser && (
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
                  label="Task Name: "
                  name="taskName"
                  required
                  className="text-white"
                >
                  <Input
                    placeholder="Input Task Name"
                    type="text"
                    className="p-2 md:p-3 lg:p-4 xl:p-5 bg-[#78120D] text-white border description focus:bg-[#78120D] hover:bg-[#78120D] focus:border-white hover:border-white placeholder-white"
                  />
                </Form.Item>
                <Form.Item
                  label="Task Coin: "
                  name="coin"
                  required
                  className="text-white"
                >
                  <Input
                    placeholder="Input Task Coin"
                    type="text"
                    className="p-2 md:p-3 lg:p-4 xl:p-5 bg-[#78120D] text-white border description focus:bg-[#78120D] hover:bg-[#78120D] focus:border-white hover:border-white placeholder-white"
                  />
                </Form.Item>

                <Form.Item
                  label="Task Description:"
                  name="taskDescription"
                  required
                  className="text-white"
                >
                  <Input.TextArea
                    placeholder="Input Task Description"
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
        )}
      </Modal>

      {/* show Modal */}
      <Modal
        visible={showModalOpen}
        onOk={handleOk}
        onCancel={() => setShowModalOpen(false)}
        footer={null}
        destroyOnClose={true}
        className="custom-modal"
        bodyStyle={{
          backgroundColor: "#78120D",
          color: "white",
        }}
      >
        {selectedUserShow && (
          <div>
            <h2 className="heading2 mb-4 text-center">View Task</h2>
            {selectedUserShow.tasks && selectedUserShow.tasks.length > 0 ? (
              <table className="w-full text-white border-collapse">
                <thead>
                  <tr className="">
                    <th className="border px-4 py-2">Task Name</th>
                    <th className="border px-4 py-2">Coin</th>
                    <th className="border px-4 py-2">Status</th>
                    <th className="border px-4 py-2">Task Description</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedUserShow?.tasks?.map((task, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">{task.taskName}</td>
                      <td className="border px-4 py-2">{task.coin}</td>
                      <td className="border px-4 py-2">
                        {task?.taskStatus === "accepted" ? (
                          <span className="text-green-200 bg-green-900 px-2 rounded-md">
                            Accepted
                          </span>
                        ) : task?.taskStatus === "rejected" ? (
                          <span className="text-white bg-red-500 px-2 rounded-md">
                            Rejected
                          </span>
                        ) : (
                          <span className="text-purple-200 bg-purple-900 px-2 rounded-md">
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="border px-4 py-2">
                        {task.taskDescription}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center">No tasks available.</p>
            )}
          </div>
        )}
      </Modal>
    </>
  );
};

export default AddTaskTable;
