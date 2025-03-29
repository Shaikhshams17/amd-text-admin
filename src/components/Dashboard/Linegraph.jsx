"use client";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";

// Data for the chart
const data = [
  { time: "06:00 AM", users: 400 },
  { time: "08:00 AM", users: 500 },
  { time: "10:00 AM", users: 450 },
  { time: "12:00 AM", users: 470 },
  { time: "02:00 PM", users: 300 },
  { time: "04:00 PM", users: 600 },
  { time: "06:00 PM", users: 580 },
  { time: "08:00 PM", users: 700 },
  { time: "10:00 PM", users: 500 },
  { time: "12:00 PM", users: 520 },
];

const UserGraph = () => {
  return (
    <div>
       <div className="h-0.5 w-[76rem] bg-gray-300 ml-5"></div>
    <div className="w-full flex flex-col items-center justify-center my-10 -mx-40">
      <h2 className="text-2xl font-semibold mb-4 mr-[45%]">
        Time wise Users Installed App
      </h2>
      
{/* Bar for Users */}

      <div className="w-[1101px] h-[400px] ml-[165px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            
            {/* Bar for Users */}
            <Bar dataKey="users" barSize={30} fill="#A9A9A9" name="Users Count" />
            {/* Line for Users */}
            <Line
              type="monotone"
              dataKey="users"
              stroke="#6A5ACD"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
            
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
    </div>
  );
};

export default UserGraph;
