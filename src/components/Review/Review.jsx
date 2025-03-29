"use client"

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // For redirect
import { Search } from "lucide-react";
import { Download } from "lucide-react";
import { Check, X, Flag } from "lucide-react";  // Updated import for Check and X icons
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { FaSortUp, FaSortDown } from "react-icons/fa"; // Import sort icons
import { utils, writeFile } from "xlsx"; // For Excel download

const Review = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 6;
  // Dummy review data
  const dummyReviews = [
    {
      reviewId: "A3J933",
      expert: "raihan",
      rating: "4 STARS",
      content: "radiovan@gmail.com",
    },
    {
      reviewId: "A3J934",
      expert: "john",
      rating: "5 STARS",
      content: "john.doe@example.com",
    },
    {
      reviewId: "A3J935",
      expert: "alex",
      rating: "3 STARS",
      content: "alex@example.com",
    },
    {
      reviewId: "A3J935",
      expert: "alex",
      rating: "3 STARS",
      content: "alex@example.com",
    },
    {
      reviewId: "A3J935",
      expert: "alex",
      rating: "3 STARS",
      content: "alex@example.com",
    },
    {
      reviewId: "A3J935",
      expert: "alex",
      rating: "3 STARS",
      content: "alex@example.com",
    },
    {
      reviewId: "A3J935",
      expert: "alex",
      rating: "3 STARS",
      content: "alex@example.com",
    },
    {
      reviewId: "A3J935",
      expert: "alex",
      rating: "3 STARS",
      content: "alex@example.com",
    },
    {
      reviewId: "A3J935",
      expert: "alex",
      rating: "3 STARS",
      content: "alex@example.com",
    },
    {
      reviewId: "A3J935",
      expert: "alex",
      rating: "3 STARS",
      content: "alex@example.com",
    },
    {
      reviewId: "A3J935",
      expert: "alex",
      rating: "3 STARS",
      content: "alex@example.com",
    },
    // ... additional review data
  ];

  const sortConfig = { key: "", direction: "asc" }; // Add sorting config for sorting functionality

  // Filter reviews based on search query
  const filteredReviews = dummyReviews.filter((review) =>
    review.expert.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle Export to CSV
  const handleExport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        ["REVIEW ID", "EXPERT", "RATING", "CONTENT"], // CSV Header
        ...filteredReviews.map((review) => [
          review.reviewId,
          review.expert,
          review.rating,
          review.content,
        ]),
      ]
        .map((e) => e.join(","))
        .join("\n");

    // Create Blob and Download CSV
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "reviews.csv");
    document.body.appendChild(link);
    link.click();
  };

  // Handle Approve/Reject/Flag action
  const handleAction = (action, reviewId) => {
    if (action === "approve") {
      alert(`✅ Review ${reviewId} has been approved.`);
    } else if (action === "reject") {
      alert(`❌ Review ${reviewId} has been rejected.`);
    } else if (action === "flag") {
      alert(`Review ${reviewId} has been flagged for review.`);
    }
  };

  // Pagination logic
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = filteredReviews.slice(
    indexOfFirstReview,
    indexOfLastReview
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle dropdown toggle
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  // Handle status selection
  const handleStatusSelect = (status) => {
    setStatusFilter(status);
    setIsDropdownOpen(false); // Close dropdown after selecting
  };

  // Open Popup with session details
  const openPopup = (session) => {
    setSelectedSession(session);
    setIsPopupOpen(true);
  };

  // Close the popup
  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedSession(null);
  };

  // Export sessions to Excel format
  const exportToExcel = () => {
    const ws = utils.json_to_sheet(filteredReviews);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Reviews");
    writeFile(wb, "reviews.xlsx");
  };

  return (
    <div className="flex justify-center w-full p-6 bg-white">
      <div className="w-11/12">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-[#191919]">REVIEWS/FEEDBACK</h1>

          {/* Export as Excel Button */}
           <div className="ml-auto mt-6">
                      <button
                        onClick={exportToExcel}
                        className="p-2 bg-black text-white rounded flex items-center gap-2"
                      >
                        <Download size={16} />
                      </button>
                    
                  </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6 w-1/3">
          <div>
            <h2 className="text-[#191919]">Search by Expert</h2>
          </div>
          <div className="absolute h-6 w-6 bg-[#EC6453] rounded-full mt-2 ml-2">
            <Search className="m-1 text-white" size={16} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 rounded-xl border border-black w-72 bg-[#E6E6E6] text-gray-700 focus:outline-none pl-10"
          />
        </div>

        {/* Data Table */}
        <table className="w-full border-collapse border border-white">
          <thead className="border-y-2 border-red-300 bg-white">
            <tr>
              {["reviewId", "expert", "rating", "content"].map((key, index) => (
                <th key={index} className="p-3 text-center font-semibold relative">
                  <div className="inline-flex items-center gap-2">
                    <span className="uppercase">{key.replace("_", " ")}</span>
                    <div className="flex flex-col items-center">
                      <FaSortUp
                        onClick={() => sortTable(key)}  // Handle sorting
                        className={`text-xs cursor-pointer ml-[5.8rem] ${sortConfig.key === key && sortConfig.direction === "asc" ? "text-gray-200" : "text-black"}`}
                      />
                      <FaSortDown
                        onClick={() => sortTable(key)}  // Handle sorting
                        className={`text-xs -mt-1 cursor-pointer ml-[5.8rem] ${sortConfig.key === key && sortConfig.direction === "desc" ? "text-gray-200" : "text-black"}`}
                      />
                    </div>
                  </div>
                  {index !== 3 && <div className="absolute right-0 top-1/2 transform -translate-y-1/2 h-9 border-l border-black"></div>} {/* Separator between columns */}
                </th>
              ))}
              <th className="p-3 text-center font-semibold">ACTIONS</th> {/* Added the "ACTIONS" header */}
            </tr>
          </thead>
          <tbody>
            {currentReviews.length > 0 ? (
              currentReviews.map((review, index) => (
                <tr key={index} className="hover:bg-gray-100 border-b border-gray-200">
                  <td className="p-3 text-center">{review.reviewId}</td>
                  <td className="p-3 text-center">{review.expert}</td>
                  <td className="p-3 text-center">{review.rating}</td>
                  <td className="p-3 text-center">{review.content}</td>
                  <td className="p-3 flex justify-center items-center gap-3">
                    {/* Approve Button */}
                    <button
                      onClick={() => handleAction("approve", review.reviewId)}
                      className="bg-[#60DF7C] text-white px-3 py-2 rounded-lg text-lg cursor-pointer"
                    >
                      <Check size={18} strokeWidth={2} className="text-white" />
                    </button>
                    {/* Reject Button */}
                    <button
                      onClick={() => handleAction("reject", review.reviewId)}
                      className="bg-[#FF2A2A] text-white px-3 py-2 rounded-lg text-lg cursor-pointer"
                    >
                      <X size={18} strokeWidth={2} className="text-white" />
                    </button>
                    {/* Flag Button */}
                    <button
                      onClick={() => handleAction("flag", review.reviewId)}
                      className="bg-black text-white px-3 py-2 rounded-lg text-lg cursor-pointer"
                    >
                      <Flag size={18} strokeWidth={2} className="text-white" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-3 text-center text-gray-500">
                  No reviews found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Total Count */}
        <div className="text-center text-sm mt-4 text-[#FA9E93]">
          {filteredReviews.length}{" "}
          {filteredReviews.length === 1 ? "Result" : "Total"}
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
              const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
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
              disabled={currentPage === Math.ceil(filteredReviews.length / reviewsPerPage)}
              className={`p-2 rounded-lg ${currentPage === Math.ceil(filteredReviews.length / reviewsPerPage)
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

export default Review;