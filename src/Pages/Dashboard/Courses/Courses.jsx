import { Button, Form, Input, message, Modal } from "antd";
import { useEffect, useState } from "react";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [form] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(12);
  const [selectedUser, setSelectedUser] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [handleOpenModal, setHandleOpenModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [videos, setVideos] = useState([""]);

  const handleVideoChange = (index, value) => {
    const updatedVideos = [...videos];
    updatedVideos[index] = value;
    setVideos(updatedVideos);
  };

  const handleAddVideo = () => {
    setVideos([...videos, ""]);
  };

  const handleRemoveVideo = (index) => {
    const updatedVideos = videos.filter((_, i) => i !== index);
    setVideos(updatedVideos);
  };


  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api3.pathxfinder.com/courses");
      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

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
        fetch(`https://api3.pathxfinder.com/courses/${course?._id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((result) => {
            if (result.message === "Course deleted successfully") {
              message.success("Course deleted successfully");
              setCourses((prevCourses) =>
                prevCourses.filter((u) => u._id !== course?._id)
              );
            } else {
              message.error(result.message || "An error occurred while deleting the course.");
            }
          })
          .catch((error) => {
            console.error("Error deleting course:", error);
            message.error("An error occurred while deleting the course.");
          });
      }
    });
  };


  const showAddModal = (course) => {
    setSelectedUser(course);
    setAddModalOpen(true);
  };

  const handleAddOk = () => {
    setAddModalOpen(false);
    setSelectedUser(null);
  };


  const handleUpdateModal = (id) => {
    const course = courses.find((c) => c._id === id);
    if (course) {
      setSelectedCourse(course);
      setHandleOpenModal(true);
      form.setFieldsValue(course); 
    } else {
      console.error("Course not found for id:", id);
    }
  };



  const onFinish = async (values) => {
    try {
      if (!imageFile) {
        message.error("Please select an image file.");
        return;
      }

      // Prepare the form data
      const formData = new FormData();
      formData.append("course_name", values.course_name);
      formData.append("description", values.description);
      formData.append("thumbnail_image", imageFile);
      formData.append("course_price", parseFloat(values.course_price));
      formData.append("course_discount", parseFloat(values.course_discount));
      formData.append("videos", JSON.stringify(videos)); // Add videos as a JSON string

      const token = localStorage.getItem("token");
      const response = await fetch("https://api3.pathxfinder.com/courses", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        message.success("Course added successfully");

        // Reset form and clear image state
        setImageFile(null);
        form.resetFields();
        setVideos([""]); // Reset video fields

        // Close the modal
        setAddModalOpen(false);

        // Refresh the data
        fetchCourses();
      } else {
        const error = await response.json();
        message.error(error.message || "Error adding course");
      }
    } catch (error) {
      message.error("Error adding course");
      console.error("Error adding course:", error);
    }
  };



  
  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = courses.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(courses.length / usersPerPage);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="flex justify-center py-8 text-white">
        <h2 className="heading2">Manage All Courses</h2>
      </div>

      <div className="w-full px-4 lg:px-10">
        <div className="flex justify-between mb-4 items-center">
          <h2 className="heading2 text-white !font-semibold ">
            Total Courses: {courses.length}
          </h2>
          <Button onClick={() => showAddModal(courses)} type="submit" className="bg-primary text-xl text-white px-6 py-6 rounded-lg">Add Course</Button>
        </div>

        <div className="overflow-x-auto text-white description">
          <table className="table-auto w-full divide-y divide-gray-300 text-left text-sm lg:text-base">
            <thead className="bg-[#78120D] text-white">
              <tr>
                <th className="px-4 py-2">Sl No.</th>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Discount</th> 
                <th className="px-4 py-2">Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {courses.map((course, index) => (
                <tr key={course._id}>
                  <td className="px-4 py-2">{index + indexOfFirstUser + 1}</td>
                  <td>
                    <img src={course?.thumbnail_image} className="w-10 h-10" />
                  </td>
                  <td className="px-4 py-2">{course?.course_name}</td>
                  <td className="px-4 py-2">{course?.description}</td>
                  <td className="px-4 py-2">{course?.course_price}</td>
                  <td className="px-4 py-2">{course?.course_discount? `${course.course_discount}%` : "0%"}</td>
                  {/* </td> */}

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
      {/* add Course */}
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
            <h2 className="heading2 mb-4 text-center">Add Course</h2>
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
                  label="Course Name:"
                  name="course_name"
                  required
                  className="text-white"
                >
                  <Input
                    placeholder="Course Name"
                    type="text"
                    className="p-2 md:p-3 lg:p-4 xl:p-5 bg-[#78120D] text-gray-100 border description focus:bg-[#78120D] hover:bg-[#78120D] focus:border-white hover:border-white placeholder-white"
                  />
                </Form.Item>

                <Form.Item
                  label="Course Price:"
                  name="course_price"
                  required
                  className="text-white"
                >
                  <Input
                    placeholder="Course Price"
                    type="text"
                    className="p-2 md:p-3 lg:p-4 xl:p-5 bg-[#78120D] text-white border description focus:bg-[#78120D] hover:bg-[#78120D] focus:border-white hover:border-white placeholder-white"
                  />
                </Form.Item>
                <Form.Item
                  label="Course Discount:"
                  name="course_discount"
                  required
                  className="text-white"
                >
                  <Input
                    placeholder="discount eg. 5%"
                    type="text"
                    className="p-2 md:p-3 lg:p-4 xl:p-5 bg-[#78120D] text-white border description focus:bg-[#78120D] hover:bg-[#78120D] focus:border-white hover:border-white placeholder-white"
                  />
                </Form.Item>
                <Form.Item
                  label="Course Description:"
                  name="description"
                  required
                  className="text-white"
                >
                  <Input.TextArea
                    placeholder="Input Course Description"
                    type="text"
                    className="p-2 md:p-3 lg:p-4 xl:p-5 bg-[#78120D] text-white border description focus:bg-[#78120D] hover:bg-[#78120D] focus:border-white hover:border-white placeholder-white"
                  />
                </Form.Item>

                <Form.Item
                  label="Course Image:"
                  name="thumbnail_image"
                  className="text-white"
                  required
                >
                  <Input
                    type="file"
                    accept="image/*"
                    className="p-2 bg-[#78120D] text-white"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setImageFile(file);
                      }
                    }}
                  />
                </Form.Item>

                {/* Multiple Video Fields */}
                <div className="space-y-4">
                  <h3 className="text-white">Video Links:</h3>
                  {videos.map((video, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        placeholder={`Video Link ${index + 1}`}
                        type="url"
                        value={video}
                        onChange={(e) =>
                          handleVideoChange(index, e.target.value)
                        }
                        className="flex-1 p-2 md:p-3 lg:p-4 bg-[#78120D] text-white border focus:bg-[#78120D] hover:bg-[#78120D] focus:border-white hover:border-white placeholder-white"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveVideo(index)}
                        className="p-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddVideo}
                    className="p-2 mt-2 text-white bg-green-500 rounded-md hover:bg-green-600"
                  >
                    Add Video
                  </button>
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
        )}
      </Modal>

    </>
  );
};
export default AllCourses;
