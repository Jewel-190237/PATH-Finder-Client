import { Form, Input, message, Modal } from "antd";
import { useEffect, useState } from "react";
import { FaRegCopy, FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { MdGeneratingTokens } from "react-icons/md";
import Swal from "sweetalert2";

const AllMaster = () => {
  const [form] = Form.useForm();
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(12);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://api3.pathxfinder.com/users", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => {
        console.error("Error fetching users:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  const reloadUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://api3.pathxfinder.com/users", {
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
          reloadUsers();
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
        fetch(`https://api3.pathxfinder.com/users/${user._id}/approve`, {
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
        `https://api3.pathxfinder.com/users/${user._id}/approve`,
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

  const handleGenerate = (user) => {
    let randomSixDigitNumber = Math.floor(100000 + Math.random() * 900000);
    let isUnique = false;

    while (!isUnique) {
      randomSixDigitNumber = Math.floor(100000 + Math.random() * 900000);
      isUnique = !users.some((u) => u.code === randomSixDigitNumber); 
    }
    const token = localStorage.getItem("token");
    try {
      fetch(`https://api3.pathxfinder.com/generate-code/${user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ code: randomSixDigitNumber }),
      }).then((response) => {
        if (response.ok) {
          message.success("Code generated successfully");
          reloadUsers();
        }
      });
    } catch (error) {
      message.error("Error generating code");
      console.error("Error generating code:", error);
    }
  };
  const handleCopy = (code) => {
    const url = `https://pathxfinder.com/signup?reference=${code}`;
    navigator.clipboard.writeText(url).then(() => {
      message.success("URL copied to clipboard!");
    });
  };

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
                <th className="px-4 py-2">Reference</th>
                <th className="px-4 py-2">Balance</th>
                <th className="px-4 py-2">Coin</th>
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
                  <td className="px-4 py-2">
                    {user?.code ? (
                      <button onClick={() => handleCopy(user.code)}>
                        <FaRegCopy className="text-2xl text-blue-500" />
                      </button>
                    ) : (
                      <button onClick={() => handleGenerate(user)}>
                        <MdGeneratingTokens className="text-2xl text-blue-500" />
                      </button>
                    )}
                  </td>
                  <td className="px-4 py-2">{user.balance || 0}</td>
                  <td className="px-4 py-2">{user.coins || 0}</td>
                  <td className="px-4 py-2">
                    {user.status === "approved" ? (
                      <select
                        onChange={(e) =>
                          handleSubRoleChange(user, e.target.value)
                        }
                        defaultValue={user?.subRole}
                        className="rounded px-2 py-1 bg-[#78120D] text-white cursor-pointer"
                      >
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
                      onClick={() => {
                        setSelectedUser(user);
                        setIsModalOpen(true);
                      }}
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
          <h2 className="heading2 mb-4 text-center">Update Sub Admin</h2>
          <div
            className="max-w-[1000px] task-form rounded-[16px] mx-auto my-4 md:my-8"
            style={{ backdropFilter: "blur(30px)" }}
          >
            <Form
              layout="vertical"
              onFinish={onFinish}
              form={form}
              initialValues={{
                balance: selectedUser?.balance || 0,
                coins: selectedUser?.coins,
              }}
            >
              <Form.Item
                label="Balance:"
                name="balance"
                rules={[
                  {
                    required: true,
                    message: "Please input Balance",
                  },
                ]}
                className="text-white"
              >
                <Input
                  placeholder="Input your Balance"
                  className="p-2 md:p-3 lg:p-4 xl:p-5 bg-[#78120D] text-white border description focus:bg-[#78120D] hover:bg-[#78120D] focus:border-white hover:border-white placeholder-white"
                />
              </Form.Item>
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
export default AllMaster;
