import React, { useEffect, useState } from "react";
import axios from "axios";
const VisitCount = () => {
  const [visitCount, setVisitCount] = useState(0);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      axios
        .post("http://localhost:5000/visit-count", { userId })
        .then((response) => {
          setVisitCount(response.data.visitCount);
        })
        .catch((error) => {
          console.error("Error fetching visit count:", error);
        });
    }
  }, [userId]);

  return visitCount;
};

export default VisitCount;
