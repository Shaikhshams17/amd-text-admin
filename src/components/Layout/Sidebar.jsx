"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  FaTachometerAlt,
  FaUserAlt,
  FaCreditCard,
  FaThumbsUp,
  FaCogs,
  FaDatabase,
  FaAngleDown,
  FaAngleUp,
  FaUserCog,
  FaMoneyBillAlt,
  FaRegHandshake,
  FaCalendar,
} from "react-icons/fa";

const AdminSidebar = () => {
  const router = useRouter(); // Initialize router
  const pathname = usePathname(); // Get current route path

  // Initialize state with saved dropdown from localStorage
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    // Check if there's a saved state in localStorage
    const savedDropdown = localStorage.getItem("openDropdown");
    if (savedDropdown) {
      setOpenDropdown(savedDropdown);
    }
  }, []);

  const handleToggle = (dropdown) => {
    // Save the open dropdown state to localStorage
    const newDropdown = openDropdown === dropdown ? null : dropdown;
    setOpenDropdown(newDropdown);
    localStorage.setItem("openDropdown", newDropdown); // Save to localStorage
  };

  const handleTabClick = (route, toggle = false) => {
    if (route) {
      router.push(route); // Navigate to the provided route
    }

    if (toggle) {
      toggle(); // Toggle dropdown if the item has a dropdown
    }
  };

  // Check if the route is active or default to Dashboard if no route is selected
  const isActive = (route) => {
    return pathname === route || (pathname === "/" && route === "/dashboard");
  };

  return (
    <div className="w-full h-auto bg-[#E6E6E6] p-4 rounded-3xl ml-3">
      <div className="space-y-2">
        {/* Sidebar Button Component */}
        {[ 
          { name: "Dashboard", icon: <FaTachometerAlt />, route: "/dashboard" },
          {
            name: "User Management",
            icon: <FaUserAlt />,
            route: "/usermanagement",
            state: openDropdown === "userManagement",
            toggle: () => handleToggle("userManagement"),
            subItems: [
              {
                name: "Session Management",
                icon: <FaUserCog />,
                route: "/sessionmanagement",
              },
            ],
          },
          {
            name: "Experts On App",
            icon: <FaUserAlt />,
            route: "/experts",
          },
          {
            name: "Pending Expert Requests",
            icon: <FaRegHandshake />,
            route: "/pendingexpertsrequest",
          },
          {
            name: "Payments & Finance",
            icon: <FaCreditCard />,
            route: "/paymentfinance",
            state: openDropdown === "payments",
            toggle: () => handleToggle("payments"),
            subItems: [
              { name: "Overview", icon: <FaMoneyBillAlt />, route: "/overview" },
              {
                name: "Transactions",
                icon: <FaMoneyBillAlt />,
                route: "/transactions",
              },
              {
                name: "Withdrawal",
                icon: <FaMoneyBillAlt />,
                route: "/withdrawal",
              },
            ],
          },
          {
            name: "Reviews/Feedback",
            icon: <FaThumbsUp />,
            route: "/review",
          },
          {
            name: "Admin Logs",
            icon: <FaCalendar />,
            state: openDropdown === "adminLogs",
            toggle: () => handleToggle("adminLogs"),
            subItems: [
              { name: "Discount Management", icon: <FaCogs />, route: "/discount" },
            ],
            route: "/adminlogs",
          },
          {
            name: "Settings",
            icon: <FaCogs />,
            route: "/settings",
          },
          {
            name: "Backup Management",
            icon: <FaDatabase />,
            route: "/backupmanagement",
          },
        ].map((item, index) => (
          <div key={index}>
            {/* Main Sidebar Button */}
            <div
              onClick={item.toggle ? () => handleTabClick(item.route, item.toggle) : () => handleTabClick(item.route)}
              className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${
                isActive(item.route) && !item.subItems
                  ? "bg-black text-white"
                  : "hover:bg-black hover:text-white"
              }`}
            >
              <div className="flex items-center space-x-2">
                {item.icon}
                <span>{item.name}</span>
              </div>
              {item.toggle && (item.state ? <FaAngleUp /> : <FaAngleDown />)}
            </div>

            {/* Sub Items */}
            {item.subItems && item.state && (
              <div className="pl-6 space-y-2">
                {item.subItems.map((subItem, subIndex) => (
                  <div
                    key={subIndex}
                    onClick={() => handleTabClick(subItem.route)}
                    className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer ${
                      isActive(subItem.route)
                        ? "bg-black text-white"
                        : "hover:bg-black hover:text-white"
                    }`}
                  >
                    {subItem.icon}
                    <span>{subItem.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;
