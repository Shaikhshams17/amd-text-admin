"use client";

import { PieChart, Pie, Cell, Tooltip } from "recharts";

// Pie chart data
const data = [
  { country: "India", value: 844, color: "#FF0000", active: 32 },
  { country: "United Arab Emirates", value: 896, color: "#FF7300", active: 85 },
  { country: "Ukraine", value: 742, color: "#00C49F", active: 15 },
  { country: "Romania", value: 741, color: "#8E00B6", active: 29 },
  { country: "Netherlands", value: 651, color: "#3A77F5", active: 50 },
  { country: "Belarus", value: 122, color: "#888888", active: 5 },
];

const UserCountryGraph = () => {
  return (
    <div>
    <div className="h-0.5 w-[76rem] bg-gray-300 ml-6 "></div>
      
      <div className="w-full flex flex-col items-center my-10 space-y-6 -mx-60">
        {/* Title */}
        <h2 className="text-2xl font-semibold mb-4 mr-[41%]">Users Per Country</h2>

        {/* Main Graph and Stats Container */}
        <div className="flex flex-col items-center gap-8 w-[68.75rem] mx-auto">
          {/* Graph Section */}
          <div className="flex justify-center ml-20">
            <PieChart width={600} height={300}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={0} // Reduced to make it more filled inside
                outerRadius={120}
                fill="#8884d8"
                paddingAngle={0}
                dataKey="value"
                label={({ index }) => data[index]?.country} // Show country names
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>

          {/* Stats Section - 6 Divs */}
          <div className="grid grid-cols-3 gap-6 w-full ml-[24rem]">
            {data.map((item) => (
              <div
                key={item.country}
                className="bg-gray-100 border rounded-lg p-4 shadow-md w-full flex flex-col justify-between"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold -translate-y-4">{item.country}</h3>
                  <span className="text-4xl font-bold translate-y-8">{item.value}</span>
                </div>
                <div className="text-sm text-gray-600">
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-red-600">
                    {/* Green Dot */}
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full "></div>
                    Active {item.active} Users
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
   
  );
};

export default UserCountryGraph;
