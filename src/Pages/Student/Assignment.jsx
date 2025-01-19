import React, { useEffect, useState } from "react";
import GetUser from "../../Backend/GetUser";

const Assignment = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const user = GetUser();
  useEffect(() => {
    setCurrentUser(user);
  }, [user]);
  return (
    <div className="p-5 md:p-10 lg:p-12 xl:p-14 text-white">
      <h1 className="heading2">
        Total Assignment: {currentUser?.tasks?.length}
      </h1>
      <div className="w-full px-4 lg:px-10 mt-6">
        <div className="overflow-x-auto text-white">
          <table className="table-auto w-full divide-y divide-gray-300 text-center text-sm lg:text-base">
            <thead className="bg-[#78120D] text-white">
              <tr>
                <th className="px-4 py-2">Sl No</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Provider</th>
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
                  <td className="px-4 py-2">{currentUser?.subAdmin}</td>
                  <td className="px-4 py-2">{task.coin}</td>
                  <td className="px-4 py-2 capitalize">{task.taskStatus}</td>
                  <td className="px-4 py-2">
                    <button className="bg-[#78120D] text-white py-2 px-4 rounded-md">
                      Submit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Assignment;
