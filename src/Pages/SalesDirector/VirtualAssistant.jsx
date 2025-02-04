import React, { useEffect, useState } from "react";
import GetUser from "../../Backend/GetUser";
import AddTaskTable from "../../CommonTable/AddTaskTable";
import ViewTable from "../../CommonTable/ViewTavle";
const VirtualAssistant = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const user = GetUser();
  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  return (
    <div className="p-5 md:p-10 lg:p-12 xl:p-14 text-white">
      <ViewTable subRole="Virtual assistant" />
      <div className="mt-3 md:mt-4 lg:mt-5 xl:mt-12">
        <AddTaskTable subRole="Virtual assistant" />
      </div>
    </div>
  );
};

export default VirtualAssistant;
