import { useEffect, useState } from "react";

const GetUser = () => {
  const [user, setUser] = useState(null);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (userId && token) {
      const fetchUserRole = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/get-user-role/${userId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            setUser(data);
          } else {
            console.error("Failed to fetch user role:", response.statusText);
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      };
      fetchUserRole();
    }
  }, [userId, token]);

  return user; 
};

export default GetUser;
