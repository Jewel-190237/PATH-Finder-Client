import React from "react";
import AddTaskTable from "../../../CommonTable/AddTaskTable";
import ViewTable from "../../../CommonTable/ViewTavle";

const DevAdvisor = () => {
  return (
    <>
      <ViewTable subRole="Dev Advisor" />
      <AddTaskTable subRole="Dev Advisor" />
    </>
  );
};

export default DevAdvisor;
