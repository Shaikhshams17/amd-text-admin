"use client";

import React, { useEffect, useState } from "react";
import { Download, Search } from "lucide-react";
import { utils, writeFile } from "xlsx";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [experts, setExperts] = useState([]);
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
    { transactionId: "B434-043", user: "392223", expertBooked: "Raivan", amount: "$200", date: "2025-02-22", status: "BOOKED" },
    { transactionId: "B434-044", user: "392224", expertBooked: "John", amount: "$150", date: "2025-02-23", status: "BOOKED" },
    { transactionId: "B434-045", user: "392225", expertBooked: "Sarah", amount: "$300", date: "2025-02-24", status: "BOOKED" },
    { transactionId: "B434-046", user: "392226", expertBooked: "Mike", amount: "$250", date: "2025-02-25", status: "BOOKED" },
    { transactionId: "B434-047", user: "392227", expertBooked: "Emma", amount: "$180", date: "2025-02-20", status: "BOOKED" },
    { transactionId: "B434-048", user: "392228", expertBooked: "David", amount: "$220", date: "2025-02-19", status: "BOOKED" },
    { transactionId: "B434-049", user: "392229", expertBooked: "Lisa", amount: "$190", date: "2025-01-15", status: "BOOKED" },
    { transactionId: "B434-050", user: "392230", expertBooked: "Raivan", amount: "$210", date: "2024-12-10", status: "BOOKED" },
    { transactionId: "B434-051", user: "392231", expertBooked: "John", amount: "$175", date: "2024-11-05", status: "BOOKED" },
    { transactionId: "B434-052", user: "392232", expertBooked: "Sarah", amount: "$320", date: "2024-08-22", status: "BOOKED" },
  ];

  useEffect(() => {
    setTransactions(dummyTransactions);
    setFilteredTransactions(dummyTransactions);

    // Extract unique experts from transactions
    const uniqueExperts = [...new Set(dummyTransactions.map(txn => txn.expertBooked))];
    setExperts(uniqueExperts.sort());
  }, []);

  useEffect(() => {
    let filtered = transactions;

    // Filter by expert
    if (selectedExpert !== "All") {
      filtered = filtered.filter((txn) => txn.expertBooked === selectedExpert);
    }

    // Search by user ID
    if (searchQuery) {
      filtered = filtered.filter((txn) =>
        txn.user.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by date range
    if (lastActive !== "All Time") {
      const currentDate = new Date();
      filtered = filtered.filter((txn) => {
        const transactionDate = new Date(txn.date);
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
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const downloadExcel = () => {
    const exportData = filteredTransactions.map((txn) => ({
      "Transaction ID": txn.transactionId,
      "User": txn.user,
      "Expert Booked": txn.expertBooked,
      "Amount": txn.amount,
      "Date": txn.date,
      "Status": txn.status,
    }));
    const ws = utils.json_to_sheet(exportData);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Transactions");
    writeFile(wb, "Transactions.xlsx");
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
        // Special handling for date sorting
        if (sortConfig.key === "date") {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return sortConfig.direction === "asc" ? dateA - dateB : dateB - dateA;
        }
        
        // Special handling for amount sorting (remove $ and convert to number)
        if (sortConfig.key === "amount") {
          const amountA = parseFloat(a.amount.replace('$', ''));
          const amountB = parseFloat(b.amount.replace('$', ''));
          return sortConfig.direction === "asc" ? amountA - amountB : amountB - amountA;
        }
        
        // Default string comparison
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
      <div className="flex flex-col ml-2 right">
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
        <h1 className="text-xl sm:text-2xl font-bold mb-4">Transactions</h1>

        {/* Filters Section */}
        <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
          <div className="w-full sm:w-auto">
            <p className="mb-1 text-md text-[#191919]">Select Expert</p>
            <select
              className="p-2 rounded-lg border border-black bg-gray-200 w-full sm:w-44 text-red-500"
              value={selectedExpert}
              onChange={(e) => setSelectedExpert(e.target.value)}
            >
              <option value="All">All Experts</option>
              {experts.map((expert) => (
                <option key={expert} value={expert}>
                  {expert}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full sm:w-auto">
            <p className="mb-1 text-md text-[#191919]">Select By Date</p>
            <select
              className="p-2 rounded-lg border border-black bg-gray-200 w-full sm:w-44 text-red-500"
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
            <p className="mb-1 text-md text-[#191919]">Search by User ID</p>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white border rounded-full border-red-400 bg-red-400" size={16} />
              <input
                type="text"
                placeholder="Search user ID"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-2 rounded-lg border border-black bg-gray-200 w-full sm:w-48 pl-10"
              />
            </div>
          </div>

          <button
            onClick={downloadExcel}
            className="flex mt-8 items-center justify-center w-12 h-12 bg-black text-white rounded-lg ml-auto"
          >
            <Download size={24} className="text-white" />
          </button>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-y-2 border-red-400 relative">
              <tr>
                <th
                  className="p-1 cursor-pointer relative"
                  onClick={() => requestSort("transactionId")}
                >
                  <div className="flex items-center">
                    TRANSACTION ID
                    {getArrowIcons("transactionId")}
                  </div>
                  <div className="absolute right-5 top-1 h-8 w-[1px] bg-[#808080]"></div>
                </th>
                <th
                  className="p-2 cursor-pointer relative"
                  onClick={() => requestSort("user")}
                >
                  <div className="flex items-center ">
                    USER
                     {getArrowIcons("user")}
                  </div>
                  <div className="absolute right-2 top-1 h-8 w-[1px] bg-[#808080]"></div>
                </th>
                <th
                  className="p-2 cursor-pointer relative"
                  onClick={() => requestSort("expertBooked")}
                >
                  <div className="flex items-center">
                    EXPERT BOOKED
                    {getArrowIcons("expertBooked")}
                  </div>
                  <div className="absolute right-3 top-1 h-8 w-[1px] bg-[#808080]"></div>
                </th>
                <th
                  className="p-2 cursor-pointer relative"
                  onClick={() => requestSort("amount")}
                >
                  <div className="flex items-center">
                    AMOUNT
                    {getArrowIcons("amount")}
                  </div>
                  <div className="absolute right-4 top-1 h-8 w-[1px] bg-[#808080]"></div>
                </th>
                <th
                  className="p-2 cursor-pointer relative"
                  onClick={() => requestSort("date")}
                >
                  <div className="flex items-center">
                    DATE
                    {getArrowIcons("date")}
                  </div>
                  <div className="absolute right-3 top-1 h-8 w-[1px] bg-[#808080]"></div>
                </th>
                <th
                  className="p-2 cursor-pointer relative"
                  onClick={() => requestSort("status")}
                >
                  <div className="flex items-center">
                    STATUS
                    {getArrowIcons("status")}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedTransactions
                .slice(indexOfFirstItem, indexOfLastItem)
                .map((txn, index) => (
                  <tr key={index} className="hover:bg-gray-100 text-left ">
                    <td className="p-2">{txn.transactionId}</td>
                    <td className="p-2">{txn.user}</td>
                    <td className="p-2">{txn.expertBooked}</td>
                    <td className="p-2">{txn.amount}</td>
                    <td className="p-2">{new Date(txn.date).toLocaleDateString()}</td>
                    <td className="p-2">
  <span className={`p-2  text-black`}>
    {txn.status}
  </span>
</td>

                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Total Transactions */}
        <div className="flex justify-center font-bold items-center mt-4">
          <p className="text-md justify-center text-[#C91416]">{filteredTransactions.length} Total</p>
        </div>

        {/* Pagination Section */}
        {filteredTransactions.length > 0 && (
          <div className="flex justify-center items-center mt-4">
            <div className="border rounded-lg shadow-xl">
              {/* Left Arrow */}
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="mx-1 px-3 py-1 rounded text-gray-700 disabled:opacity-50"
              >
                <FaChevronLeft />
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  className={`mx-1 px-3 py-1 rounded ${currentPage === i + 1 ? "bg-[#C91416] text-white" : "bg-gray-200"}`}
                >
                  {i + 1}
                </button>
              ))}

              {/* Right Arrow */}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="mx-1 px-3 py-1 rounded text-gray-700 disabled:opacity-50"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transaction;