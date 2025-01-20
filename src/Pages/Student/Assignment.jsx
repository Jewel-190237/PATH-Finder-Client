import React, { useEffect, useState } from "react";
import GetUser from "../../Backend/GetUser";
import { Empty, message } from "antd";

const Assignment = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const user = GetUser();
  useEffect(() => {
    setCurrentUser(user);
  }, [user]);
  const handleTask = async (task, user) => {
    const taskPayload = {
      userId: user._id,
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        message.error("Please log in to perform this action");
        return;
      }

      const response = await fetch(
        `http://localhost:5000/handle-task-user/${task._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(taskPayload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        // Show an error message if the response is not successful
        message.error(data.message || "Failed to handle the task");
        return;
      }

      // Show a success message if the task is successfully submitted
      message.success(data.message || "Task submitted successfully");

      // Optionally refresh the user data
      setCurrentUser((prevUser) => ({
        ...prevUser,
        tasks: prevUser.tasks.map((t) =>
          t._id === task._id ? { ...t, taskStatus: "submitted" } : t
        ),
      }));
    } catch (error) {
      message.error("An error occurred while submitting the task.");
      console.error(error);
    }
  };

  return (
    <div className="p-5 md:p-10 lg:p-12 xl:p-14 text-white">
      <h1 className="heading2">
        Total Assignment: {currentUser?.tasks?.length}
      </h1>
      <div className="w-full px-4 lg:px-10 mt-6">
        <div className="overflow-x-auto text-white">
          {currentUser?.tasks?.length > 0 ? (
            <table className="table-auto w-full divide-y divide-gray-300 text-center text-sm lg:text-base">
              <thead className="bg-[#78120D] text-white">
                <tr>
                  <th className="px-4 py-2">Sl No</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Description</th>
                  <th className="px-4 py-2">Coins</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 description">
                {currentUser?.tasks?.map((task, index) => (
                  <tr key={task._id}>
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{task.taskName}</td>
                    <td className="px-4 py-2">{task.taskDescription}</td>
                    <td className="px-4 py-2">{task.coin}</td>
                    <td className="px-4 py-2 capitalize">{task.taskStatus}</td>
                    <td className="px-4 py-2">
                      <button
                        disabled={
                          task.taskStatus === "submitted" ||
                          task.taskStatus === "accepted"
                        }
                        onClick={() => handleTask(task, currentUser)}
                        className={`py-2 px-4 rounded-md ${
                          task.taskStatus === "submitted" ||
                          task.taskStatus === "accepted"
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-[#78120D] text-white"
                        }`}
                      >
                        Submit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <Empty
              style={{ color: "white !important", marginTop: "10px" }}
              className="description text-center !text-white"
              description="No Assignment Found"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Assignment;
