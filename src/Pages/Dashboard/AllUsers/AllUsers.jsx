import { Form, Input, message, Modal } from "antd";
import { useEffect, useState } from "react";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(12);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://api3.pathxfinder.com/users`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  // update users 
  const onFinish = () => {
    const token = localStorage.getItem("token");
    const formData = form.getFieldsValue();
    fetch(`https://api3.pathxfinder.com/specific-users/${selectedUser._id}`, {
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
          fetchUsers();
          setIsModalOpen(false);
          form.resetFields();
        } else {
          message.error(result.message || "Failed to update user");
        }
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        message.error("An error occurred while updating the user.");
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  // Handle user deletion
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
        fetch(`https://api3.pathxfinder.com/users/${user._id}`, {
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

  // Pagination logic
  const memberUsers = users.filter((user) => user.role === "student");
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = memberUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(memberUsers.length / usersPerPage);

  return (
    <>
      <div className="flex justify-center py-8 text-white">
        <h2 className="heading2">Manage Members</h2>
      </div>

      <div className="w-full px-4 lg:px-10">
        <h2 className="heading2 text-white mb-4 !font-semibold">
          Total Members: {memberUsers.length}
        </h2>
        <div className="overflow-x-auto text-white">
          <table className="table-auto w-full divide-y divide-gray-300 text-left text-sm lg:text-base">
            <thead className="bg-[#78120D] text-white">
              <tr>
                <th className="px-4 py-2">Sl No</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Phone Number</th>
                <th className="px-4 py-2">Sub Admin</th>
                <th className="px-4 py-2">Coin</th>
                <th className="px-4 py-2">Update</th>
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
                    {user.subAdmin
                      ? users?.find((u) => u?._id === user?.subAdmin)?.name
                      : "NA"}
                  </td>
                  <td className="px-4 py-2">{user?.coins || "0"}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setIsModalOpen(true)
                      }}
                      className="text-blue-600"
                    >
                      <FaRegEdit className="text-xl text-primary" />
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

        {/* Pagination controls */}
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1
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
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        className="custom-modal"
        bodyStyle={{
          backgroundColor: "#78120D",
          color: "white",
        }}
      >
        <div>
          <h2 className="heading2 mb-4 text-center">Update Users</h2>
          <div
            className="max-w-[1000px] task-form rounded-[16px] mx-auto my-4 md:my-8"
            style={{ backdropFilter: "blur(30px)" }}
          >
            <Form layout="vertical" onFinish={onFinish} form={form}
              initialValues={{
                coins: selectedUser?.coins,
              }}>
              <Form.Item
                label="Coin:"
                name="coins"
                rules={[
                  {
                    required: true,
                    message: "Please input Coins",
                  },
                ]}
                className="text-white"
              >
                <Input
                  placeholder="Input your Coins"
                  className="p-2 md:p-3 lg:p-4 xl:p-5 bg-[#78120D] text-white border description focus:bg-[#78120D] hover:bg-[#78120D] focus:border-white hover:border-white placeholder-white"
                />
              </Form.Item>
              <button
                type="submit"
                className="common-button w-full !mt-5 !rounded-md"
              >
                Update
              </button>
            </Form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AllUsers;
