import React from "react";
import AddTaskTable from "../../../CommonTable/AddTaskTable";
import ViewTable from "../../../CommonTable/ViewTavle";

const MarketingExecutive = () => {
  return (
    <>
      <ViewTable subRole="Marketing Executive" />
      <AddTaskTable subRole="Marketing Executive" />
    </>
  );
};

export default MarketingExecutive;
