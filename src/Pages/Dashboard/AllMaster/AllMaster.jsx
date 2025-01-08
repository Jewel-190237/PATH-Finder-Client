import { message } from "antd";
import { m } from "framer-motion";
import { useEffect, useState } from "react";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const AllMaster = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(12);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    role: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/users", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => {
        message.error("Failed to fetch users.");
        console.error("Error fetching users:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  const reloadUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedUsers = await response.json();

      if (response.ok && updatedUsers) {
        setUsers(updatedUsers);
      } else {
        message.error("Failed to reload users.");
      }
    } catch (error) {
      console.error("Error fetching updated users:", error);
      message.error("Failed to reload users.");
    }
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
              message.success("User deleted successfully");
              setUsers((prevUsers) =>
                prevUsers.filter((u) => u._id !== user._id)
              );
            } else {
              message.error("An error occurred while deleting the user.");
            }
          })
          .catch((error) => {
            console.error("Error deleting user:", error);
            message.error("An error occurred while deleting the user.");
          });
      }
    });
  };

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      phone: user.phone,
      code: user.code,
    });
    setIsModalOpen(true);
  };

  const handleUpdate = () => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:5000/specific-users/${selectedUser._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          message.success(result.message || "User updated successfully");
          reloadUsers();
          setIsModalOpen(false);
          setFormData({ name: "", phone: "", code: "" });
        } else {
          message.error(result.message || "Failed to update user");
        }
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        message.error("An error occurred while updating the user.");
      });
  };

  //handle approved counter master status is approved
  const handleApprove = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to approve ${user.name}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("token");
        fetch(`http://localhost:5000/users/${user._id}/approve`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((result) => {
            if (result.success) {
              message.success("User approved successfully");
              reloadUsers();
            } else {
              message.error("An error occurred while approving the user.");
            }
          })
          .catch((error) => {
            console.error("Error approving user:", error);
            message.error("An error occurred while approving the user.");
          });
      }
    });
  };

  const handleSubRoleChange = async (user, subRole) => {
    if (!subRole) return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/users/${user._id}/approve`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ role: subRole }),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        message.success("Sub-role updated successfully");
        await reloadUsers();
      } else {
        message.error("An error occurred while updating the sub-role.");
      }
    } catch (error) {
      console.error("Error updating sub-role:", error);
      message.error("An error occurred while updating the sub-role.");
    }
  };

  const memberUsers = users.filter((user) => user.role === "subAdmin");

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = memberUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(memberUsers.length / usersPerPage);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex justify-center py-8 text-white">
        <h2 className="heading2">Manage Sub Admin</h2>
      </div>

      <div className="w-full px-4 lg:px-10">
        <h2 className="heading2 text-white mb-4 !font-semibold">
          Total Sub Admin: {memberUsers.length}
        </h2>
        <div className="overflow-x-auto text-white description">
          <table className="table-auto w-full divide-y divide-gray-300 text-left text-sm lg:text-base">
            <thead className="bg-[#78120D] text-white">
              <tr>
                <th className="px-4 py-2">Sl No</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Phone Number</th>
                <th className="px-4 py-2">Coin</th>
                <th className="px-4 py-2">Reference</th>
                <th className="px-4 py-2">Select Role</th>
                <th className="px-4 py-2">Update</th>
                <th className="px-4 py-2">Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentUsers.map((user, index) => (
                <tr key={user._id}>
                  <td className="px-4 py-2">{index + indexOfFirstUser + 1}</td>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.phone}</td>
                  <td className="px-4 py-2">{user.coins}</td>
                  <td className="px-4 py-2">{user.code}</td>
                  <td className="px-4 py-2">
                    {user.status === "approved" ? (
                      <select
                        onChange={(e) =>
                          handleSubRoleChange(user, e.target.value)
                        }
                        defaultValue={user?.subRole}
                        className="rounded px-2 py-1 bg-[#78120D] text-white cursor-pointer"
                      >
                        {/* <option value="" disabled>
                          Select Role
                        </option> */}
                        <option value="CEO">CEO</option>
                        <option value="Marketing Panel">Marketing Panel</option>
                        <option value="Marketing Executive">
                          Marketing Executive
                        </option>
                        <option value="Skill Strategist">
                          Skill Strategist
                        </option>
                        <option value="Skill Specialist">
                          Skill Specialist
                        </option>
                        <option value="Dev Advisor">Dev Advisor</option>
                        <option value="Sales Director">Sales Director</option>
                        <option value="Virtual assistant">
                          Virtual assistant
                        </option>
                      </select>
                    ) : (
                      <button
                        onClick={() => handleApprove(user)}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                      >
                        Approve
                      </button>
                    )}
                  </td>
                  <td className="pl-8 py-2">
                    <button
                      onClick={() => handleOpenModal(user)}
                      className="text-blue-600"
                    >
                      <FaRegEdit className="text-xl text-primary" />
                    </button>
                  </td>

                  <td className="pl-8 py-2">
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

        {/* Pagination Controls */}
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

      {/* Modal for updating user */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-11/12 max-w-md">
            <h3 className="text-lg font-bold mb-4">Update User</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate();
              }}
            >
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="border border-gray-300 rounded w-full px-2 py-1"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Phone Number</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="border border-gray-300 rounded w-full px-2 py-1"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Reference</label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) =>
                    setFormData({ ...formData, code: e.target.value })
                  }
                  className="border border-gray-300 rounded w-full px-2 py-1"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
export default AllMaster;
