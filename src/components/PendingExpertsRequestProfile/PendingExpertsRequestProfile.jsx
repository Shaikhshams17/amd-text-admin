"use client";

import React from "react";
import { ChevronLeft, Download } from "lucide-react";

const PendingExpertsRequestProfile = () => {
  return (
    <div className="min-h-screen bg-white p-8 -mt-7">
      <div className="mx-auto max-w-4xl bg-white  p-8">
        {/* Header */}
       
        
        <h1 className="text-3xl font-semibold text-gray-900 mb-4">PROFILE DETAILS</h1>
<div className="flex items-center space-x-4">
  {/* Profile Picture */}
  <img
    src=" "
    alt="Profile"
    className="w-16 h-16 rounded-full object-cover"
  />
  
  {/* Profile Info */}
  <div>
    <h2 className="text-2xl font-semibold text-gray-800">Ayaan Raje</h2>
    <p className="text-gray-600">Wellness Expert</p>
    <p className="text-gray-600">India</p>
  </div>
</div>


        <div className="py-4 my-6 rounded-lg border border-gray-200 px-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 ">Personal Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 mb-6">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium">Ayaan Raje</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date Of Birth</p>
              <p className="font-medium">03/04/1996</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Age</p>
              <p className="font-medium">56</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3">
            <div>
              <p className="text-sm text-gray-500">Phone Number</p>
              <p className="font-medium">+91 9920892689</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email Address</p>
              <p className="font-medium">ayaanraje25@gmail.com</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Bio</p>
              <p className="font-medium">Entrepreneur</p>
            </div>
          </div>
        </div>

        <div className="mb-8 rounded-lg border border-gray-200 px-4 py-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Area of Expertise</h3>
          <p className="text-gray-600 mb-4">
            Co-Founder Of Reddit. First Batch Of Y Combinator (Summer 2005) And Led The Company To A Sale To Condé Nast In 2006, Returned As Exec Chair in 2014 To Help Lead The Turnaround, Then Left In 2018 To Do Venture Capital Fulltime. I’m An Investor in Startups —Almost Always At The Earliest Possible Stage— First As An Angel Investor, Then Co-Founder Of Initialized, Before Splitting The Firm In Half To Found Seven Seven Six.
          </p>
          
          <h4 className="font-semibold text-gray-800 mt-6 mb-3">Things I Can Advice On:</h4>
          <ul className="gap-2 list-disc pl-5">
            <li>Startup Struggles</li>
            
            <li>Customer Retention Service</li>
            <li>Product Development</li>
            <li>Branding & PR</li>
            <li>How To Get Products Into Retail</li>
            <li>Hiring</li>
            <li>Franchising</li>
            <li>Mergers & Acquisitions</li>
            <li>Growth</li>
            <li>Thinking Outside The Box</li>
          </ul>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Professional Certifications</h3>
          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-black ">
            <span className="text-gray-600">3 Files uploaded</span>
            <button className="flex items-center text-blue-600 hover:text-blue-800">
              <Download className="mr-2" size={16} />
              Download All
            </button>
          </div>
        </div>

        <div className="mb-8 rounded-lg border border-gray-200 px-4 py-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Experience</h3>
          <p className="text-black">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non prudent, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700 px-2">
              Instagram username
              
            </label>
          </div>
          <input
            type="text"
            className="w-full p-2 border border-gray-400 rounded-md"
            placeholder="@ username(optional)"
          />

<div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium text-gray-700 px-2 py-3">
              Twitter username
              
            </label>
          </div>
          <input
            type="text"
            className="w-full p-2 border border-gray-400 rounded-md"
            placeholder="@ username(optional)"
          />
          
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium text-gray-700 px-2 py-3">
              LinkedIn username
              
            </label>
          </div>
          <input
            type="text"
            className="w-full p-2 border border-gray-400 rounded-md"
            placeholder="@ username(optional)"
          />

<div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium text-gray-700 px-2 py-3">
              YouTube username
              
            </label>
          </div>
          <input
            type="text"
            className="w-full p-2 border border-gray-400 rounded-md"
            placeholder="@ username(optional)"
          />

<div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium text-gray-700 px-2 py-3">
              TikTok username
              
            </label>
          </div>
          <input
            type="text"
            className="w-full p-2 border border-gray-400 rounded-md"
            placeholder="@ username(optional)"
          />
        </div>
      </div>
    </div>
  );
};

export default PendingExpertsRequestProfile;