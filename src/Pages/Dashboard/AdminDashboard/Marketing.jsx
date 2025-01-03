import React from "react";
import AddTaskTable from "../../../CommonTable/AddTaskTable";
import ViewTable from "../../../CommonTable/ViewTavle";

const Marketing = () => {
  return (
    <>
      <ViewTable subRole="Marketing Panel" />
      <AddTaskTable subRole="Marketing Panel" />
    </>
  );
};

export default Marketing;
