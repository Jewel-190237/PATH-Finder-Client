import { Form, Input, message, Modal } from "antd";
import { useEffect, useState } from "react";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [form] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(12);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    role: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // fetch("http://localhost:5000/courses",
    fetch("http://localhost:5000/courses", {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem("token")}`,
      //   },
    })
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => {
        message.error("Failed to fetch users.");
        console.error("Error fetching users:", error);
      })
      .finally(() => setLoading(false));
  }, []);
  console.log("dfsfff", courses);

  //   const reloadUsers = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       const response = await fetch("http://localhost:5000/users", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       const updatedUsers = await response.json();

  //       if (response.ok && updatedUsers) {
  //         setUsers(updatedUsers);
  //       } else {
  //         message.error("Failed to reload users.");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching updated users:", error);
  //       message.error("Failed to reload users.");
  //     }
  //   };

  const handleDelete = (course) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete ${course?.name}. This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("token");
        fetch(`http://localhost:5000/users/${course?._id}`, {
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
                prevUsers.filter((u) => u._id !== course?._id)
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

  const handleOpenModal = (course) => {
    setSelectedUser(course);
    setFormData({
      name: course.name,
      phone: course.phone,
      code: course.code,
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
  //   const handleApprove = (user) => {
  //     Swal.fire({
  //       title: "Are you sure?",
  //       text: `You are about to approve ${user.name}.`,
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonColor: "#3085d6",
  //       cancelButtonColor: "#d33",
  //       confirmButtonText: "Yes, approve it!",
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         const token = localStorage.getItem("token");
  //         fetch(`http://localhost:5000/users/${user._id}/approve`, {
  //           method: "PUT",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${token}`,
  //           },
  //         })
  //           .then((response) => response.json())
  //           .then((result) => {
  //             if (result.success) {
  //               message.success("User approved successfully");
  //               reloadUsers();
  //             } else {
  //               message.error("An error occurred while approving the user.");
  //             }
  //           })
  //           .catch((error) => {
  //             console.error("Error approving user:", error);
  //             message.error("An error occurred while approving the user.");
  //           });
  //       }
  //     });
  //   };

  //   const handleSubRoleChange = async (user, subRole) => {
  //     if (!subRole) return;
  //     try {
  //       const token = localStorage.getItem("token");
  //       const response = await fetch(
  //         `http://localhost:5000/users/${user._id}/approve`,
  //         {
  //           method: "PUT",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${token}`,
  //           },
  //           body: JSON.stringify({ role: subRole }),
  //         }
  //       );

  //       const data = await response.json();

  //       if (response.ok && data.success) {
  //         message.success("Sub-role updated successfully");
  //         await reloadUsers();
  //       } else {
  //         message.error("An error occurred while updating the sub-role.");
  //       }
  //     } catch (error) {
  //       console.error("Error updating sub-role:", error);
  //       message.error("An error occurred while updating the sub-role.");
  //     }
  //   };

  //   const memberUsers = users.filter((user) => user.role === "subAdmin");

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = courses.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(courses.length / usersPerPage);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleAddOk = () => {
    setAddModalOpen(false);
    setSelectedUser(null);
  };

  //   const onFinish = async (values) => {
  //       const data = {
  //         userId: selectedUser._id,
  //         taskName: values.taskName,
  //         taskDescription: values.taskDescription,
  //         coin: values.coin,
  //       };
  //       try {
  //         const token = localStorage.getItem("token");
  //         const response = await fetch("http://localhost:5000/add-task", {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${token}`,
  //           },
  //           body: JSON.stringify(data),
  //         });

  //         if (response.ok) {
  //           const result = await response.json();
  //           message.success("Task added successfully");
  //           fetchUsers();
  //           setAddModalOpen(false);
  //           setSelectedUser(null);
  //           form.resetFields();
  //         } else {
  //           message.error("Error adding task");
  //           console.error("Error adding task");
  //         }
  //       } catch (error) {
  //         message.error("Error adding task");
  //         console.error("Error adding task:", error);
  //       }
  //     };

  return (
    <>
      <div className="flex justify-center py-8 text-white">
        <h2 className="heading2">Manage All Courses</h2>
      </div>

      <div className="w-full px-4 lg:px-10">
        <h2 className="heading2 text-white mb-4 !font-semibold">
          Total Courses: {courses.length}
        </h2>
        <div className="overflow-x-auto text-white description">
          <table className="table-auto w-full divide-y divide-gray-300 text-left text-sm lg:text-base">
            <thead className="bg-[#78120D] text-white">
              <tr>
                <th className="px-4 py-2">Sl No.</th>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Update</th>
                <th className="px-4 py-2">Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {courses.map((course, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">{index + indexOfFirstUser + 1}</td>
                  <td>
                    <img src={course?.thumbnail_image} className="w-10 h-10" />
                  </td>
                  <td className="px-4 py-2">{course?.course_name}</td>
                  <td className="px-4 py-2">{course?.description}</td>
                  <td className="px-4 py-2">{course?.course_price}</td>
                  <td className="pl-8 py-2">
                    <button
                      onClick={() => handleOpenModal(course)}
                      className="text-blue-600"
                    >
                      <FaRegEdit className="text-xl text-primary" />
                    </button>
                  </td>

                  <td className="pl-8 py-2">
                    <button
                      onClick={() => handleDelete(course)}
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
      {/* {isModalOpen && (
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
 
      )} */}

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
                // onFinish={onFinish}
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
    </>
  );
};
export default AllCourses;
