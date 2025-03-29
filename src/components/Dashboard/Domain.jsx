"use client";

import { Pie, PieChart, Cell, Tooltip } from "recharts";

// Pie Chart Data
const chartData = [
  { domain: "Home", value: 25, fill: "#5858FA" },
  { domain: "Career and Business", value: 50, fill: "#8E00B6" },
  { domain: "Wellness", value: 20, fill: "#FF4016" },
  { domain: "Others", value: 5, fill: "#737373" },
];

// Table data with domain, percentage, new users, and total users
const domainStats = [
  {
    domain: "Career and Business",
    percent: "50%",
    newUsers: "778",
    totalUsers: "3774",
    color: "#8E00B6",
  },
  {
    domain: "Home",
    percent: "25%",
    newUsers: "378",
    totalUsers: "2774",
    color: "#5858FA",
  },
  {
    domain: "Wellness",
    percent: "20%",
    newUsers: "86",
    totalUsers: "726",
    color: "#FF4016",
  },
  {
    domain: "Others",
    percent: "5%",
    newUsers: "12",
    totalUsers: "125",
    color: "#737373",
  },
];

const Domain = () => {
  return (
    <div>
       <div className="h-0.5 w-[76rem] bg-gray-300 mt-10 ml-5"></div>

      {/* Main Container */}
      <div className="w-[68.75rem] mx-[3rem] my-10 rounded-lg p-8">
        {/* Header Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold -ml-16">
            Domain-wise Experts Popularity among Users
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* LEFT SIDE: Pie Chart */}
          <div className="md:w-1/2 w-full flex flex-col items-center ">
            <PieChart width={650} height={500}>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={0} // Increased to fill inside more
                outerRadius={160} // Increased to fill the space
                fill="#8884d8"
                paddingAngle={0}
                dataKey="value"
                label={({ index }) => chartData[index]?.domain} // Show domain names
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>

            {/* Legend Below Pie Chart */}
            <div className="flex flex-wrap gap-6 text-sm justify-center mt-4">
              {chartData.map((item) => (
                <div key={item.domain} className="flex items-center space-x-2">
                  <span
                    className="inline-block h-4 w-4 rounded-full"
                    style={{ backgroundColor: item.fill }}
                  />
                  <span className="text-base">{item.domain}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE: Domain Statistics Panel */}
          <div className="md:w-1/2 w-full space-y-6">
            {domainStats.map((item) => (
              <div
                key={item.domain}
                className="grid grid-cols-3 gap-6 items-center border-b pb-4"
              >
                {/* Left Section: Domain + Percentage */}
                <div className="flex items-center space-x-3">
                  <span
                    className="inline-block h-4 w-4 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="flex flex-col">
                    <span
                      className="font-semibold text-[13px]"
                      style={{ color: item.color }}
                    >
                      {item.domain}
                    </span>
                    <span
                      className="text-lg font-semibold"
                      style={{ color: item.color }}
                    >
                      {item.percent} ↑
                    </span>
                  </div>
                </div>

                {/* Middle Section: New Users */}
                <div className="text-center">
                  <span className="text-base text-muted-foreground">
                    <span className="font-semibold text-lg">{item.newUsers}</span>{" "}
                    New users
                  </span>
                </div>

                {/* Right Section: Total Users */}
                <div className="text-right">
                  <span className="text-base text-muted-foreground">
                    Total <br />
                    <span className="font-semibold text-lg">{item.totalUsers}</span>{" "}
                    <br />
                    users
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

export default Domain;
