import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { message, Modal } from "antd";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(12);
  const [selectedUserShow, setSelectedUserShow] = useState(null);
  const [showModalOpen, setShowModalOpen] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/all-project", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        setProjects(result.projects || []);
      } else {
        message.error("Failed to fetch projects");
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      message.error("An error occurred while fetching projects");
    }
  };
  const showModal = (user) => {
    setSelectedUserShow(user);
    setShowModalOpen(true);
  };

  const handleOk = () => {
    setShowModalOpen(false);
    setSelectedUserShow(null);
  };

  // Pagination logic
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
        <h2 className="heading2">All Projects</h2>
      </div>

      <div className="w-full px-4 lg:px-10">
        <h2 className="heading2 text-white mb-4 !font-semibold">
          Total Projects: {projects.length}
        </h2>
        <div className="overflow-x-auto text-white">
          <table className="table-auto w-full divide-y divide-gray-300 text-left text-sm lg:text-base">
            <thead className="bg-[#78120D] text-white">
              <tr>
                <th className="px-4 py-2">Sl No</th>
                <th className="px-4 py-2">Project Name</th>
                <th className="px-4 py-2">Problem</th>
                <th className="px-4 py-2">Created At</th>
                <th className="px-4 py-2">View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 description">
              {currentProjects.map((project, index) => (
                <tr key={project._id}>
                  <td className="px-4 py-2">
                    {index + indexOfFirstProject + 1}
                  </td>
                  <td className="px-4 py-2">{project.ProjectName}</td>
                  <td className="px-4 py-2">{project.problem}</td>
                  <td className="px-4 py-2">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => showModal(project)} 
                    >
                      <FaEye className="text-blue-600 text-lg" />
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
        open={showModalOpen} // Updated to "open" for newer Ant Design versions
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
    </>
  );
};

export default Projects;
