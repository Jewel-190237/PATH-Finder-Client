import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "S", percentage: 7 },
  { day: "M", percentage: 11 },
  { day: "T", percentage: 14 },
  { day: "W", percentage: 21 },
  { day: "T", percentage: 23 },
  { day: "F", percentage: 5 },
  { day: "S", percentage: 15 },
];

// Custom X-Axis Tick Renderer
const CustomXAxisTick = ({ x, y, payload }) => {
  const { value } = payload;

  // Find the corresponding percentage from the data
  const matchingData = data[payload.index];

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={10}
        textAnchor="middle"
        fill="#fff"
        style={{ fontSize: "14px" }}
      >
        {value}
      </text>
      <text
        x={0}
        y={0}
        dy={25}
        textAnchor="middle"
        fill="#fcb85f"
        style={{ fontSize: "12px" }}
      >
        {matchingData ? `${matchingData.percentage}%` : ""}
      </text>
    </g>
  );
};

const RevenueChart = ({title, revenue}) => {
  return (
    <div
      style={{
        backgroundColor: "#731717",
        color: "white",
        padding: "20px",
        borderRadius: "10px",
        // width: "420px",
      }}
    >
      <div className="flex justify-between">
        <div style={{ marginBottom: "10px" }}>
          <h3 className="description text-[#B0B0B0]">{title}</h3>
          <h1 className="font-bold heading2">{revenue}</h1>
        </div>
        <div style={{ marginTop: "10px" }}>
          <select
            style={{
              backgroundColor: "#3d0000",
              color: "white",
              padding: "5px",
              borderRadius: "5px",
              border: "none",
            }}
          >
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
          </select>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 20, right: 0, left: 0, bottom: 10 }}>
          <XAxis dataKey="day" stroke="#fff" tick={<CustomXAxisTick />} />
          {/* <YAxis stroke="#fff" /> */}
          <Tooltip cursor={{ fill: "rgba(255, 255, 255, 0.2)" }} />
          <Bar dataKey="percentage" fill="#fcb85f" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
