"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Download, Search } from "lucide-react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { FaSortUp, FaSortDown } from "react-icons/fa";
import { utils, writeFile } from "xlsx";

import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdArrowUpward,
} from "react-icons/md";
import { Line } from "react-chartjs-2";
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
  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Overall Revenue",
        data: [100, 200, 300, 250, 400, 350, 500],
        backgroundColor: "rgba(34, 197, 94, 0.2)",
        borderColor: "rgba(34, 197, 94, 1)",
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
        backgroundColor: "rgba(34, 197, 94, 0.2)",
        borderColor: "rgba(34, 197, 94, 1)",
        fill: true,
      },
    ],
  };

  const calculatePercentageChange = (data) => {
    const lastValue = data[data.length - 1];
    const secondLastValue = data[data.length - 2];
    const change = ((lastValue - secondLastValue) / secondLastValue) * 100;
    return change.toFixed(2);
  };

  const overallChange = calculatePercentageChange(revenueData.datasets[0].data);
  const amdChange = calculatePercentageChange(amdData.datasets[0].data);

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
        display: false,
      },
      y: {
        display: false,
      },
    },
  };

  return (
    <div className="flex justify-between w-full mb-10 gap-8 mt-10">
      {/* Overall Revenue */}
      <div className="flex flex-col items-start ">
        <h1 className="text-xl mb-4">TOTAL REVENUE</h1>
        <div className="w-[300px] bg-white p-4 rounded-lg  shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[#191919] text-xs font-semibold">Overall Revenue</h3>
            <div
              className={`flex items-center text-sm ${overallChange >= 0 ? "text-green-500" : "text-red-500"
                }`}
            >
              {overallChange >= 0 ? (
                <FaArrowUp className="mr-1" />
              ) : (
                <FaArrowDown className="mr-1" />
              )}
              {overallChangeText}
            </div>
          </div>
          <p className="text-xl font-bold mb-2">$250,000</p>
          {/* Smaller Graph */}
          <div className="w-full h-32">
            <Line data={revenueData} options={options} />
          </div>
        </div>
      </div>

      {/* AMD Revenue */}
      <div className="flex flex-col items-start">
        <h1 className="text-xl mb-4">AMD SHARE</h1>
        <div className="w-[300px] bg-white p-4 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[#191919] text-xs font-semibold">AMD Revenue</h3>
            <div
              className={`flex items-center text-sm ${amdChange >= 0 ? "text-green-500" : "text-red-500"
                }`}
            >
              {amdChange >= 0 ? (
                <FaArrowUp className="mr-1" />
              ) : (
                <FaArrowDown className="mr-1" />
              )}
              {amdChangeText}
            </div>
          </div>
          <p className="text-xl font-bold mb-2">$100,000</p>
          {/* Smaller Graph */}
          <div className="w-full h-32">
            <Line data={amdData} options={options} />
          </div>
        </div>
      </div>
    </div>

  );
};


