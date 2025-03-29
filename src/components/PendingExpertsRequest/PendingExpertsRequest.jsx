"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";  // Import useRouter for routing
import { Download, Search } from "lucide-react";
import { utils, writeFile } from "xlsx";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaSortUp, FaSortDown } from "react-icons/fa";
import { Check, X, User } from "lucide-react";

const PendingExpertsRequest = () => {
  const router = useRouter();  // Initialize router for navigation
  const [experts, setExperts] = useState([]);
  const [filteredExperts, setFilteredExperts] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsername, setSelectedUsername] = useState("");  // Declare selectedUsername state
  const [currentPage, setCurrentPage] = useState(1);
  const [visiblePages, setVisiblePages] = useState([]);  // Added visiblePages state
  const itemsPerPage = 6;
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const countryNames = data.map((country) => country.name.common).sort();
        setCountries(["All", ...countryNames]);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const dummyExperts = [
      { id: 1, country: "Belarus", name: "Ivan", username: "raivan", email: "radioxivan@gmail.com", status: null },
      { id: 2, country: "India", name: "Ram", username: "Ram123", email: "ram123@gmail.com", status: null },
      { id: 3, country: "India", name: "Lakhan", username: "Lakhan123", email: "lakhan123@gmail.com", status: null },
      { id: 4, country: "United Kingdom", name: "Aeran", username: "Aeran123", email: "aeran123@gmail.com", status: null },
      { id: 5, country: "Netherlands", name: "Jiteksi", username: "jiteksi123", email: "jiteksi123@gmail.com", status: null },
      { id: 6, country: "United States", name: "Irnakis", username: "Irnakis123", email: "irnakis123@gmail.com", status: null },
    ];

    setExperts(dummyExperts);
    setFilteredExperts(dummyExperts);
  }, []);

  useEffect(() => {
    let tempExperts = [...experts];

    if (selectedCountry !== "All") {
      tempExperts = tempExperts.filter((expert) => expert.country === selectedCountry);
    }

    if (selectedStatus !== "All") {
      tempExperts = tempExperts.filter((expert) => expert.status === selectedStatus);
    }

    if (selectedUsername) {
      tempExperts = tempExperts.filter((expert) =>
        expert.username.toLowerCase().includes(selectedUsername.toLowerCase())  // Filter by username
      );
    }

    setFilteredExperts(tempExperts);
    setCurrentPage(1);
  }, [selectedCountry, selectedStatus, searchQuery, selectedUsername, experts]);

  const generatePagination = () => {
    const totalPages = Math.ceil(filteredExperts.length / itemsPerPage);
    let pages = [];

    pages.push(1);
    if (currentPage > 3) pages.push("...");

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) pages.push(i);

    if (currentPage < totalPages - 2) pages.push("...");
    if (totalPages > 1) pages.push(totalPages);

    return pages.filter((page, index, array) =>
      array.indexOf(page) === index
    );
  };

  useEffect(() => {
    setVisiblePages(generatePagination());
  }, [filteredExperts, currentPage]);

  const sortTable = (key) => {
    let direction = "asc"; // Default sort direction is ascending
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"; // If the same column is clicked again, toggle the direction
    }

    let newExperts = [...filteredExperts];
    newExperts.sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredExperts(newExperts);
    setSortConfig({ key, direction });
  };

  const acceptRequest = (id) => {
    setExperts((prevExperts) =>
      prevExperts.map((expert) =>
        expert.id === id ? { ...expert, status: "Accepted" } : expert
      )
    );
  };

  const rejectRequest = (id) => {
    setExperts((prevExperts) =>
      prevExperts.map((expert) =>
        expert.id === id ? { ...expert, status: "Rejected" } : expert
      )
    );
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredExperts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredExperts.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () =>
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  const prevPage = () =>
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));

  const downloadExcel = () => {
    const ws = utils.json_to_sheet(filteredExperts);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "PendingExperts");
    writeFile(wb, "PendingExperts.xlsx");
  };

  const handleProfileClick = (username) => {
    // Navigate to the profile page (for now it's a placeholder)
    router.push("/pendingexpertsrequestprofile");
  };

  return (
    <div className="flex justify-center w-full p-6 bg-white">
      <div className="w-11/12">
        <h1 className="text-3xl font-bold mb-6 text-[#191919]">PENDING EXPERT REQUESTS</h1>

        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-4">
            <div>
              <h3 className="mb-2">Select Country</h3>
              <select
                className="p-2 w-48 rounded-lg border border-black bg-gray-200 text-red-600 cursor-pointer"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
              >
                {countries.map((country, index) => (
                  <option key={index} value={country}>{country}</option>
                ))}
              </select>
            </div>

            <div>
              <h3 className="mb-2">Select by Status</h3>
              <select
                className="p-2 w-48 rounded-lg border border-black bg-gray-200 text-red-600 cursor-pointer"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div>
              <h3 className="">Select by Username</h3>
              <div className="relative w-64">
                <Search className="absolute left-3 bottom-3 transform text-gray-200 bg-red-500 rounded-full border border-red-500" size={18} />
                <input
                  type="text"
                  className="mt-2 p-2 pl-10 rounded-lg border border-black bg-gray-200 w-48 h-[2.5rem]"
                  value={selectedUsername}
                  onChange={(e) => setSelectedUsername(e.target.value)}
                />
              </div>
            </div>
          </div>

          <button
            onClick={downloadExcel}
            className="flex mt-8 items-center justify-center w-12 h-12 bg-black text-white rounded-lg"
          >
            <Download size={24} className="text-white" />
          </button>
        </div>

        <table className="w-full border-collapse border border-white">
          <thead className="border-y-2 border-red-300 bg-white">
            <tr>
              {["country", "name", "username", "email"].map((key, index) => (
                <th key={index} className="p-3 text-left font-semibold relative">
                  <div className="inline-flex items-center gap-2">
                    <span className="uppercase">{key.replace("_", " ")}</span>
                    <div className="flex flex-col items-center">
                      <FaSortUp
                        onClick={() => sortTable(key)}
                        className={`text-xs cursor-pointer ml-[5.8rem] ${sortConfig.key === key && sortConfig.direction === "asc" ? "text-gray-200" : "text-black"}`}
                      />
                      <FaSortDown
                        onClick={() => sortTable(key)}
                        className={`text-xs -mt-1 cursor-pointer ml-[5.8rem] ${sortConfig.key === key && sortConfig.direction === "desc" ? "text-gray-200" : "text-black"}`}
                      />
                    </div>
                  </div>
                  {index !== 3 && <div className="absolute right-0 top-1/2 transform -translate-y-1/2 h-9 border-l border-black"></div>}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {currentItems.map((expert) => (
              <tr key={expert.id} className="hover:bg-gray-50 border-b border-gray-200">
                <td className="p-5 text-left">{expert.country}</td>
                <td className="text-left">{expert.name}</td>
                <td className="text-left">{expert.username}</td>
                <td className="text-left">{expert.email}</td>
                <td className="text-left">
                  <div className="flex gap-2">
                    {!expert.status ? (
                      <>
                        <button
                          className="flex items-center justify-center w-[50px] h-[40px] mt-[3px] bg-[#60DF7C] text-white rounded-md"
                          onClick={() => acceptRequest(expert.id)}
                        >
                          <Check size={28} strokeWidth={2} className="text-white" />
                        </button>
                        <button
                          className="flex items-center justify-center w-[50px] h-[40px] mt-[3px] bg-[#FF2A2A] text-white rounded-md"
                          onClick={() => rejectRequest(expert.id)}
                        >
                          <X size={28} strokeWidth={2} className="text-white" />
                        </button>
                      </>
                    ) : (
                      <div className={`flex items-center justify-center w-[80px] h-[40px] mt-[3px] rounded-md ${expert.status === "Accepted" ? "bg-green-500" : "bg-red-500"}`}>
                        <span className="text-white">{expert.status}</span>
                      </div>
                    )}
                    <button
                      className="flex items-center justify-center w-[50px] h-[40px] mt-[3px] bg-black text-white rounded-md"
                      onClick={() => handleProfileClick(expert.username)}  // Add onClick handler for profile icon
                    >
                      <User size={28} strokeWidth={2} className="text-white" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="text-center text-sm mt-4 text-[#FA9E93]">
          {filteredExperts.length}{" "}
          {filteredExperts.length === 1 ? "Result" : "Total"}
        </div>

        <div className="flex justify-center items-center mt-4">
          <div className="flex gap-2 p-2 border rounded-lg bg-white shadow-lg shadow-gray-400">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg ${currentPage === 1
                ? "text-gray-500 cursor-not-allowed"
                : "text-red-500"
                }`}
            >
              <IoIosArrowBack size={20} />
            </button>

            {(() => {
              const totalPages = Math.ceil(filteredExperts.length / itemsPerPage);
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

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(filteredExperts.length / itemsPerPage)}
              className={`p-2 rounded-lg ${currentPage === Math.ceil(filteredExperts.length / itemsPerPage)
                ? "text-gray-300 cursor-not-allowed"
                : "text-red-500"
                }`}
            >
              <IoIosArrowForward size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingExpertsRequest;
