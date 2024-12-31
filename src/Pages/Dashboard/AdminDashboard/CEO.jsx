import React, { useEffect, useState } from "react";
import { FaEye, FaTelegramPlane, FaTrashAlt } from "react-icons/fa";
import { MdOutlineWhatsapp } from "react-icons/md";
import { Modal } from "antd";
import Swal from "sweetalert2";

const CEO = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(12);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

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

  const handleDelete = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete ${user.name}. This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("token");
        fetch(`http://localhost:5000/users/${user._id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((result) => {
            if (result.message === "User deleted successfully") {
              Swal.fire(
                "Deleted!",
                `${user.name} has been deleted.`,
                "success"
              );
              setUsers((prevUsers) =>
                prevUsers.filter((u) => u._id !== user._id)
              );
            } else {
              Swal.fire("Error!", "Failed to delete the user.", "error");
            }
          })
          .catch((error) => {
            console.error("Error deleting user:", error);
            Swal.fire(
              "Error!",
              "An error occurred while deleting the user.",
              "error"
            );
          });
      }
    });
  };

  const memberUsers = users.filter((user) => user.subRole === "CEO");
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = memberUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(memberUsers.length / usersPerPage);

  const showModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <>
      <div className="flex justify-center py-8 text-white">
        <h2 className="heading2">Manage CEO</h2>
      </div>

      <div className="w-full px-4 lg:px-10">
        <h2 className="heading2 text-white mb-4 !font-semibold">
          Total CEO: {memberUsers.length}
        </h2>
        <div className="overflow-x-auto text-white">
          <table className="table-auto w-full divide-y divide-gray-300 text-center text-sm lg:text-base">
            <thead className="bg-[#78120D] text-white">
              <tr>
                <th className="px-4 py-2">Sl No</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Phone Number</th>
                <th className="px-4 py-2 ">WhatsApp</th>
                <th className="px-4 py-2">Telegram</th>
                <th className="px-4 py-2">View</th>
                <th className="px-4 py-2">Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 description">
              {currentUsers.map((user, index) => (
                <tr key={user._id}>
                  <td className="px-4 py-2">{index + indexOfFirstUser + 1}</td>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.phone}</td>
                  <td className="px-4 py-2">
                    <a
                      href={`https://wa.me/${user.whatsapp}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary"
                    >
                      <MdOutlineWhatsapp className="text-2xl text-center mx-auto" />
                    </a>
                  </td>
                  <td className="px-4 py-2">
                    <a
                      href={`https://t.me/${user.telegram}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary mx-auto"
                    >
                      <FaTelegramPlane className="text-2xl text-center mx-auto" />
                    </a>
                  </td>
                  <td>
                    <button onClick={() => showModal(user)}>
                      <FaEye className="text-primary text-lg" />
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

      <Modal
        title={<h2 className="text-white">User Details</h2>}
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        bodyStyle={{
          backgroundColor: "#78120D", // Background color for the modal
          borderRadius: "8px", // Optional: Add rounded corners for a smoother design
          color: "white", // Text color for better readability
        }}
      >
        {selectedUser && (
          <div>
            <h2 className="text-lg font-bold mb-4">Courses</h2>
            <div className="mb-4">
              <p>Canvas course - 79% Complete</p>
              <div className="w-full bg-gray-300 rounded-full h-2.5">
                <div
                  className="bg-red-600 h-2.5 rounded-full"
                  style={{ width: "79%" }}
                ></div>
              </div>
            </div>
            <div className="mb-4">
              <p>Copy course - 91% Complete</p>
              <div className="w-full bg-gray-300 rounded-full h-2.5">
                <div
                  className="bg-red-600 h-2.5 rounded-full"
                  style={{ width: "91%" }}
                ></div>
              </div>
            </div>
            <h2 className="text-lg font-bold mb-4">
              Review Head of Marketing Task
            </h2>
            <div className="space-y-2">
              {["Facebook", "TikTok", "YouTube"].map((platform) => (
                <div
                  key={platform}
                  className="flex justify-between items-center bg-[#8B0000] p-2 rounded"
                >
                  <span>Like, Comment, Follow and Share on {platform}</span>
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

export default CEO;
