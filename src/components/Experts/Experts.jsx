"use client";

import React, { useEffect, useState } from "react";
import { Download, Search } from "lucide-react";
import { utils, writeFile } from "xlsx";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

const Experts = () => {
  const [experts, setExperts] = useState([]);
  const [filteredExperts, setFilteredExperts] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [selectedSessions, setSelectedSessions] = useState("All");
  const [selectedUsername, setSelectedUsername] = useState("");

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
      { country: "Belarus", name: "Ivan", username: "raivan", email: "radioxivan@gmail.com", phone: "+9876543210", liveSessions: 3 },
      { country: "India", name: "Ram", username: "Ram123", email: "ram123@gmail.com", phone: "+9876543210", liveSessions: 2 },
      { country: "India", name: "Lakhan", username: "Lakhan123", email: "lakhan123@gmail.com", phone: "+9876543210", liveSessions: 1 },
      { country: "United Kingdom", name: "Aeran", username: "Aeran123", email: "aeran123@gmail.com", phone: "+9876543210", liveSessions: 2 },
      { country: "Netherlands", name: "Jiteksi", username: "jiteksi123", email: "jiteksi123@gmail.com", phone: "+9876543210", liveSessions: 3 },
      { country: "United States", name: "Irnakis", username: "Irnakis123", email: "irnakis123@gmail.com", phone: "+9876543210", liveSessions: 1 },
      { country: "United States", name: "Irnakis", username: "Irnakis123", email: "irnakis123@gmail.com", phone: "+9876543210", liveSessions: 1 },
      { country: "United States", name: "Irnakis", username: "Irnakis123", email: "irnakis123@gmail.com", phone: "+9876543210", liveSessions: 1 },
      { country: "United States", name: "Irnakis", username: "Irnakis123", email: "irnakis123@gmail.com", phone: "+9876543210", liveSessions: 1 },
    ];

    setExperts(dummyExperts);
    setFilteredExperts(dummyExperts);
  }, []);

  useEffect(() => {
    let tempExperts = [...experts];

    // Filter by country
    if (selectedCountry !== "All") {
      tempExperts = tempExperts.filter((expert) => expert.country === selectedCountry);
    }

    // Filter by number of live sessions
    if (selectedSessions !== "All") {
      tempExperts = tempExperts.filter((expert) => expert.liveSessions === parseInt(selectedSessions));
    }

    // Filter by username
    if (selectedUsername) {
      tempExperts = tempExperts.filter((expert) =>
        expert.username.toLowerCase().includes(selectedUsername.toLowerCase())
      );
    }

    setFilteredExperts(tempExperts);
    setCurrentPage(1);
  }, [selectedCountry, selectedSessions, selectedUsername, experts]);

  const sortTable = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedExperts = [...filteredExperts].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredExperts(sortedExperts);
    setSortConfig({ key, direction });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredExperts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredExperts.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const downloadExcel = () => {
    const ws = utils.json_to_sheet(filteredExperts);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Experts");
    writeFile(wb, "Experts.xlsx");
  };

  return (
    <div className="flex justify-center w-full h-full p-6 bg-white">
      <div className="w-11/12">
        <h1 className="text-3xl font-bold mb-6 text-[#191919]">EXPERTS</h1>

        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-4">
            {/* Select by Country */}
            <div>
              <h3 className="mb-2">Select by Country</h3>
              <select
                className="p-2 w-48 rounded-lg border border-black bg-gray-200 text-red-600 cursor-pointer"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
              >
                {countries.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            {/* Select by No. of Live Sessions */}
            <div>
              <h3 className="mb-2">Select by No. of Live Sessions</h3>
              <select
                className="p-2 w-48 rounded-lg border border-black bg-gray-200 text-red-600 cursor-pointer"
                value={selectedSessions}
                onChange={(e) => setSelectedSessions(e.target.value)}
              >
                <option value="All">All</option>
                {[...Array(11).keys()].map((num) => (
                  <option key={num} value={num}>
                    {num} Sessions
                  </option>
                ))}
              </select>
            </div>

            {/* Select by Username */}
            <div>
              <h3>Select by Username</h3>
              <div className="relative w-64">
                <Search className="absolute left-3 bottom-3 transform text-gray-200 bg-red-500 rounded-full border border-red-500" size={18} />
                <input
                  type="text"
                  className="mt-2 p-2 pl-10 rounded-lg border border-black bg-gray-200 w-48"
                  value={selectedUsername}
                  onChange={(e) => setSelectedUsername(e.target.value)}
                  placeholder="Search Username"
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

        {/* Table */}
        <table className="w-[104%] border-collapse border border-white">
          <thead className="border-y-2 border-red-400 bg-white">
            <tr>
              {["COUNTRY NAME", "NAME", "USERNAME", "EMAIL", "PHONE NUMBER", "COMPLETES LIVESESSIONS"].map((label, index) => (
                <th key={index} className="p-3 text-left font-semibold cursor-pointer">
                  <div className="flex items-center gap-1">
                    <span>{label}</span>
                    <div className="flex flex-col items-center">
                      <FaSortUp className={sortConfig.key === label && sortConfig.direction === "asc" ? "text-black" : "text-gray-300"} />
                      <FaSortDown className={sortConfig.key === label && sortConfig.direction === "desc" ? "text-black" : "text-gray-300"} />
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {currentItems.map((expert, index) => (
              <tr key={index} className="hover:bg-gray-50 border-b border-gray-200">
                <td className="p-3 text-center">{expert.country}</td>
                <td className="text-center">{expert.name}</td>
                <td className="text-center">{expert.username}</td>
                <td className="text-center">{expert.email}</td>
                <td className="text-center">{expert.phone}</td>
                <td className="text-center">{String(expert.liveSessions).padStart(2, "0")}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="text-center text-sm mt-4 text-red-600">
          {filteredExperts.length}{" "}
          {filteredExperts.length === 1 ? "Result" : "Total"}
        </div>

        <div className="flex justify-center items-center mt-4">
          <div className="flex gap-6 p-2 border rounded-lg bg-white shadow-md shadow-gray-400">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg ${currentPage === 1 ? "text-gray-500 cursor-not-allowed" : "text-red-500"}`}
            >
              <IoIosArrowBack size={20} />
            </button>

            {/* Pagination Numbers */}
            {[...Array(totalPages)].map((_, number) => (
              <button
                key={number + 1}
                onClick={() => paginate(number + 1)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg text-base ${currentPage === number + 1 ? "bg-red-500 text-white" : "text-[#FA9E93] bg-white"}`}
              >
                {number + 1}
              </button>
            ))}

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg ${currentPage === totalPages ? "text-gray-500 cursor-not-allowed" : "text-red-500"}`}
            >
              <IoIosArrowForward size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experts;
