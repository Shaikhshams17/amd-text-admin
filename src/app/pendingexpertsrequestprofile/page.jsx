

import Footer from '@/components/Layout/Footer'
import Navbar from '@/components/Layout/Navbar'
import AdminSidebar from '@/components/Layout/Sidebar'
import PendingExpertsRequestProfile from '@/components/PendingExpertsRequestProfile/PendingExpertsRequestProfile'
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
        <div className="hidden lg:block w-1 bg-red-600 ml-10" />

        {/* Main Content (Right) */}
        <div className="flex-1  overflow-auto">
         <PendingExpertsRequestProfile/>
          
          <Footer />
        </div>
        
      </div>

      {/* Footer at Bottom */}
      
    </div>
  )
}

export default Page
