import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "S", Canva: 20, "E-Book": 50, Copyright: 30 },
  { day: "S", Canva: 50, "E-Book": 20, Copyright: 40 },
  { day: "M", Canva: 80, "E-Book": 70, Copyright: 50 },
  { day: "T", Canva: 30, "E-Book": 90, Copyright: 60 },
  { day: "W", Canva: 70, "E-Book": 50, Copyright: 80 },
  { day: "T", Canva: 20, "E-Book": 40, Copyright: 30 },
  { day: "F", Canva: 40, "E-Book": 60, Copyright: 50 },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#3d0000] text-white p-2 rounded shadow-md">
        <p className="text-sm font-semibold">{`Value: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const Marketing = ({ title, amount }) => {
  return (
    <div
      className="bg-[#78120D] text-white p-6 rounded-lg shadow-md w-full"
    >
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-sm uppercase font-semibold">{title}</h3>
          <h1 className="text-3xl font-bold">${amount}</h1>
        </div>
        <select className="bg-[#3d0000] text-white p-1 rounded-md focus:outline-none">
          <option>Today</option>
          <option>This Week</option>
          <option>This Month</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorCanva" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8979FF" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#6a5acd" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorEBook" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF928A" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#FF928A" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorCopyright" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3CC3DF" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#3CC3DF" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#522222" />
          <XAxis dataKey="day" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="Canva"
            stroke="#6a5acd"
            fill="url(#colorCanva)"
            fillOpacity={1}
          />
          <Area
            type="monotone"
            dataKey="E-Book"
            stroke="#cd5c5c"
            fill="url(#colorEBook)"
            fillOpacity={1}
          />
          <Area
            type="monotone"
            dataKey="Copyright"
            stroke="#00bfff"
            fill="url(#colorCopyright)"
            fillOpacity={1}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Marketing;
