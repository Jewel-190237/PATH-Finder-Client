import React, { useEffect, useState } from "react";
import GetUser from "../../Backend/GetUser";
const ManagerOverview = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const user = GetUser();
  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  console.log("Current User:", currentUser);
  return (
    <div className="p-5 md:p-10 lg:p-12 xl:p-14 text-white">
      <h1 className="text-3xl font-semibold">Manager Dashboard</h1>
    </div>
  );
};

export default ManagerOverview;
