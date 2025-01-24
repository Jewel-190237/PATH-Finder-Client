import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { Empty, message,} from "antd";
import Swal from "sweetalert2";

const AdminPost = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(12);

  useEffect(() => {
    fetchAnnouncement();
  }, []);

  const fetchAnnouncement = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/all-post`,
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

  console.log('Project ssss',projects);
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
          const response = await fetch(`http://localhost:5000/post/${id}`, {
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
        <h2 className="heading2">All Posts</h2>
      </div>

      <div className="w-full px-4 lg:px-10">
        <div className="flex justify-between mb-4 items-center">
          <h2 className="heading2 text-white !font-semibold ">
            Total Post: {projects?.length}
          </h2>
        </div>
        {projects?.length > 0 ? (
          <div className="overflow-x-auto text-white">
            <table className="table-auto w-full divide-y divide-gray-300 text-left text-sm lg:text-base">
              <thead className="bg-[#78120D] text-white">
                <tr>
                  <th className="px-4 py-2">Sl No</th>
                  <th className="px-4 py-2">Title</th>
                  <th className="px-4 py-2">Post</th>
                  <th className="px-4 py-2">Creator</th>
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
                      {project?.name}
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
    </>
  );
};

export default AdminPost;
