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
import GetUser from "../../../Backend/GetUser";
import { useEffect, useState } from "react";
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

const InvestoryNote = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const user = GetUser();

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://api3.pathxfinder.com/orders", {
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
    (order) =>
      order?.subAdminId === currentUser?._id && order?.status === "paid"
  );

  // Generate sales data grouped by month
  const salesByMonth = sales.reduce((acc, sale) => {
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

  const statistics = [
    { title: `$${currentUser?.balance || 0}`, subtitle: "Revenue" },
    { title: `${sales?.length || 0} course`, subtitle: "Sales" },
    { title: "Canvas Pro", subtitle: "Most sold" },
    { title: `$${currentUser?.visitCount || 0}`, subtitle: "Website traffic" },
  ];

  return (
    <div className="bg-[rgba(35,7,19,0.30)] mt-14">
      <div className="path-container">
        <div className="text-white">
          <h1 className="heading">Affirmation note</h1>
          <p className="max-w-[900px] heading2">
            From buying premium apps and shopping in our exclusive store to
            exchanging dollars securely and recharging your mobile, every action
            you take brings rewards.
          </p>
          <div className="bg-[#78120D] max-w-[310px] mx-auto text-center py-6 px-4 rounded-lg font-semibold hover:bg-red-800 my-4 sm:my-5 md:my-6 lg:my-8 xl:my-10">
            <p className="text-[#B0B0B0] text-14px font-roboto">Low</p>
            <h1 className="heading2">Investory</h1>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6 bg-[rgba(35,7,19,0.30)]">
          {statistics.map((item, index) => (
            <div
              key={index}
              className="bg-[#78120D] hover:bg-red-800 p-4 rounded-lg shadow-md"
            >
              <div className="flex justify-between">
                <p className="text-[#B0B0B0] text-14px font-roboto">
                  {item.subtitle}
                </p>
              </div>
              <h3 className="heading2">{item.title}</h3>
            </div>
          ))}
        </div>

        {currentUser?.role === "subAdmin" && (
          <div className="overflow-x-auto w-full ">
            <div className="bg-[#78120D] mt-10 p-6 rounded-lg text-white shadow-md w-[900px] md:w-full ">
              <h3 className="text-[#B0B0B0] text-14px font-roboto mb-4">
                Sales activities
              </h3>
              <div className="h-60 ">
                <Line data={data} options={options} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvestoryNote;
