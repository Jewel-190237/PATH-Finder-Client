import { useEffect, useState } from "react";
import { FaEye, FaTrashAlt } from "react-icons/fa";
import { Button, Empty, Form, Input, message, Modal } from "antd";
import Swal from "sweetalert2";
import GetUser from "../../Backend/GetUser";

const Post = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(12);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [currentUser, setCurrentUser] = useState(null);
  const user = GetUser();

  useEffect(() => {
    setCurrentUser(user);
    fetchAnnouncement();
  }, [user]);

  const fetchAnnouncement = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://api3.pathxfinder.com/all-post/${currentUser._id}`,
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
        setProjects(result?.announcements || []);
      } else {
        console.error("Failed to fetch post");
      }
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  const onFinish = async (values) => {
    try {
      const payload = {
        title: values.title,
        announcement: values.announcement,
        userId: currentUser?._id,
        name: currentUser?.name,
      };
      const token = localStorage.getItem("token");
      const response = await fetch("https://api3.pathxfinder.com/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        message.success("Post added successfully");
        form.resetFields();
        fetchAnnouncement();
        setAddModalOpen(false);
      } else {
        const error = await response.json();
        message.error(error.message || "Error adding post");
      }
    } catch (error) {
      message.error("Error adding post");
      console.error("Error adding post:", error);
    }
  };

  // Add modal
  const showAddModal = () => {
    setAddModalOpen(true);
  };

  const handleAddOk = () => {
    setAddModalOpen(false);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem("token");
          const response = await fetch(`https://api3.pathxfinder.com/post/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            message.success("Post deleted successfully");
            fetchAnnouncement(); // Refresh the announcement list
          } else {
            const error = await response.json();
            message.error(error.message || "Error deleting Post");
          }
        } catch (error) {
          message.error("Error deleting post");
          console.error("Error deleting post:", error);
        }
      }
    });
  };

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  return (
    <>
      <div className="flex justify-center py-8 text-white">
        <h2 className="heading2">My Posts</h2>
      </div>

      <div className="w-full px-4 lg:px-10">
        <div className="flex justify-between mb-4 items-center">
          <h2 className="heading2 text-white !font-semibold ">
            Total Post: {projects?.length}
          </h2>
          <Button
            onClick={() => showAddModal()}
            type="submit"
            className="bg-primary text-xl text-white px-6 py-6 rounded-lg"
          >
            Add New
          </Button>
        </div>
        {projects?.length > 0 ? (
          <div className="overflow-x-auto text-white">
            <table className="table-auto w-full divide-y divide-gray-300 text-left text-sm lg:text-base">
              <thead className="bg-[#78120D] text-white">
                <tr>
                  <th className="px-4 py-2">Sl No</th>
                  <th className="px-4 py-2">Title</th>
                  <th className="px-4 py-2">Post</th>
                  <th className="px-4 py-2">Created At</th>
                  <th className="px-4 py-2">Delete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 description">
                {currentProjects.map((project, index) => (
                  <tr key={project?._id}>
                    <td className="px-4 py-2">
                      {index + indexOfFirstProject + 1}
                    </td>
                    <td className="px-4 py-2">{project?.title}</td>
                    <td className="px-4 py-2">
                      {project?.announcement?.split(" ").length > 60 ? (
                        <Tooltip title={project.announcement}>
                          {project.announcement
                            .split(" ")
                            .slice(0, 60)
                            .join(" ")}
                          ...
                        </Tooltip>
                      ) : (
                        project.announcement
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {new Date(project?.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">
                      <button onClick={() => handleDelete(project?._id)}>
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <Empty description="No Post Found" />
        )}

        {/* Pagination controls */}
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

      {/* add modal */}
      <Modal
        open={addModalOpen}
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
          <h2 className="heading2 mb-4 text-center">Add Post</h2>
          <div
            className="max-w-[1000px] task-form rounded-[16px] mx-auto my-4 md:my-8"
            style={{ backdropFilter: "blur(30px)" }}
          >
            <Form layout="vertical" onFinish={onFinish} form={form}>
              <Form.Item
                label="Title:"
                name="title"
                rules={[
                  {
                    required: true,
                    message: "Please input your Title",
                  },
                ]}
                className="text-white"
              >
                <Input
                  placeholder="Input your Title"
                  className="p-2 md:p-3 lg:p-4 xl:p-5 bg-[#78120D] text-white border description focus:bg-[#78120D] hover:bg-[#78120D] focus:border-white hover:border-white placeholder-white"
                />
              </Form.Item>
              <Form.Item
                label="Post:"
                name="announcement"
                rules={[
                  {
                    required: true,
                    message: "Please input your POst!",
                  },
                ]}
                className="text-white"
              >
                <Input.TextArea
                  placeholder="Input your POst"
                  className="p-2 md:p-3 lg:p-4 xl:p-5 bg-[#78120D] text-white border description focus:bg-[#78120D] hover:bg-[#78120D] focus:border-white hover:border-white placeholder-white"
                />
              </Form.Item>

              <button
                type="submit"
                className="common-button w-full !mt-5 !rounded-md"
              >
                Submit
              </button>
            </Form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Post;
