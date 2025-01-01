import React from "react";
import AddTaskTable from "../../../CommonTable/AddTaskTable";
import ViewTable from "../../../CommonTable/ViewTavle";

const SalesDirector = () => {
  return (
    <>
      <ViewTable subRole="Sales Director" />
      <AddTaskTable subRole="Sales Director" />
    </>
  );
};

export default SalesDirector;
