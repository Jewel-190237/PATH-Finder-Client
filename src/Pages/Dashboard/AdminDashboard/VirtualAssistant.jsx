import React from "react";
import ViewTable from "../../../CommonTable/ViewTavle";
import AddTaskTable from "../../../CommonTable/AddTaskTable";


const VirtualAssistant = () => {
  return (
    <>
      <ViewTable subRole="Virtual assistant" />
      <AddTaskTable subRole="Virtual assistant" />
    </>
  );
};

export default VirtualAssistant;
