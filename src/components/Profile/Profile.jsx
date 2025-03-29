import React, { useState } from "react";
import { CgProfile } from "react-icons/cg"; // Profile icon from react-icons
import { RiEdit2Fill } from "react-icons/ri"; // Edit icon from react-icons
import { RxCross2 } from "react-icons/rx"; // Close icon from react-icons
// import { CgProfile } from 'react-icons/cg';
import { FiEdit } from 'react-icons/fi';

const ProfileDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Wajiha");
  const [email, setEmail] = useState("wajiha07@gmail.com");
  const [newPassword, setNewPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // Save updated details (could be to an API or local state)
  };

  const handleCloseModal = () => {
    setIsEditing(false);
  };

  return (
    <div className="flex items-left w-full p-6 bg-white">
      <div className="w-full max-w-md p-6 rounded-xl ">
        {/* Add "PROFILE DETAILS" in uppercase above the profile icon */}
        <h2 className="text-xl font-semibold uppercase mb-4">PROFILE DETAILS</h2>

        <div className="flex items-center mb-4">
  <div className="relative w-12 h-12 bg-gray-300 rounded-full mr-4 flex items-center justify-center">
    <CgProfile size={40} className="text-gray-700" />
    <FiEdit size={18} className="absolute text-gray-500 bottom-0 right-0 cursor-pointer" />
  </div>
  
  <div className="flex items-center">
    <div className="w-px h-8 bg-[#FA9E93] mx-1"></div> {/* This is the line between the profile and name */}
    <div>
      <h2 className="text-xl font-semibold">{name || "Wajiha"}</h2>
      <p className="text-sm text-gray-500">{email || "wajiha07@gmail.com"}</p>
    </div>
  </div>
</div>


        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-semibold">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)} // Make input editable
            className="w-full p-2 mt-1 border rounded-lg bg-gray-100"
            placeholder="Enter your name"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Make input editable
            className="w-full p-2 mt-1 border rounded-lg bg-gray-100"
            placeholder="Enter your email"
          />
        </div>

        {/* Move the Edit Details button to the bottom of the profile */}
        <div className="mt-4">
  <button onClick={handleEditClick} className="flex items-center">
    <RiEdit2Fill size={16} className="mr-2" />
    <span className="text-[#EC6453]">Edit Details</span>
  </button>
</div>


        {/* Popup Modal for Editing Details */}
        {isEditing && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
              {/* Close button positioned at the top right */}
              <button
                onClick={handleCloseModal}
                className="absolute top-2 right-2 text-gray-500"
              >
                <RxCross2 size={24} />
              </button>

              <h2 className="text-xl font-semibold mb-4">Edit Details</h2>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-semibold">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)} // Make input editable
                  className="w-full p-2 mt-1 border rounded-lg bg-gray-100"
                  placeholder="Enter your name"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Make input editable
                  className="w-full p-2 mt-1 border rounded-lg bg-gray-100"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="newPassword" className="block text-sm font-semibold">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-2 mt-1 border rounded-lg"
                  placeholder="Enter new password"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="retypePassword" className="block text-sm font-semibold">
                  Re-type New Password
                </label>
                <input
                  type="password"
                  id="retypePassword"
                  value={retypePassword}
                  onChange={(e) => setRetypePassword(e.target.value)}
                  className="w-full p-2 mt-1 border rounded-lg"
                  placeholder="Re-type new password"
                />
              </div>
              <div className="flex justify-start gap-6">
                <button
                  onClick={handleSaveClick}
                  className="px-4 py-2 w-[70%] text-sm font-semibold text-white bg-blue-500 rounded-lg"
                >
                  UPDATE
                </button>
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 w-[25%] text-sm font-semibold text-gray-700 border border-[#808080] rounded-lg"
                >
                  CANCEL
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileDetails;
