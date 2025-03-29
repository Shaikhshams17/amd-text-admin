'use client'

import { useState } from "react";
import { AiOutlineBell } from "react-icons/ai"; // Notification icon
import { FaUserCircle } from "react-icons/fa"; // Profile icon

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="flex justify-between items-center p-6 bg-white">
      {/* Logo */}
      <div className="flex items-center">
        <img src="/AMD_icon.png" alt="Logo" className="h-12" />
      </div>

      {/* AMD Brand (Text is larger now) */}
      <div className="text-3xl font-bold text-black">AMD</div>

      {/* Notification Icon and Profile */}
      <div className="flex items-center space-x-4 relative">
        {/* Notification Icon */}
        <div className="relative">
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
            {notificationCount}
          </span>
          <div className="p-2 cursor-pointer">
            <AiOutlineBell className="h-6 w-6 text-gray-600" />
          </div>
        </div>

        {/* Profile Section */}
        <div className="flex items-center space-x-2">
          {/* Text "AMD" */}
          <span className="text-black font-semibold">AMD</span>

          {/* Profile Icon */}
          <div className="relative">
            <div
              onClick={toggleDropdown}
              className="flex items-center justify-center bg-black text-white p-3 rounded-full cursor-pointer"
            >
              <FaUserCircle className="h-6 w-6" />
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded-lg shadow-lg">
                <ul className="py-2 space-y-2">
                  {/* Option 1: Expert Registered */}
                  <li className="flex items-center px-4 py-2 cursor-pointer text-[#D10404] hover:bg-gray-200 whitespace-nowrap">
                    <img
                      src="/ExpertRegistered.png"
                      alt="Expert Registered"
                      className="h-6 w-6 mr-3"
                    />
                    An Expert Just Registered!
                  </li>
                  {/* Option 2: Session Canceled */}
                  <li className="flex items-center px-4 py-2 cursor-pointer text-[#D10404] hover:bg-gray-200 whitespace-nowrap">
                    <img
                      src="/CancelledExpert.png"
                      alt="Session Canceled"
                      className="h-6 w-6 mr-3"
                    />
                    Session canceled by Expert
                  </li>
                  {/* Option 3: User Registered */}
                  <li className="flex items-center px-4 py-2 cursor-pointer text-[#D10404] hover:bg-gray-200 whitespace-nowrap">
                    <img
                      src="/UserRegistered.png"
                      alt="User Registered"
                      className="h-6 w-6 mr-3"
                    />
                    An User Just Registered!
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
