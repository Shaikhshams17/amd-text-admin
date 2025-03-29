import Footer from '@/components/Layout/Footer'
import Navbar from '@/components/Layout/Navbar'
import AdminSidebar from '@/components/Layout/Sidebar'
import PendingExpertsRequestProfile from '@/components/PendingExpertsRequestProfile/PendingExpertsRequestProfile'
import React from 'react'


const page = () => {
  return (
    <div>
       
      <div className='h-[90px]'>
      <Navbar/>
      </div>

      <div className='flex '> 
        <div className='w-[300px]'>
      <AdminSidebar/>
        </div>
      <PendingExpertsRequestProfile/>
      </div>
      
      <Footer/>
      
    </div>
  )
}

export default page