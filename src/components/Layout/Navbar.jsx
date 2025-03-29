'use client';

import { useState } from 'react';
import { AiOutlineBell } from 'react-icons/ai'; // Notification icon
import { FaUserCircle } from 'react-icons/fa'; // Profile icon

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="flex items-center p-6 bg-white">
      {/* Uncomment if you want a logo on the left
      <div className="flex items-center">
        <img src="/AMD_icon.png" alt="Logo" className="h-12" />
      </div>
      */}

      {/* AMD Brand in the center */}
      <div className="mx-auto ml-[100vh] text-3xl font-bold text-black">AMD</div>

      {/* Notification Icon and Profile on the right */}
      <div className="flex items-center space-x-4 relative ml-auto">
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
          <span className="text-black font-semibold">AMD</span>
          <div className="relative">
            <div
              onClick={toggleDropdown}
              className="flex items-center justify-center bg-black text-white p-3 rounded-full cursor-pointer"
            >
              <FaUserCircle className="h-6 w-6" />
            </div>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded-lg shadow-lg">
                <ul className="py-2 space-y-2">
                  <li className="flex items-center px-4 py-2 cursor-pointer text-[#D10404] hover:bg-gray-200 whitespace-nowrap">
                    <img
                      src="/ExpertRegistered.png"
                      alt="Expert Registered"
                      className="h-6 w-6 mr-3"
                    />
                    An Expert Just Registered!
                  </li>
                  <li className="flex items-center px-4 py-2 cursor-pointer text-[#D10404] hover:bg-gray-200 whitespace-nowrap">
                    <img
                      src="/CancelledExpert.png"
                      alt="Session Canceled"
                      className="h-6 w-6 mr-3"
                    />
                    Session canceled by Expert
                  </li>
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
