"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { FaDownload } from "react-icons/fa";
import { FaSortUp, FaSortDown } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import * as XLSX from "xlsx"; // Import xlsx library

const PaymentFinance = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const reviewsPerPage = 6;

  // Dummy session data
  const dummySessions = [
    {
      sessionId: "A3J933",
      userExpert: "raihan",
      amount: "$50",
      method: "PayPal",
      status: "Complete",
    },
    {
      sessionId: "A3J934",
      userExpert: "john",
      amount: "$75",
      method: "Stripe",
      status: "Pending",
    },
    {
      sessionId: "A3J935",
      userExpert: "alex",
      amount: "$40",
      method: "Payoneer",
      status: "Ongoing",
    },
    {
      sessionId: "A3J936",
      userExpert: "raihan",
      amount: "$60",
      method: "Bank Transfer",
      status: "Complete",
    },
    {
      sessionId: "A3J937",
      userExpert: "michael",
      amount: "$90",
      method: "PayPal",
      status: "Pending",
    },
    {
      sessionId: "A3J938",
      userExpert: "sara",
      amount: "$30",
      method: "Stripe",
      status: "Ongoing",
    },
    {
      sessionId: "A3J939",
      userExpert: "alex",
      amount: "$45",
      method: "Bank Transfer",
      status: "Complete",
    },
    {
      sessionId: "A3J940",
      userExpert: "raihan",
      amount: "$80",
      method: "PayPal",
      status: "Pending",
    },
  ];

  // Sort sessions based on selected column
  const sortedSessions = [...dummySessions].sort((a, b) => {
    if (sortConfig.key) {
      const valueA = a[sortConfig.key];
      const valueB = b[sortConfig.key];
      if (valueA < valueB) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
    }
    return 0;
  });

  // Filter sessions based on search query and status
  const filteredSessions = sortedSessions.filter(
    (session) =>
      session.sessionId.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (statusFilter === "All" || session.status === statusFilter)
  );

  // Handle button click for Excel Export
  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(filteredSessions); // Convert data to worksheet
    const wb = XLSX.utils.book_new(); // Create a new workbook
    XLSX.utils.book_append_sheet(wb, ws, "Payments"); // Append the worksheet to the workbook

    // Download the Excel file
    XLSX.writeFile(wb, "payments_finance.xlsx");
  };

  // Pagination logic
  const indexOfLastSession = currentPage * reviewsPerPage;
  const indexOfFirstSession = indexOfLastSession - reviewsPerPage;
  const currentSessions = filteredSessions.slice(
    indexOfFirstSession,
    indexOfLastSession
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle sorting
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="flex justify-center w-full p-6 bg-white ">
      <div className="w-11/12">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-[#191919]">
            PAYMENTS AND FINANCE
          </h1>
        </div>

        {/* Search & Filter Section */}
        <div className="flex justify-between items-center mb-6">
          {/* Search Bar + Status Filter */}
          <div className="flex gap-4 items-end">
            {/* Search Bar */}
            <div className="relative w-72">
              <h2 className="text-[#191919] mb-1">Search by Session ID</h2>
              <div className="absolute h-6 w-6 bg-[#EC6453] rounded-full mt-2 ml-2">
                <Search className="m-1 text-white" size={16} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-2 rounded-xl border border-gray-300 w-full bg-gray-100 text-gray-700 focus:outline-none pl-10"
                placeholder="Search by Session ID"
              />
            </div>

            {/* Status Filter */}
            <div className="w-48">
              <h2 className="text-[#191919] mb-1">Filter by Status</h2>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="p-2 w-full rounded-xs border border-gray-300 bg-white text-gray-700 focus:outline-none"
              >
                <option value="All">All Status</option>
                <option value="Complete">Complete</option>
                <option value="Pending">Pending</option>
                <option value="Ongoing">Ongoing</option>
              </select>
            </div>
          </div>

          {/* Export as Excel Button */}
          <button
            onClick={handleExport}
            className="flex items-center gap-2 text-red-500 text-lg font-medium cursor-pointer -mt-10 "
          >
            
            <div className="bg-black p-1 rounded-xs">
              <FaDownload className="text-white rounded-xl" />
            </div>
          </button>
        </div>

        {/* Data Table */}
        <table className="w-full mx-2 mt-13">
          <thead className="bg-white border-y-2 border-[#FA9E93]">
            <tr>
              {[{ key: "sessionId", label: "SESSION ID" },
                { key: "userExpert", label: "USER/EXPERT" },
                { key: "amount", label: "AMOUNT" },
                { key: "method", label: "METHOD" },
                { key: "status", label: "STATUS" }]
                .map((column, index, array) => (
                  <th
                    key={column.key}
                    onClick={() => requestSort(column.key)}
                    className={`p-3 text-center cursor-pointer ${index !== array.length - 1 ? "border-r-2 border-gray-300" : ""
                      }`}
                  >
                    <div className="flex justify-center items-center gap-1">
                      <span>{column.label}</span>
                      <div className="flex flex-col items-center">
                        {sortConfig.key === column.key ? (
                          sortConfig.direction === "asc" ? (
                            <>
                              <FaSortUp className="text-[#EC6453] -mb-1" />
                              <FaSortDown className="text-gray-300" />
                            </>
                          ) : (
                            <>
                              <FaSortUp className="text-gray-300 -mb-1" />
                              <FaSortDown className="text-[#EC6453]" />
                            </>
                          )
                        ) : (
                          <>
                            <FaSortUp className="text-gray-300 -mb-1" />
                            <FaSortDown className="text-gray-300" />
                          </>
                        )}
                      </div>
                    </div>
                  </th>
                ))}
              {/* ✅ Add border to the ACTIONS column */}
              <th className="p-3 text-center border-l-2 border-gray-300">ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {currentSessions.length > 0 ? (
              currentSessions.map((session, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-100 border-b border-gray-200"
                >
                  <td className="p-3 text-center">{session.sessionId}</td>
                  <td className="p-3 text-center">{session.userExpert}</td>
                  <td className="p-3 text-center">{session.amount}</td>
                  <td className="p-3 text-center">{session.method}</td>
                  <td className="p-3 text-center">
                    <div
                      className={`inline-block px-3 py-1 rounded-lg text-white font-semibold ${session.status === "Complete"
                        ? "bg-green-500"
                        : session.status === "Pending"
                          ? "bg-yellow-500"
                          : "bg-blue-500"
                        }`}
                    >
                      {session.status}
                    </div>
                  </td>
                  <td className="p-3 flex justify-center items-center gap-3">
                    <input
                      type="checkbox"
                      title="Approve"
                      className="w-5 h-5 cursor-pointer"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-3 text-center text-gray-500">
                  No sessions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Total Count */}
        <div className="text-center text-sm mt-4 text-[#FA9E93]">
          {filteredSessions.length} {filteredSessions.length === 1 ? "Result" : "Total"}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-4">
          <div className="flex gap-6 p-2 border rounded-lg bg-white">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg ${currentPage === 1 ? "text-gray-300 cursor-not-allowed" : "text-red-500"
                }`}
            >
              <MdKeyboardArrowLeft size={20} />
            </button>

            {[...Array(Math.ceil(filteredSessions.length / reviewsPerPage)).keys()].map(
              (number) => (
                <button
                  key={number + 1}
                  onClick={() => paginate(number + 1)}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg text-base ${currentPage === number + 1
                    ? "bg-red-500 text-white"
                    : "text-[#FA9E93] bg-white"
                    }`}
                >
                  {number + 1}
                </button>
              )
            )}

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={
                currentPage === Math.ceil(filteredSessions.length / reviewsPerPage)
              }
              className={`p-2 rounded-lg ${currentPage === Math.ceil(filteredSessions.length / reviewsPerPage)
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

export default PaymentFinance;
