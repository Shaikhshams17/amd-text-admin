'use client'

import Footer from '@/components/Layout/Footer'
import Navbar from '@/components/Layout/Navbar'
import AdminSidebar from '@/components/Layout/Sidebar'
import PendingExpertsRequest from '@/components/PendingExpertsRequest/PendingExpertsRequest'
// import Withdrawal from '@/components/Withdrawal/Withdrawal'
// import Transaction from '@/components/Transaction/Transaction'
import React from 'react'

const Page = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <div className="flex flex-1">
        {/* Sidebar (Left) */}
        <div className="hidden lg:block w-64">
          <AdminSidebar />
        </div>

        {/* Red Divider (optional) */}
        <div className="hidden lg:block w-1 bg-red-600" />

        {/* Main Content (Right) */}
        <div className="flex-1  overflow-auto">
          <PendingExpertsRequest />
          <div>
          
          <Footer />
          </div>
        </div>
        
      </div>

      {/* Footer at Bottom */}
      
    </div>
  )
}

export default Page;
