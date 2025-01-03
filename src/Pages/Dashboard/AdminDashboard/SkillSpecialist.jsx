import React from "react";
import AddTaskTable from "../../../CommonTable/AddTaskTable";
import ViewTable from "../../../CommonTable/ViewTavle";

const SkillSpecialist = () => {
  return (
    <>
      <ViewTable subRole="Skill Specialist" />
      <AddTaskTable subRole="Skill Specialist" />
    </>
  );
};

export default SkillSpecialist;
