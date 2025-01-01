
import React, { useEffect, useState } from "react";
import { FaEye, FaTelegramPlane, FaTrashAlt } from "react-icons/fa";
import { MdOutlineWhatsapp } from "react-icons/md";
import { Modal } from "antd";
import Swal from "sweetalert2";
import { IoMdAddCircleOutline } from "react-icons/io";

const AddTaskTable = ({ subRole}) => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(12);
  const [selectedUser, setSelectedUser] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
    };

  // CEO Table Pagination
  const memberUsers = users.filter((user) => user.subRole == subRole);
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

  const handleAddCancel = () => {
    setAddModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <>
      <div className="flex justify-center py-8 text-white">
        <h2 className="heading2">Manage {subRole}</h2>
      </div>

      <div className="w-full px-4 lg:px-10">
        <h2 className="heading2 text-white mb-4 !font-semibold">
          Total Task: 5
        </h2>
        <div className="overflow-x-auto text-white">
          <table className="table-auto w-full divide-y divide-gray-300 text-center text-sm lg:text-base">
            <thead className="bg-[#78120D] text-white">
              <tr>
                <th className="px-4 py-2">Sl No</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Task</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Add Task</th>
                <th className="px-4 py-2">Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 description">
              {currentUsers.map((user, index) => (
                <tr key={user._id}>
                  <td className="px-4 py-2">{index + indexOfFirstUser + 1}</td>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">Task 1</td>
                  <td className="px-4 py-2">Pending</td>
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
                      onClick={() => handleDelete(user)}
                      className="btn btn-ghost btn-sm"
                    >
                      <FaTrashAlt className="text-red-800 text-lg" />
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
        onCancel={handleAddCancel}
        footer={null}
        className="custom-modal"
        bodyStyle={{
          backgroundColor: "#78120D",
          color: "white",
        }}
      >
        {selectedUser && (
          <div>
            <h2 className="heading2 mb-4 text-center">Add Course</h2>
            <div className="mb-6">
              <table className="w-full text-left text-white border description">
                <thead>
                  <tr>
                    <th className="border-b border-white px-4 py-2">Metric</th>
                    <th className="border-b border-white px-4 py-2">Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2 border-b">Course Enrolled</td>
                    <td className="px-4 py-2 border-b">2</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b">Course Completed</td>
                    <td className="px-4 py-2 border-b">1</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Level</td>
                    <td className="px-4 py-2">2</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mb-4 description">
              <p>Canvas course - 79% Complete</p>
              <div className="w-full bg-gray-300 rounded-full h-2.5">
                <div
                  className="bg-red-600 h-2.5 rounded-full"
                  style={{ width: "79%" }}
                ></div>
              </div>
            </div>
            <div className="mb-4 description">
              <p>Copy course - 91% Complete</p>
              <div className="w-full bg-gray-300 rounded-full h-2.5">
                <div
                  className="bg-red-600 h-2.5 rounded-full"
                  style={{ width: "91%" }}
                ></div>
              </div>
            </div>

            <h2 className="my-4 heading2 text-center py-2">
              Review Head CSE Task
            </h2>
            <div className="space-y-2">
              {["Facebook", "TikTok", "YouTube"].map((platform) => (
                <div
                  key={platform}
                  className="flex justify-between items-center bg-[#F6170C] bg-opacity-50 p-2 rounded"
                >
                  <span className="">
                    Like, Comment, Follow and Share on {platform}
                  </span>
                  <div>
                    <button className="bg-green-600 px-2 py-1 rounded text-white mr-2">
                      Accept
                    </button>
                    <button className="bg-red-600 px-2 py-1 rounded text-white">
                      Decline
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default AddTaskTable;

