import React, { useEffect, useState } from "react";
import RevenueChart from "../../CommonChart/RevenueChart";
import GetUser from "../../Backend/GetUser";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js";
import moment from "moment";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale
);

const SalesDirectorOverview = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const user = GetUser();
  const [projects, setProjects] = useState([]);
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      }
    };

    fetchOrders();
  }, []);

  const sales = orders.filter(
    (order) => order?.subAdminId === currentUser?._id && order?.status === "paid"
  );

  const salesByMonth = sales.reduce((acc, sale) => {
    const month = moment(sale.createdAt).format("MMM");
    acc[month] = (acc[month] || 0) + sale.revenue;
    return acc;
  }, {});

  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const chartData = labels.map((month) => salesByMonth[month] || 0);

  const data = {
    labels,
    datasets: [
      {
        label: "Sales Activities",
        data: chartData,
        borderColor: "#FF5C2C",
        backgroundColor: "rgba(255, 92, 44, 0.3)",
        pointBackgroundColor: "#FF5C2C",
        pointBorderColor: "#FF5C2C",
        tension: 0.4,
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#FFFFFF",
        },
      },
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "#FFFFFF",
        },
      },
    },
  };

  // Get all projects
  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`http://localhost:5000/projects/${currentUser?._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProjects(response.data.projects);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProjects();
  }, [currentUser]);

  // Get all posts
  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`http://localhost:5000/all-post/${currentUser?._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPosts(response.data.announcements); // Assuming the response structure is { announcements: [] }
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, [currentUser]);

  console.log("projects", projects);
  console.log("posts", posts);

  const calculateProjectData = () => {
    if (!Array.isArray(projects)) return [];

    const weekDays = ["S", "M", "T", "W", "T", "F", "S"];
    const projectsByDay = projects.reduce((acc, currentProject) => {
      const day = new Date(currentProject.createdAt).getDay();
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    }, {});

    const totalProjects = projects.length;

    return weekDays.map((day, index) => ({
      day,
      count: projectsByDay[index] || 0,
      percentage: totalProjects > 0 ? Math.round(((projectsByDay[index] || 0) / totalProjects) * 100) : 0,
    }));
  };

  const calculatePostData = () => {
    if (!Array.isArray(posts)) return [];

    const weekDays = ["S", "M", "T", "W", "T", "F", "S"];
    const postsByDay = posts.reduce((acc, post) => {
      const day = new Date(post.createdAt).getDay();
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    }, {});

    const totalPosts = posts.length;

    return weekDays.map((day, index) => ({
      day,
      count: postsByDay[index] || 0,
      percentage: totalPosts > 0 ? Math.round(((postsByDay[index] || 0) / totalPosts) * 100) : 0,
    }));
  };

  const projectData = calculateProjectData();
  const postData = calculatePostData();

  return (
    <div className="p-5 md:p-10 lg:p-12 xl:p-14 text-white">
      <h1 className="heading2">
        WellCome Back <span className="heading">{currentUser?.name}</span>
      </h1>
      <div className="bg-[#78120D] mt-10 p-6 rounded-lg text-white shadow-md">
        <h3 className="text-[#B0B0B0] text-14px font-roboto mb-4">
          Revenue
        </h3>
        <div className="h-64">
          <Line data={data} options={options} />
        </div>
      </div>
      <div className="mt-4 md:mt-5 lg:mt-6 xl:mt-8 grid justify-between grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 xl:gap-6">
        <RevenueChart title={"Total Projects"} revenue={projects.length} data={projectData} />
        <RevenueChart title={"Total Posts"} revenue={posts.length} data={postData} />
      </div>
    </div>
  );
};

export default SalesDirectorOverview;
