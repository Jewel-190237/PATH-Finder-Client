import React from "react";
import AddTaskTable from "../../../CommonTable/AddTaskTable";
import ViewTable from "../../../CommonTable/ViewTavle";

const SkillStrategist = () => {
  return (
    <>
      <ViewTable subRole="Skill Strategist" />
      <AddTaskTable subRole="Skill Strategist" />
    </>
  );
};

export default SkillStrategist;
