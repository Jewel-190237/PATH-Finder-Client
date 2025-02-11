import React, { useEffect, useState } from "react";
import RevenueChart from "../../CommonChart/RevenueChart";
import GetUser from "../../Backend/GetUser";
import Marketing from "../../CommonChart/Marketing";
import { GiClick } from "react-icons/gi";
import { PiStudentDuotone } from "react-icons/pi";
import { TfiCommentAlt } from "react-icons/tfi";
import { FaBookAtlas } from "react-icons/fa6";
const StudentOverview = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [projects, setProjects] = useState([]);
  const [posts, setPosts] = useState([]);
  const user = GetUser();
  useEffect(() => {
    setCurrentUser(user);
    fetchCourses();
    fetchProjects();
    fetchPost();
  }, [user]);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api3.pathxfinder.com/courses/student/${currentUser?._id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://api3.pathxfinder.com/projects/${currentUser?._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        setProjects(result.projects || []);
      } else {
        console.error("Failed to fetch projects");
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  }
  const fetchPost = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://api3.pathxfinder.com/all-post/${currentUser._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        setPosts(result?.announcements || []);
      } else {
        console.error("Failed to fetch post");
      }
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  }; 
  const dashboardItems = [
    {
      icon: FaBookAtlas,
      count: courses.length,
      text: "Total Courses",
    },
    {
      icon: TfiCommentAlt,
      count: projects.length,
      text: "Total Projects",
    },
    {
      icon: PiStudentDuotone,
      count: posts.length,
      text: "Total Posts",
    },
    {
      icon: GiClick,
      count: currentUser?.visitCount,
      text: "TotalVisit Count",
    },
  ];
  return (
    <div className="p-5 md:p-10 lg:p-12 xl:p-14 text-white">
      <h1 className="heading2">
        WellCome Back <span className="heading">{currentUser?.name}</span> Good
        Afternoon
      </h1>
      <div className="mx-6 md:mx-8 lg:mx-9 xl:mx-11 pt-6 md:pt-8 lg:pt-9 xl:pt-11">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 xl:gap-8 w-full justify-center">
          {dashboardItems.map((item, index) => (
            <div
              key={index}
              className="w-full py-5 md:py-6 lg:py-8 xl:py-10 text-white flex flex-col items-center justify-center bg-[#78120D] shadow-lg hover:scale-105 group rounded-lg transition-transform duration-200"
            >
              <item.icon className="heading group-hover:text-primary" />
              <h1 className=" group-hover:text-primary font-medium mt-3 lg:mt-4 xl:mt-5 text-center description">
                {item.text}: {item.count}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentOverview;
