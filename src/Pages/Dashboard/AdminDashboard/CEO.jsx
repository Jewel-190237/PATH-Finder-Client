import React from "react";
import AddTaskTable from "../../../CommonTable/AddTaskTable";
import ViewTable from "../../../CommonTable/ViewTavle";

const CEO = () => {
  return (
    <>
      <ViewTable subRole="CEO" />
      <AddTaskTable subRole="CEO" />
    </>
  );
};

export default CEO;
