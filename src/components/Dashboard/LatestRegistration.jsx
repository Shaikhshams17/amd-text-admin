"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register Chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LatestRegistration = () => {
  // X-axis labels (example times)
  const labels = [
    "06:00 AM",
    "09:00 AM",
    "12:00 PM",
    "03:00 PM",
    "06:00 PM",
    "09:00 PM",
    "12:00 AM",
  ];

  // Y-axis ticks to display
  const yTicks = [100, 200, 300, 400, 500, 1000, 2000];

  // Chart datasets
  const data = {
    labels,
    datasets: [
      {
        label: "USA",
        data: [200, 400, 350, 700, 500, 1200, 1800],
        borderColor: "#5858FA",
        backgroundColor: "#5858FA",
        pointBackgroundColor: "#5858FA",
        pointBorderColor: "#5858FA",
        pointRadius: 4,
        tension: 0.4,
      },
      {
        label: "India",
        data: [150, 250, 450, 400, 800, 1300, 1900],
        borderColor: "#C91416",
        backgroundColor: "#C91416",
        pointBackgroundColor: "#C91416",
        pointBorderColor: "#C91416",
        pointRadius: 4,
        tension: 0.4,
      },
      {
        label: "China",
        data: [300, 500, 400, 600, 700, 1000, 1200],
        borderColor: "#368D59",
        backgroundColor: "#368D59",
        pointBackgroundColor: "#368D59",
        pointBorderColor: "#368D59",
        pointRadius: 4,
        tension: 0.4,
      },
      {
        label: "Belarus",
        data: [100, 200, 300, 250, 450, 500, 700],
        borderColor: "#5E5E5E",
        backgroundColor: "#5E5E5E",
        pointBackgroundColor: "#5E5E5E",
        pointBorderColor: "#5E5E5E",
        pointRadius: 4,
        tension: 0.4,
      },
      {
        label: "Ukraine",
        data: [200, 150, 500, 600, 900, 1500, 2000],
        borderColor: "#8E00B6",
        backgroundColor: "#8E00B6",
        pointBackgroundColor: "#8E00B6",
        pointBorderColor: "#8E00B6",
        pointRadius: 4,
        tension: 0.4,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: "#808080",
        },
        grid: {
          display: false,
        },
      },
      y: {
        min: 0,
        max: 2000,
        ticks: {
          color: "#808080",
          stepSize: 100,
          callback: function (value) {
            if (yTicks.includes(value)) {
              return value;
            }
            return "";
          },
        },
        grid: {
          color: "#e0e0e0",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="p-4 space-y-6 w-[1200px]">
      {/* Admin Greeting + Latest Registration Box */}
      <div className="space-y-4">
        {/* Admin Greeting */}
        <div className="text-left text-lg font-semibold text-gray-800">
          Hey, Admin
        </div>

        {/* Latest Registration Box */}
        <div
          className="flex justify-between items-center p-4 rounded-lg shadow-md"
          style={{ background: "linear-gradient(to right, #232323, #FFFFFF)" }}
        >
          <h2 className="text-white text-lg font-semibold">
            Latest Registration Users
          </h2>
          <div className="text-right text-gray-900 text-sm">
            <span className="text-gray-600">Just Now</span>{" "}
            <span className="font-bold">XYZ Name</span>{" "}
            <span className="text-gray-700">xyz@gmail.com</span>{" "}
            <span className="text-gray-800">
              From <strong>India</strong>
            </span>
          </div>
        </div>
      </div>
      <div className="h-0.5 w-[75rem] bg-gray-300"></div>
      {/* Chart Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Latest Registrations</h2>
        <div className="flex">
          {/* Chart Container */}
          <div className="w-3/4 h-96">
            <Line data={data} options={options} />
          </div>

          {/* Right-Side Card */}
          <div className="w-1/4 pl-4">
            <div className="bg-[#E6E6E6] rounded-md p-4 space-y-4">
              {/* USA */}
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span
                    className="inline-block h-3 w-3 rounded-full"
                    style={{ backgroundColor: "#5858FA" }}
                  />
                  <span>USA</span>
                </div>
                <span>37%</span>
              </div>
              {/* India */}
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span
                    className="inline-block h-3 w-3 rounded-full"
                    style={{ backgroundColor: "#C91416" }}
                  />
                  <span>India</span>
                </div>
                <span>2.4%</span>
              </div>
              {/* China */}
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span
                    className="inline-block h-3 w-3 rounded-full"
                    style={{ backgroundColor: "#368D59" }}
                  />
                  <span>China</span>
                </div>
                <span>30%</span>
              </div>
              {/* Belarus */}
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span
                    className="inline-block h-3 w-3 rounded-full"
                    style={{ backgroundColor: "#5E5E5E" }}
                  />
                  <span>Belarus</span>
                </div>
                <span>12%</span>
              </div>
              {/* Ukraine */}
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span
                    className="inline-block h-3 w-3 rounded-full"
                    style={{ backgroundColor: "#8E00B6" }}
                  />
                  <span>Ukraine</span>
                </div>
                <span>18%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestRegistration;
