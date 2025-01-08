import React, { useEffect, useState } from "react";
import AddTaskTable from "../../CommonTable/AddTaskTable";
import ViewTable from "../../CommonTable/ViewTavle";
const SkillStrategistMembers = () => {
  return (
    <div className="p-5 md:p-10 lg:p-12 xl:p-14 text-white">
      <ViewTable />
      <div className="mt-3 md:mt-4 lg:mt-5 xl:mt-12">
        <AddTaskTable />
      </div>
    </div>
  );
};

export default SkillStrategistMembers;
