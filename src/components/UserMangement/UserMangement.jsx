"use client";

import React, { useEffect, useState } from "react";
import { Download, Search } from "lucide-react";
import { utils, writeFile } from "xlsx";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { RiHistoryLine } from "react-icons/ri";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [lastActive, setLastActive] = useState("All Time");
  const [searchName, setSearchName] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // Popup and History state
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isHistoryPopupOpen, setIsHistoryPopupOpen] = useState(false);
  const [userHistory, setUserHistory] = useState([]);

  const dummyUsers = [
    {
      country: "Belarus",
      name: "Ivan",
      username: "Ravian",
      email: "radioivan@gmail.com",
      status: "Active",
      phone: "+9876543210",
      lastActive: "2024-03-15",
    },
    {
      country: "India",
      name: "Ram",
      username: "Ram123",
      email: "ram123@gmail.com",
      status: "Deactivate",
      phone: "+9876543210",
      lastActive: "2024-02-01",
    },
    {
      country: "United States",
      name: "John",
      username: "JohnDoe",
      email: "john.doe@example.com",
      status: "Active",
      phone: "+1234567890",
      lastActive: "2024-03-10",
    },
    {
      country: "Canada",
      name: "Alice",
      username: "Alice2023",
      email: "alice@example.com",
      status: "Deactivate",
      phone: "+1122334455",
      lastActive: "2024-01-15",
    },
    {
      country: "Germany",
      name: "Hans",
      username: "HansG",
      email: "hans.g@example.com",
      status: "Active",
      phone: "+49876543210",
      lastActive: "2024-03-14",
    },
    {
      country: "France",
      name: "Marie",
      username: "MarieF",
      email: "marie.f@example.com",
      status: "Active",
      phone: "+33123456789",
      lastActive: "2024-03-12",
    },
  ];

  // Dummy booking history data
  const dummyHistory = [
    { bookingId: "Bk-001", date: "2025-02-10", service: "Consultation", status: "Completed", amount: "$150" },
    { bookingId: "Bk-002", date: "2025-02-10", service: "Consultation", status: "Pending", amount: "$75" },
  ];

  // Fetch country data from API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all");
        const data = await res.json();
        const countryList = data.map((country) => ({
          name: country.name.common,
          flag: country.flags.png,
        }));
        countryList.sort((a, b) => a.name.localeCompare(b.name));
        setCountries(countryList);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();

    const storedUsers = JSON.parse(localStorage.getItem("users")) || dummyUsers;
    setUsers(storedUsers);
    setFilteredUsers(storedUsers);
    localStorage.setItem("users", JSON.stringify(storedUsers));
  }, []);

  useEffect(() => {
    let tempUsers = [...users];
    const currentDate = new Date();

    // Country filter
    if (selectedCountry !== "All") {
      tempUsers = tempUsers.filter((user) => user.country === selectedCountry);
    }

    // Name search filter
    if (searchName) {
      tempUsers = tempUsers.filter((user) =>
        user.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    // Last active filter
    if (lastActive !== "All Time") {
      const days = parseInt(lastActive);
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);
      
      tempUsers = tempUsers.filter((user) => {
        const userDate = new Date(user.lastActive);
        return userDate >= cutoffDate;
      });
    }

    setFilteredUsers(tempUsers);
    setCurrentPage(1);
  }, [selectedCountry, searchName, lastActive, users]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const downloadExcel = () => {
    const ws = utils.json_to_sheet(filteredUsers);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Users");
    writeFile(wb, "UserManagement.xlsx");
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setIsPopupOpen(true);
  };

  const handleUpdate = () => {
    const updatedUsers = users.map((user) =>
      user.username === currentUser.username ? { ...user, ...currentUser } : user
    );
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setIsPopupOpen(false);
  };
  const handleDeactivate = () => {
    const updatedUsers = users.map((user) =>
      user.id === currentUser.id
        ? { ...user, status: user.status === "Active" ? "Deactivated" : "Active" }
        : user
    );
  
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setIsPopupOpen(false);
  };
  

  const handleDelete = (user) => {
    setUserToDelete(user);
    setIsDeletePopupOpen(true);
  };

  const handleConfirmDelete = () => {
    const updatedUsers = users.filter(
      (user) => user.username !== userToDelete.username
    );
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setIsDeletePopupOpen(false);
  };

  const handleHistory = (user) => {
    setUserHistory(dummyHistory); // Load dummy booking history
    setIsHistoryPopupOpen(true); // Open the booking history popup
  };

  return (
    <div className="flex justify-center w-full p-6 bg-white">
      <div className="w-11/12">
        <h1 className="text-2xl font-bold mb-4 text-[#191919]">USER MANAGEMENT</h1>

        {/* Filter Section */}
        <div className="flex gap-4 items-center mb-6">
          <div>
            <label className="block mb-1 text-md text-[#191919]">Select Country</label>
            <select
              className="p-2 rounded-full border border-gray-300 w-44 bg-gray-100 text-[#C91416] focus:outline-none"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              <option value="All">ALL</option>
              {countries.map((country) => (
                <option key={country.name} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 text-md text-[#191919]">Last Active</label>
            <select
              className="p-2 rounded-full border border-gray-300 w-44 bg-gray-100 text-[#C91416] focus:outline-none"
              value={lastActive}
              onChange={(e) => setLastActive(e.target.value)}
            >
              <option value="All Time">All Time</option>
              <option value="7">Last 7 Days</option>
              <option value="30">Last 30 Days</option>
              <option value="90">Last 90 Days</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-md text-[#191919]">Search by Name</label>
            <div className="relative">
              <div className="absolute h-6 w-6 bg-[#EC6453] rounded-full mt-2 ml-2">
                <Search className="m-1 text-white" size={16} />
              </div>
              <input
                type="text"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="p-2 rounded-full border border-gray-300 w-48 bg-gray-100 text-gray-700 focus:outline-none pl-10"
                placeholder="Search by name..."
              />
            </div>
          </div>

          <div className="ml-auto mt-6">
            <button
              onClick={downloadExcel}
              className="p-2 bg-black text-white rounded flex items-center gap-2"
            >
              <Download size={16} />
            </button>
          </div>
        </div>

        {/* Data Table */}
        <table className="w-full">
          <thead className="border-y-2 border-[#FA9E93]">
            <tr>
              <th className="p-2 text-center">COUNTRY</th>
              <th className="p-2 text-center">NAME</th>
              <th className="p-2 text-center">USERNAME</th>
              <th className="p-2 text-center">EMAIL</th>
              <th className="p-2 text-center">STATUS</th>
              <th className="p-2 text-center">PHONE</th>
              <th className="p-2 text-center">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((user) => (
              <tr key={user.username} className="hover:bg-gray-100">
                <td className="p-2 text-center">{user.country}</td>
                <td className="p-2 text-center">{user.name}</td>
                <td className="p-2 text-center">{user.username}</td>
                <td className="p-2 text-center">{user.email}</td>
                <td className="p-2 text-center">
                  <div
                    className={`inline-block w-40 px-3 py-1 rounded-xl border ${
                      user.status === "Active"
                        ? "bg-green-100 border-green-300"
                        : "bg-red-100 border-red-300"
                    }`}
                  >
                    {user.status}
                  </div>
                </td>
                <td className="p-2 text-center">{user.phone}</td>
                <td className="p-2 flex gap-4 justify-center">
                  <button
                    className="text-black border border-black w-6 h-6 rounded-md"
                    onClick={() => handleEdit(user)}
                  >
                    <MdEdit size={20} />
                  </button>
                  <button
                    className="text-[#EC6453] border border-black w-[1.6rem] h-[1.5rem] px-[0.16rem] rounded-md"
                    onClick={() => handleDelete(user)}
                  >
                    <MdDelete size={20} />
                  </button>
                  <button
                    className="text-black border border-black w-7 h-6 rounded-md px-[0.16rem]"
                    onClick={() => handleHistory(user)}  // Trigger booking history popup
                  >
                    <RiHistoryLine size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-4">
          <div className="flex gap-2 p-2 border rounded-lg bg-white shadow-lg shadow-gray-400">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg ${
                currentPage === 1
                  ? "text-gray-500 cursor-not-allowed"
                  : "text-red-500"
              }`}
            >
              <IoIosArrowBack size={20} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`mx-1 px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-[#C91416] text-white"
                    : "bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg ${
                currentPage === totalPages
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-red-500"
              }`}
            >
              <IoIosArrowForward size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Edit Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-2xl w-[50vw] shadow-lg border border-white">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <div className="mb-4">
              <label className="block mb-2">Email</label>
              <input
                type="email"
                className="p-2 w-full border border-gray-300 rounded-lg"
                value={currentUser?.email || ""}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, email: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Phone Number</label>
              <input
                type="tel"
                className="p-2 w-full border border-gray-300 rounded-lg"
                value={currentUser?.phone || ""}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, Phone: e.target.value })
                }
              />
            </div>
           
            <div className="flex justify-center w-full gap-[5rem]">
              <div className="flex w-full justify-evenly">
                <button
                  onClick={handleUpdate}
                  className="w-[40%] px-6 py-4 mb-5 bg-blue-500 text-white rounded-lg "
                >
                  Update
                </button>
                <button
                  onClick={handleDeactivate}
                  className="w-[40%] px-6 py-4 mb-5 bg-blue-500 text-white rounded-lg"
                >
                  Deactivate
                </button>
              </div>
            </div>
            <div className="flex justify-center">
                <button
                  onClick={() => setIsPopupOpen(false)}
                  className=" w-52 px-6 py-4 bg-gray-300 text-white rounded-lg"
                >
                  Cancel
                </button>
              </div>
          </div>
        </div>
      )}

      {/* Delete Popup */}
{isDeletePopupOpen && (
  <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-500 bg-opacity-50">
    <div className="bg-white p-6 rounded-2xl w-[40vw] shadow-lg border border-gray-300">
      <h2 className="text-xl text-left font-semibold mb-4">Confirm Delete</h2><hr className="border-red-600"/>
      <p className="mb-6 mt-4 text-left text-gray-600">
        Are you sure you want to delete this user permanently?
        <br /> You can’t undo this action.
      </p><hr className="border-red-600 mb-5"/>
      <div className="flex justify-between">
        <button
          onClick={handleConfirmDelete}
          className="px-14 py-2 bg-red-500 text-white rounded-lg text-md font-semibold"
        >
          DELETE
        </button>
        <button
          onClick={() => setIsDeletePopupOpen(false)}
          className="px-14 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg text-lg font-semibold"
        >
          CANCEL
        </button>
      </div>
    </div>
  </div>
)}


      {/* History Popup */}
      {isHistoryPopupOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-2xl w-[50vw] shadow-lg border border-white">
            <h2 className="text-xl font-bold mb-4">Booking History</h2>
            <table className="w-full rounded-md border border-[#D9D9D9] shadow-md">
              <thead className="border-y-2 border-[#D9D9D9] bg-[#D9D9D9]">
                <tr>
                  <th className="p-2 text-left">Booking Id</th>
                  <th className="p-2 text-left">Date</th>
                  <th className="p-2 text-left">Service</th>
                  <th className="p-2 text-left">Status</th>
                  <th className="p-2 text-left">Amount</th>
                </tr>
              </thead>
              <tbody>
                {userHistory.map((booking) => (
                  <tr key={booking.bookingId}>
                    <td className="p-2">{booking.bookingId}</td>
                    <td className="p-2">{booking.date}</td>
                    <td className="p-2">{booking.service}</td>
                    <td
                      className={`p-2 border text-center ${
                        booking.status === "Completed"
                          ? "bg-[#4CB269] text-white"
                          : "bg-[#FFA629] text-white"
                      }`}
                    >
                      {booking.status}
                    </td>
                    <td className="p-2">{booking.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-right">
              <button
                onClick={() => setIsHistoryPopupOpen(false)}
                className="text-black mt-4 px-6 py-2 rounded-lg border"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