const Overview = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortColumn, setSortColumn] = useState("transactionId");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedExpert, setSelectedExpert] = useState("All");
  const reviewsPerPage = 6;
  const router = useRouter();

  const dummySessions = [
    { transactionId: "A3J933", expert: "raihan", amount: "$50", status: "Not Processed", date: "2025-03-20" },
    { transactionId: "A3J934", expert: "john", amount: "$75", status: "Not Withdrawn", date: "2025-03-18" },
    { transactionId: "A3J935", expert: "alex", amount: "$40", status: "Withdrawn", date: "2025-03-19" },
    { transactionId: "A3J936", expert: "raihan", amount: "$60", status: "Not Processed", date: "2025-03-17" },
    { transactionId: "A3J937", expert: "michael", amount: "$90", status: "Withdrawn", date: "2025-03-16" },
    { transactionId: "A3J938", expert: "sara", amount: "$30", status: "Not Processed", date: "2025-03-21" },
    { transactionId: "A3J939", expert: "alex", amount: "$45", status: "Not Processed", date: "2025-03-15" },
    { transactionId: "A3J940", expert: "raihan", amount: "$80", status: "Not Withdrawn", date: "2025-03-14" },
    { transactionId: "A3J937", expert: "michael", amount: "$90", status: "Withdrawn", date: "2025-03-16" },
    { transactionId: "A3J938", expert: "sara", amount: "$30", status: "Not Processed", date: "2025-03-21" },
    { transactionId: "A3J939", expert: "alex", amount: "$45", status: "Not Processed", date: "2025-03-15" },
    { transactionId: "A3J940", expert: "raihan", amount: "$80", status: "Not Withdrawn", date: "2025-03-14" },
  ];

  const uniqueExperts = ["All", ...new Set(dummySessions.map((session) => session.expert))];

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const handleExport = () => {
    router.push("/export-page");
  };

  const filteredSessions = dummySessions.filter(
    (session) =>
      (selectedExpert === "All" || session.expert === selectedExpert) &&
      (statusFilter === "All" || session.status === statusFilter) &&
      (searchQuery === "" || session.transactionId.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const sortedSessions = filteredSessions.sort((a, b) => {
    let aValue = a[sortColumn];
    let bValue = b[sortColumn];

    if (sortColumn === "amount") {
      aValue = parseFloat(aValue.replace("$", ""));
      bValue = parseFloat(bValue.replace("$", ""));
    } else if (sortColumn === "date") {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }

    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const indexOfLastSession = currentPage * reviewsPerPage;
  const indexOfFirstSession = indexOfLastSession - reviewsPerPage;
  const currentSessions = sortedSessions.slice(indexOfFirstSession, indexOfLastSession);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const downloadExcel = () => {
    // Prepare the data to be exported
    const exportData = filteredSessions.map((session) => ({
      transactionId: session.transactionId,
      expert: session.expert,
      amount: session.amount,
      status: session.status,
      date: session.date,
    }));
  
    // Convert the data to a worksheet
    const ws = utils.json_to_sheet(exportData);
    const wb = utils.book_new();
    
    // Append the worksheet to the workbook
    utils.book_append_sheet(wb, ws, "PendingSessions");
  
    // Write the workbook to a file
    writeFile(wb, "PendingSessions.xlsx");
  };
  

  return (
    <div className="flex justify-center w-full p-6 bg-white">
      <div className="w-11/12">
        <GraphComponent />
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-[#191919]">PENDING PAYMENTS</h1>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4 items-end">
            {/* Select Expert */}
            <div className="w-52">
              <h2 className="text-[#191919] mb-1">Select Expert</h2>
              <select
                value={selectedExpert}
                onChange={(e) => setSelectedExpert(e.target.value)}
                className="p-2 w-52 rounded-xl border border-black bg-[#E6E6E6] text-red-600 focus:outline-none"
              >
                {uniqueExperts.map((expert) => (
                  <option key={expert} value={expert}>
                    {expert}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter by Status */}
            <div className="w-48">
              <h2 className="text-[#191919] mb-1">Select by Status</h2>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="p-2 w-full rounded-xl border border-black bg-[#E6E6E6] text-red-600 focus:outline-none"
              >
                <option value="All">All Time</option>
                <option value="Not Processed">Not Processed</option>
                <option value="Not Withdrawn">Not Withdrawn</option>
                <option value="Withdrawn">Withdrawn</option>
              </select>
            </div>

            {/* Search by Transaction ID */}
            <div className="w-56">
              <h2 className="text-[#191919] mb-1 ">Search by Transaction ID</h2>
             <Search className="absolute transform text-gray-200 bg-red-500 rounded-full border border-red-500 ml-2 mt-3" size={18} />
              
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                
                className="p-2 w-full rounded-xl border border-black bg-[#E6E6E6] text-gray-700 focus:outline-none pl-10"
              />
            </div>
          </div>

          <button 
            onClick={downloadExcel} 
            className="flex mt-8 items-center justify-center w-12 h-12 bg-black text-white rounded-lg"
          >
            <Download size={24} className="text-white" />
          </button>
        </div>

        <table className="w-full">
        <thead className="bg-white border-y-2 border-red-500">
  <tr className="border-t border-b border-red-500"> 
    {[
      { label: "TRANSACTION ID", column: "transactionId", isCloser: true },
      { label: "EXPERT", column: "expert", isCloser: false },
      { label: "AMOUNT", column: "amount", isCloser: false },
      { label: "STATUS", column: "status", isCloser: false },
      { label: "DATE", column: "date", isCloser: false },
    ].map(({ label, column, isCloser }, index) => (
      <th
        key={column}
        className={`p-3 text-center cursor-pointer 
          ${index !== 0 ? "border-l border-gray-500" : ""} 
          ${index !== 0 ? "py-4" : "py-3"} 
          border-t border-b
          ${index !== 0 ? "mt-2" : ""} // Adding margin-top to avoid closeness to the red border
        `}
        onClick={() => handleSort(column)}
      >
        <div className={`flex justify-center items-center ${isCloser ? "gap-2" : "gap-5"}`}>
          {label}
          <div className="flex flex-col">
            <FaSortUp
              className={`text-sm ${sortColumn === column && sortOrder === "asc" ? "text-black" : "text-black"}`}
            />
            <FaSortDown
              className={`text-sm ${sortColumn === column && sortOrder === "desc" ? "text-black" : "text-black"}`}
            />
          </div>
        </div>
      </th>
    ))}
  </tr>
</thead>






          {/* Table Body */}
          <tbody>
            {currentSessions.length > 0 ? (
              currentSessions.map((session, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-100 border-b border-gray-200 cursor-pointer"
                >
                  <td className="p-3 text-center">{session.transactionId}</td>
                  <td className="p-3 text-center">{session.expert}</td>
                  <td className="p-3 text-center">{session.amount}</td>

                  {/* Updated Status Cell with Conditional Coloring */}
                  <td
                    className={`p-3 text-center ${session.status === "Withdrawn"
                      ? "text-green-500"
                      : session.status === "Not Processed" || session.status === "Not Withdrawn"
                        ? "text-red-500"
                        : "text-gray-700"
                      }`}
                  >
                    {session.status}
                  </td>

                  <td className="p-3 text-center">{session.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-3 text-center text-gray-500">
                  No sessions found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Total Sessions Info */}
        <div className="flex justify-center items-center mt-4 mb-2 text-gray-700">
          <p className="text-sm text-red-500">{filteredSessions.length} Total</p>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-4">
          <div className="flex gap-2 p-2 border rounded-lg bg-white shadow-lg shadow-gray-400">
            {/* Previous Button */}
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg ${currentPage === 1
                ? "text-gray-500 cursor-not-allowed"
                : "text-red-500"
                }`}
            >
              <MdKeyboardArrowLeft size={20} />
            </button>

            {/* Page Numbers with Ellipsis */}
            {(() => {
              const totalPages = Math.ceil(sortedSessions.length / reviewsPerPage);
              const pages = [];

              if (totalPages <= 5) {
                for (let i = 1; i <= totalPages; i++) {
                  pages.push(
                    <button
                      key={i}
                      onClick={() => paginate(i)}
                      className={`w-8 h-8 flex items-center justify-center rounded-lg text-base border ${currentPage === i
                        ? "bg-red-500 text-white border-red-500"
                        : "text-[#FA9E93] bg-white border-gray-300"
                        }`}
                    >
                      {i}
                    </button>
                  );
                }
              } else {
                pages.push(
                  <button
                    key={1}
                    onClick={() => paginate(1)}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg text-base border ${currentPage === 1
                      ? "bg-red-500 text-white border-red-500"
                      : "text-[#FA9E93] bg-white border-gray-300"
                      }`}
                  >
                    1
                  </button>
                );

                if (currentPage > 3) {
                  pages.push(<span key="ellipsis1" className="text-gray-500">...</span>);
                }

                for (
                  let i = Math.max(2, currentPage - 1);
                  i <= Math.min(totalPages - 1, currentPage + 1);
                  i++
                ) {
                  pages.push(
                    <button
                      key={i}
                      onClick={() => paginate(i)}
                      className={`w-8 h-8 flex items-center justify-center rounded-lg text-base border ${currentPage === i
                        ? "bg-red-500 text-white border-red-500"
                        : "text-[#FA9E93] bg-white border-gray-300"
                        }`}
                    >
                      {i}
                    </button>
                  );
                }

                if (currentPage < totalPages - 2) {
                  pages.push(<span key="ellipsis2" className="text-gray-500">...</span>);
                }

                pages.push(
                  <button
                    key={totalPages}
                    onClick={() => paginate(totalPages)}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg text-base border ${currentPage === totalPages
                      ? "bg-red-500 text-white border-red-500"
                      : "text-[#FA9E93] bg-white border-gray-300"
                      }`}
                  >
                    {totalPages}
                  </button>
                );
              }
              return pages;
            })()}

            {/* Next Button */}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(sortedSessions.length / reviewsPerPage)}
              className={`p-2 rounded-lg ${currentPage === Math.ceil(sortedSessions.length / reviewsPerPage)
                ? "text-gray-300 cursor-not-allowed"
                : "text-red-500"
                }`}
            >
              <MdKeyboardArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;



