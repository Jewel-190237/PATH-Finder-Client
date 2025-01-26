import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomXAxisTick = ({ x, y, payload, data }) => {
  const { value } = payload;
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

const RevenueChart = ({ title, revenue, data }) => {
  return (
    <div
      style={{
        backgroundColor: "#731717",
        color: "white",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <div className="flex justify-between">
        <div style={{ marginBottom: "10px" }}>
          <h3 className="description text-[#B0B0B0]">{title}</h3>
          <h1 className="font-bold heading2">{revenue}</h1>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 20, right: 0, left: 0, bottom: 10 }}>
          <XAxis
            dataKey="day"
            stroke="#fff"
            tick={<CustomXAxisTick data={data} />}
          />
          <Tooltip cursor={{ fill: "rgba(255, 255, 255, 0.2)" }} />
          <Bar dataKey="percentage" fill="#fcb85f" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
