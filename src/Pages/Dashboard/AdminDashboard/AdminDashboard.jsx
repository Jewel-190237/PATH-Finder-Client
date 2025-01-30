
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

import { useEffect, useState } from "react";
import GetUser from "../../../Backend/GetUser";
import RevenueChart from "../../../CommonChart/RevenueChart";
import axios from "axios";
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

const AdminDashboard = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [order, setOrder] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [projects, setProjects] = useState([]);
  const user = GetUser();

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  // Get all orders (Revenue)
  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:5000/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrder(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrders();
  }, []);

  const totalSales = Array.isArray(order)
    ? order.reduce((acc, order) => acc + order.amount, 0)
    : 0;

  // Get all announcements
  useEffect(() => {
    const fetchAnnouncements = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "http://localhost:5000/all-announcement",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAnnouncements(response.data.announcements);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAnnouncements();
  }, []);

  // Get all projects
  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:5000/all-project", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProjects(response.data.projects); // Assuming the response contains projects in a 'projects' array
      } catch (err) {
        console.error(err);
      }
    };
    fetchProjects();
  }, []);

  // Revenue Calculation per day
  const calculateRevenueData = () => {
    if (!Array.isArray(order)) return [];

    const weekDays = ["S", "M", "T", "W", "T", "F", "S"];
    const revenueByDay = order.reduce((acc, currentOrder) => {
      const day = new Date(currentOrder.createdAt).getDay();
      acc[day] = (acc[day] || 0) + currentOrder.amount;
      return acc;
    }, {});

    return weekDays.map((day, index) => ({
      day,
      percentage: Math.round((revenueByDay[index] || 0) / 100),
    }));
  };
  const revenueData = calculateRevenueData();

  // Announcement Data
  const calculateAnnouncementData = () => {
    if (!Array.isArray(announcements)) return [];

    const weekDays = ["S", "M", "T", "W", "T", "F", "S"];
    const announcementsByDay = announcements.reduce(
      (acc, currentAnnouncement) => {
        const day = new Date(currentAnnouncement.createdAt).getDay();
        acc[day] = (acc[day] || 0) + 1;
        return acc;
      },
      {}
    );

    const totalAnnouncements = announcements.length;

    return weekDays.map((day, index) => ({
      day,
      count: announcementsByDay[index] || 0,
      percentage:
        totalAnnouncements > 0
          ? Math.round(
              ((announcementsByDay[index] || 0) / totalAnnouncements) * 100
            )
          : 0,
    }));
  };
  const announcementData = calculateAnnouncementData();

  // Project Data
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
      percentage:
        totalProjects > 0
          ? Math.round(((projectsByDay[index] || 0) / totalProjects) * 100)
          : 0,
    }));
  };
  const projectData = calculateProjectData();
  const paidOrder = order.filter((order) => order.status === "paid");

  // Generate sales data grouped by month
  const salesByMonth = paidOrder.reduce((acc, sale) => {
    const month = moment(sale.createdAt).format("MMM");
    acc[month] = (acc[month] || 0) + sale.amount;
    return acc;
  }, {});

  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
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

  return (
    <div className="p-5 md:p-10 lg:p-12 xl:p-14 text-white">
      <h1 className="heading2">
        WellCome Back <span className="heading">{currentUser?.name}</span> Good
        Afternoon
      </h1>
      <div className="mt-4 md:mt-5 lg:mt-6 xl:mt-8 grid justify-between grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4 xl:gap-6">
        <RevenueChart
          title={"Total Sales"}
          revenue={totalSales}
          data={revenueData}
        />
        <RevenueChart
          title={"Total Announcements"}
          revenue={announcements.length}
          data={announcementData}
        />
        <RevenueChart
          title={"Total Projects"}
          revenue={projects.length}
          data={projectData}
        />
      </div>

      <div className="bg-[#78120D] mt-10 p-6 rounded-lg text-white shadow-md">
        <h3 className="text-[#B0B0B0] text-14px font-roboto mb-4">
          Sales activities
        </h3>
        <div className="h-64">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
