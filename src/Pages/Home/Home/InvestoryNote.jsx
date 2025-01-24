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
  const user = GetUser();
  useEffect(() => {
    setCurrentUser(user);
  }, [user]);
  const statistics = [
    { title: `$${currentUser?.balance || 0}`, subtitle: "Revenue" },
    { title: `$${currentUser?.sales || 0}`, subtitle: "Sales" },
    { title: "Canva Pro", subtitle: "Most sold" },
    { title: "485417", subtitle: "Website traffic" },
  ];

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Sales Activities",
        data: [30000, 45000, 32000, 50000, 42000, 60000, 70000],
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
    <div className="bg-[rgba(35,7,19,0.30)] mt-14">
      <div className="max-w-[1320px] mx-auto">
        <div className=" text-white">
          <h1 className="heading">Affirmation note</h1>
          <p className="max-w-[900px] heading2">
            From buying premium apps and shopping in our exclusive store to
            exchanging dollars securely and recharging your mobile, every action
            you take brings rewards.
          </p>
          <div className="bg-[#78120D] max-w-[310px] mx-auto text-center py-6 px-4 rounded-lg font-semibold hover:bg-red-800 my-14">
            <p className="text-[#B0B0B0] text-14px font-roboto">Low</p>
            <h1 className="heading2">Investory</h1>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-[rgba(35,7,19,0.30)] py-6">
          {statistics.map((item, index) => (
            <div key={index} className="bg-[#78120D]  p-4 rounded-lg shadow-md">
              <div className="flex justify-between">
                <p className="text-[#B0B0B0] text-14px font-roboto">
                  {item.subtitle}
                </p>
              </div>
              <h3 className="heading2">{item.title}</h3>
            </div>
          ))}
        </div>

        {/* Chart Section */}
        <div className="bg-[#78120D] mt-10 p-6 rounded-lg text-white shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[#B0B0B0] text-14px font-roboto">
              Sales activities
            </h3>
            <select className="bg-[#20010D] text-white py-1 px-3 rounded-md">
              <option>Monthly</option>
              <option>Weekly</option>
              <option>Daily</option>
            </select>
          </div>
          <div className="h-64">
            <Line data={data} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestoryNote;
