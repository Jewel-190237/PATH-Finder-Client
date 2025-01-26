import { useEffect, useState } from "react";
import GetUser from "../../../Backend/GetUser";
import RevenueChart from "../../../CommonChart/RevenueChart";
import Marketing from "../../../CommonChart/Marketing";
import axios from "axios";

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
        const response = await axios.get("http://localhost:5000/all-announcement", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAnnouncements(response.data.announcements); // Assuming data.announcements is the array
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
    const announcementsByDay = announcements.reduce((acc, currentAnnouncement) => {
      const day = new Date(currentAnnouncement.createdAt).getDay();
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    }, {});

    const totalAnnouncements = announcements.length;

    return weekDays.map((day, index) => ({
      day,
      count: announcementsByDay[index] || 0,
      percentage: totalAnnouncements > 0 ? Math.round(((announcementsByDay[index] || 0) / totalAnnouncements) * 100) : 0,
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
      percentage: totalProjects > 0 ? Math.round(((projectsByDay[index] || 0) / totalProjects) * 100) : 0,
    }));
  };

  const projectData = calculateProjectData();

  return (
    <div className="p-5 md:p-10 lg:p-12 xl:p-14 text-white">
      <h1 className="heading2">
        WellCome Back <span className="heading">{currentUser?.name}</span> Good
        Afternoon
      </h1>
      <div className="mt-4 md:mt-5 lg:mt-6 xl:mt-8 grid justify-between grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4 xl:gap-6">
        <RevenueChart title={"Total Sales"} revenue={totalSales} data={revenueData} />
        <RevenueChart title={"Total Announcements"} revenue={announcements.length} data={announcementData} />
        <RevenueChart title={"Total Projects"} revenue={projects.length} data={projectData} />
      </div>

      <h3 className="heading2 py-3 lg:py-4 xl:py-6">Course activities</h3>
      <div className="bg-[#F6170C] bg-opacity-20 px-4 py-3 rounded-xl">
        <div className="flex items-center justify-between">
          <h2 className="heading2">CEO Activities</h2>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-[#8979FF] bg-opacity-30 flex items-center justify-center">
                <div className="h-[10px] w-[10px] rounded-full bg-[#8979FF]"></div>
              </div>
              <p>Canava</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-[#FF928A] bg-opacity-30 flex items-center justify-center">
                <div className="h-[10px] w-[10px] rounded-full bg-[#FF928A]"></div>
              </div>
              <p>E-Book</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-[#3CC3DF] bg-opacity-30 flex items-center justify-center">
                <div className="h-[10px] w-[10px] rounded-full bg-[#3CC3DF]"></div>
              </div>
              <p>Copyright</p>
            </div>
          </div>
        </div>
        <div className="mt-3 lg:mt-4 flex items-center flex-col sm:flex-row justify-between w-full gap-3 md:gap-4 xl:gap-6">
          <Marketing title={"Revenue"} amount={"12,000"} />
          <Marketing title={"Sales"} amount={"6,000"} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
