"use client";

import React from "react";
import { Line } from "react-chartjs-2";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const GraphComponent = () => {
  // Dummy data for area charts
  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Overall Revenue",
        data: [100, 200, 300, 250, 400, 350, 500],
        backgroundColor: "rgba(34, 197, 94, 0.2)", // Light green fill
        borderColor: "rgba(34, 197, 94, 1)", // Green border
        fill: true,
      },
    ],
  };

  const amdData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "AMd Revenue",
        data: [90, 180, 260, 230, 380, 320, 480],
        backgroundColor: "rgba(34, 197, 94, 0.2)", // Light green fill
        borderColor: "rgba(34, 197, 94, 1)", // Green border
        fill: true,
      },
    ],
  };

  // Dynamic percentage calculation
  const calculatePercentageChange = (data) => {
    const lastValue = data[data.length - 1];
    const secondLastValue = data[data.length - 2];
    const change = ((lastValue - secondLastValue) / secondLastValue) * 100;
    return change.toFixed(2);
  };

  // Get percentage changes
  const overallChange = calculatePercentageChange(revenueData.datasets[0].data);
  const amdChange = calculatePercentageChange(amdData.datasets[0].data);

  // Add "increase" or "decrease" after the percentage
  const getChangeText = (change) => {
    return change >= 0 ? `${Math.abs(change)}% increase` : `${Math.abs(change)}% decrease`;
  };

  const overallChangeText = getChangeText(overallChange);
  const amdChangeText = getChangeText(amdChange);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false, // Hide X-axis
      },
      y: {
        display: false, // Hide Y-axis
      },
    },
  };

  return (
    <div className="flex justify-between w-[900px] mb-6 space-x-4 gap-10">
      {/* Overall Revenue Chart */}
      <div className="w-1/2 bg-gray-100 p-4 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[#191919] text-lg font-semibold">Overall Revenue</h3>
          <div className={`flex items-center text-sm ${overallChange >= 0 ? "text-green-500" : "text-red-500"}`}>
            {overallChange >= 0 ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
            {overallChangeText}
          </div>
        </div>
        <p className="text-xl font-bold mb-2">$250,000</p>
        <Line data={revenueData} options={options} />
      </div>

      {/* AMd Revenue Chart */}
      <div className="w-1/2 bg-gray-100 p-4 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[#191919] text-lg font-semibold">AMd Revenue</h3>
          <div className={`flex items-center text-sm ${amdChange >= 0 ? "text-green-500" : "text-red-500"}`}>
            {amdChange >= 0 ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
            {amdChangeText}
          </div>
        </div>
        <p className="text-xl font-bold mb-2">$100,000</p>
        <Line data={amdData} options={options} />
      </div>
    </div>
  );
};

export default GraphComponent;
