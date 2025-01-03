import React from "react";
import AddTaskTable from "../../../CommonTable/AddTaskTable";
import ViewTable from "../../../CommonTable/ViewTavle";

const VirtualAssistant = () => {
  return (
    <>
      <ViewTable subRole="Virtual assistant" />
      <AddTaskTable subRole="Virtual assistant" />
    </>
  );
};

export default VirtualAssistant;
