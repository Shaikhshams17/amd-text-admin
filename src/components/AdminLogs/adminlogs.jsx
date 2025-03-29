"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { FaDownload } from "react-icons/fa";
import { FaSortUp, FaSortDown } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const AdminLogs = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState("All");
    const [sortColumn, setSortColumn] = useState("transactionId");
    const [sortOrder, setSortOrder] = useState("asc");
    const [selectedExpert, setSelectedExpert] = useState("All");
    const reviewsPerPage = 6;

    const dummySessions = [
        { loginEmail: "raihan@example.com", timestamp: "2025-03-20", actionType: "Setting Update", status: "Success", description: "Updated API key for Tap Payments in Payment Setting" },
        { loginEmail: "john@example.com", timestamp: "2025-03-18", actionType: "Discount Management", status: "Not Successful", description: "Updated API key for Tap Payments in Payment Setting" },
        { loginEmail: "alex@example.com", timestamp: "2025-03-19", actionType: "Setting Update", status: "Success", description: "Updated API key for Tap Payments in Payment Setting" },
        { loginEmail: "raihan@example.com", timestamp: "2025-03-17", actionType: "Discount Management", status: "Not Successful", description: "Updated API key for Tap Payments in Payment Setting" },
        { loginEmail: "michael@example.com", timestamp: "2025-03-16", actionType: "Setting Update", status: "Success", description: "Updated API key for Tap Payments in Payment Setting" },
        { loginEmail: "sara@example.com", timestamp: "2025-03-21", actionType: "Expert Request", status: "Not Successful", description: "Updated API key for Tap Payments in Payment Setting" },
        { loginEmail: "alex@example.com", timestamp: "2025-03-15", actionType: "Discount Management", status: "Success", description: "Updated API key for Tap Payments in Payment Setting" },
        { loginEmail: "raihan@example.com", timestamp: "2025-03-14", actionType: "Setting Update", status: "Not Successful", description: "Updated API key for Tap Payments in Payment Setting" },
    ];

    const uniqueExperts = ["All", ...new Set(dummySessions.map((session) => session.timestamp))];

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(column);
            setSortOrder("asc");
        }
    };

    // ✅ Export data as CSV
    const handleExport = () => {
        const csvRows = [];
        const headers = ["Login Email", "Timestamp", "Action Type", "Status", "Description"];
        csvRows.push(headers.join(",")); // Add header row

        filteredSessions.forEach((session) => {
            const row = [
                session.loginEmail,
                session.timestamp,
                session.actionType,
                session.status,
                session.description,
            ];
            csvRows.push(row.join(","));
        });

        const csvContent = csvRows.join("\n");
        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "admin_logs.csv";
        a.click();
        URL.revokeObjectURL(url);
    };

    const filteredSessions = dummySessions.filter(
        (session) =>
            (selectedExpert === "All" || session.timestamp === selectedExpert) &&
            (statusFilter === "All" || session.status === statusFilter) &&
            (searchQuery === "" || session.loginEmail.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const sortedSessions = filteredSessions.sort((a, b) => {
        let aValue = a[sortColumn];
        let bValue = b[sortColumn];

        if (sortColumn === "actionType") {
            aValue = aValue.toLowerCase();
            bValue = bValue.toLowerCase();
        } else if (sortColumn === "timestamp") {
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

    return (
        <div className="flex justify-center w-full p-6 bg-white">
            <div className="w-11/12">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold text-[#191919]">ADMIN LOGS</h1>
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
                                <option value="Success">Success</option>
                                <option value="Not Successful">Not Successful</option>
                            </select>
                        </div>

                        {/* Search by Login Email */}
                        <div className="w-56 relative">
                            <h2 className="text-[#191919] mb-1">Search by Login Email</h2>
                            {!searchQuery && ( // Show icon only when input is empty
                                <Search
                                    className="absolute left-3 top-10 transform text-gray-400"
                                    size={18}
                                />
                            )}
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={`p-2 w-full rounded-xl border border-black bg-[#E6E6E6] text-gray-700 focus:outline-none ${searchQuery ? "pl-2" : "pl-10"
                                    }`} // Add padding if icon is visible
                            />
                        </div>

                    </div>

                    {/* Export Button */}
                    <button
                        onClick={handleExport}
                        className="flex items-center gap-2 text-red-500 text-sm cursor-pointer mt-5"
                    >
                        <div className="bg-black p-2 rounded-lg">
                            <FaDownload className="text-white" />
                        </div>
                    </button>
                </div>

                {/* Table */}
                {/* Table */}
                <table className="w-full border-collapse ">
                    <thead className="bg-white border-y-2 border-[#FA9E93] ">
                        <tr>
                            {[
                                { label: "LOGIN EMAIL", column: "loginEmail", width: "w-[20%]" },
                                { label: "TIMESTAMP", column: "timestamp", width: "w-[15%]" },
                                { label: "ACTION TYPE", column: "actionType", width: "w-[20%]" },
                                { label: "STATUS", column: "status", width: "w-[15%]" },
                                { label: "DESCRIPTION", column: "description", width: "w-[30%]" },
                            ].map(({ label, column, width }, index) => (
                                <th
                                    key={column}
                                    className={`p-3 text-center cursor-pointer relative ${width}`}
                                    onClick={() => handleSort(column)}
                                >
                                    <div className="flex justify-center items-center gap-2">
                                        {label}
                                        <div className="flex flex-col">
                                            <FaSortUp
                                                className={`text-sm ${sortColumn === column && sortOrder === "asc"
                                                    ? "text-black"
                                                    : "text-gray-400"
                                                    }`}
                                            />
                                            <FaSortDown
                                                className={`text-sm ${sortColumn === column && sortOrder === "desc"
                                                    ? "text-black"
                                                    : "text-gray-400"
                                                    }`}
                                            />
                                        </div>
                                    </div>

                                    {/* Separator Line - Except last header */}
                                    {index !== 4 && (
                                        <div className="absolute right-0 top-2/4 -translate-y-2/4 w-[1px] h-10 bg-gray-300 -ml-5"></div>
                                    )}
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
                                    <td className="p-3 text-center w-[20%] break-words">{session.loginEmail}</td>
                                    <td className="p-3 text-center w-[15%]">{session.timestamp}</td>
                                    <td className="p-3 text-center w-[20%]">{session.actionType}</td>
                                    <td
                                        className={`p-3 text-center w-[15%] ${session.status === "Success"
                                            ? "text-green-500"
                                            : "text-red-500"
                                            }`}
                                    >
                                        {session.status}
                                    </td>
                                    <td className="p-3 text-center w-[30%] break-words">{session.description}</td>
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

                        {/* Page Numbers */}
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
                                ? "text-gray-500 cursor-not-allowed"
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

export default AdminLogs;
