import UserCountryGraph from '@/components/Dashboard/CountryGraph'
import Domain from '@/components/Dashboard/Domain'
import LatestRegistration from '@/components/Dashboard/LatestRegistration'
import UserGraph from '@/components/Dashboard/Linegraph'
import Footer from '@/components/Layout/Footer'
import Navbar from '@/components/Layout/Navbar'
import AdminSidebar from '@/components/Layout/Sidebar'

import React from 'react'

const Page = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navbar */}
      <Navbar />
      
      {/* Main Content Area */}
      <div className="flex flex-1 relative"> {/* Added 'relative' to ensure position for the divider */}
        
        {/* Sidebar (Left) */}
        <div className="w-64 left-[230px]">
          <AdminSidebar />
        </div>

        {/* Red Divider */}
        <div className="absolute left-[220px] top-0 w-1 bg-red-600 h-[171.4rem] z-10 ml-8"></div> {/* Explicitly position the divider */}

        {/* Main Content (Right) */}
        <div className="flex-1 pl-8">
          <LatestRegistration />
          <Domain />
          <UserGraph />
          <UserCountryGraph />
        </div>
      </div>

       <div className='w-[78.07rem] ml-[16rem]'>  
      <Footer />
      </div>
      {/* Footer at Bottom */}
    </div>
  )
}

export default Page
