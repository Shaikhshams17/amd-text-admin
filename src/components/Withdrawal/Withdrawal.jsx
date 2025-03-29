"use client";

import React, { useEffect, useState } from "react";
import { Download, Search } from "lucide-react";
import { utils, writeFile } from "xlsx";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Withdrawal = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [experts, setExperts] = useState([]); // Store expert names
  const [selectedExpert, setSelectedExpert] = useState("All");
  const [lastActive, setLastActive] = useState("All Time");
  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });

  const dummyTransactions = [
    { transactionId: "B434-043", expert: "Ivan", amount: "$200", date: "22/3/2025", status: "COMPLETED", country: "India" },
    { transactionId: "B434-e3234", expert: "Ram", amount: "$300", date: "20/2/2025", status: "Not withdrawn", country: "USA" },
    { transactionId: "B434-4392", expert: "Lakhan", amount: "$150", date: "22/2/2025", status: "COMPLETED", country: "Canada" },
    { transactionId: "L213-043", expert: "Aeran", amount: "$2000", date: "20/2/2025", status: "COMPLETED", country: "Australia" },
    { transactionId: "M434-043", expert: "Jiteksi", amount: "$150", date: "26/2/2025", status: "Not withdrawn", country: "UK" },
    { transactionId: "B4324-043", expert: "Irankis", amount: "$200", date: "20/1/2025", status: "Not withdrawn", country: "Germany" },
    { transactionId: "B434-044", expert: "John", amount: "$250", date: "15/3/2025", status: "COMPLETED", country: "France" },
    { transactionId: "B434-045", expert: "Sarah", amount: "$100", date: "10/3/2025", status: "Not withdrawn", country: "Italy" },
    { transactionId: "B434-046", expert: "Mike", amount: "$300", date: "5/3/2025", status: "COMPLETED", country: "Spain" },
    { transactionId: "B434-047", expert: "Lisa", amount: "$400", date: "1/3/2025", status: "Not withdrawn", country: "Brazil" },
    { transactionId: "B434-048", expert: "Dave", amount: "$500", date: "25/2/2025", status: "COMPLETED", country: "Mexico" },
    { transactionId: "B434-049", expert: "Emma", amount: "$600", date: "20/2/2025", status: "Not withdrawn", country: "Japan" },
    { transactionId: "B434-050", expert: "Chris", amount: "$700", date: "15/2/2025", status: "COMPLETED", country: "China" },
    { transactionId: "B434-051", expert: "Olivia", amount: "$800", date: "10/2/2025", status: "Not withdrawn", country: "Russia" },
    { transactionId: "B434-052", expert: "Noah", amount: "$900", date: "5/2/2025", status: "COMPLETED", country: "South Korea" },
    { transactionId: "B434-053", expert: "Sophia", amount: "$1500", date: "10/3/2025", status: "PENDING", country: "Canada" },
    { transactionId: "B434-054", expert: "Liam", amount: "$1200", date: "18/3/2025", status: "ONGOING", country: "Germany" },
    { transactionId: "B434-055", expert: "Emma", amount: "$800", date: "25/3/2025", status: "COMPLETED", country: "Australia" },
  ];

  useEffect(() => {
    setTransactions(dummyTransactions);
    setFilteredTransactions(dummyTransactions);

    // Extract unique expert names
    const expertNames = [...new Set(dummyTransactions.map(txn => txn.expert))];
    setExperts(expertNames);
  }, []);

  useEffect(() => {
    let filtered = transactions;

    if (selectedExpert !== "All") {
      filtered = filtered.filter((txn) => txn.expert === selectedExpert);
    }

    if (searchQuery) {
      filtered = filtered.filter((txn) =>
        txn.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) // Search by Transaction ID
      );
    }

    if (lastActive !== "All Time") {
      const currentDate = new Date();
      filtered = filtered.filter((txn) => {
        const transactionDate = new Date(txn.date.split("/").reverse().join("-"));
        const timeDiff = currentDate - transactionDate;
        const daysDiff = timeDiff / (1000 * 3600 * 24);

        switch (lastActive) {
          case "1 Day":
            return daysDiff <= 1;
          case "1 Week":
            return daysDiff <= 7;
          case "1 Month":
            return daysDiff <= 30;
          case "3 Month":
            return daysDiff <= 90;
          case "6 Month":
            return daysDiff <= 180;
          case "1 Year":
            return daysDiff <= 365;
          case "1+ Year":
            return daysDiff > 365;
          default:
            return true;
        }
      });
    }

    setFilteredTransactions(filtered);
    setCurrentPage(1);
  }, [searchQuery, selectedExpert, lastActive, transactions]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const downloadExcel = () => {
    const ws = utils.json_to_sheet(filteredTransactions);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Withdrawals");
    writeFile(wb, "Withdrawals.xlsx");
  };

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedTransactions = React.useMemo(() => {
    if (sortConfig.key) {
      return [...filteredTransactions].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return filteredTransactions;
  }, [filteredTransactions, sortConfig]);

  const getArrowIcons = (key) => {
    return (
      <div className="flex flex-col ml-1">
        <IoMdArrowDropup
          className={`w-3 h-3 ${sortConfig.key === key && sortConfig.direction === "asc" ? "text-red-500" : "text-gray-400"}`}
        />
        <IoMdArrowDropdown
          className={`w-3 h-3 ${sortConfig.key === key && sortConfig.direction === "desc" ? "text-red-500" : "text-gray-400"}`}
        />
      </div>
    );
  };

  return (
    <div className="flex justify-left w-full p-4 sm:p-6 bg-white">
      <div className="w-full sm:w-11/16">
        <h1 className="text-xl sm:text-2xl font-bold mb-4">WITHDRAWALS</h1>

        {/* Filters Section */}
        <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
          <div className="w-full sm:w-auto">
            <p className="mb-1 text-md text-[#191919]">Select Expert</p>
            <select
              className="p-2 rounded-lg border border-gray-400 bg-gray-200 w-full sm:w-44 text-red-500"
              value={selectedExpert}
              onChange={(e) => setSelectedExpert(e.target.value)}
            >
              <option value="All">All</option>
              {experts.map((expert) => (
                <option key={expert} value={expert}>
                  {expert}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full sm:w-auto">
            <p className="mb-1 text-md text-[#191919]">Select By Status</p>
            <select
              className="p-2 rounded-lg border border-gray-400 bg-gray-200 w-full sm:w-44 text-red-500"
              value={lastActive}
              onChange={(e) => setLastActive(e.target.value)}
            >
              <option>All Time</option>
              <option>1 Day</option>
              <option>1 Week</option>
              <option>1 Month</option>
              <option>3 Month</option>
              <option>6 Month</option>
              <option>1 Year</option>
              <option>1+ Year</option>
            </select>
          </div>

          <div className="w-full sm:w-auto">
            <p className="mb-1 text-md text-[#191919]">Search by Transaction ID</p>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400" size={16} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-2 rounded-lg border border-gray-400 bg-gray-200 w-full sm:w-48 pl-10"
              />
            </div>
          </div>

          <button
            onClick={downloadExcel}
            className="w-full sm:w-auto ml-auto p-2 bg-black text-white rounded flex items-center justify-center gap-2"
          >
            <Download size={16} />
          </button>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-y-2 border-[#FA9E93]">
              <tr>
                <th
                  className="p-1 border-x-1 border-[#808080] p-1 cursor-pointer"
                  onClick={() => requestSort("transactionId")}
                >
                  <div className="flex items-center">
                    TRANSACTION ID
                    {getArrowIcons("transactionId")}
                  </div>
                </th>
                <th
                  className="p-2 border-x-2 border-[#808080] p-1 cursor-pointer"
                  onClick={() => requestSort("expert")}
                >
                  <div className="flex items-center">
                    EXPERT
                    {getArrowIcons("expert")}
                  </div>
                </th>
                <th
                  className="p-2 border-x-2 border-[#808080] p-1 cursor-pointer"
                  onClick={() => requestSort("amount")}
                >
                  <div className="flex items-center">
                    AMOUNT
                    {getArrowIcons("amount")}
                  </div>
                </th>
                <th
                  className="p-2 border-x-2 border-[#808080] p-1 cursor-pointer"
                  onClick={() => requestSort("status")}
                >
                  <div className="flex items-center">
                    STATUS
                    {getArrowIcons("status")}
                  </div>
                </th>
                <th
                  className="p-2 cursor-pointer"
                  onClick={() => requestSort("date")}
                >
                  <div className="flex items-center">
                    DATE
                    {getArrowIcons("date")}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedTransactions
                .slice(indexOfFirstItem, indexOfLastItem)
                .map((txn, index) => (
                  <tr key={index} className="hover:bg-gray-100 text-left">
                    <td className="p-2">{txn.transactionId}</td>
                    <td className="p-2">{txn.expert}</td>
                    <td className="p-2">{txn.amount}</td>
                    <td className={`p-2 ${txn.status === "COMPLETED" ? "text-red-500" : "text-green-500"}`}>
                      {txn.status}
                    </td>
                    <td className="p-2">{txn.date}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Total Transactions Display */}
        <div className="flex justify-center font-bold items-center mt-4">
          <p className="text-md justify-center text-[#C91416]">{filteredTransactions.length} Total </p>
        </div>

        {/* Pagination Section */}
        <div className="flex justify-center items-center mt-4 gap-2">
          <div className="border shadow-lg rounded-lg">
            {/* Left Arrow */}
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded  text-gray-700 disabled:opacity-50"
            >
              <FaChevronLeft />
            </button>

            {/* Page Numbers */}
            {Array.from({ length: Math.ceil(filteredTransactions.length / itemsPerPage) }, (_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`px-4 py-2 rounded ${currentPage === i + 1 ? "bg-red-500 text-white" : "bg-white"}`}
              >
                {i + 1}
              </button>
            ))}

            {/* Right Arrow */}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(filteredTransactions.length / itemsPerPage)}
              className="px-4 py-2 rounded text-gray-700 disabled:opacity-50"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Withdrawal;
