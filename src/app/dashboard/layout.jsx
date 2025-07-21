"use client";
import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'
import React, { useState } from 'react'

function DashboardLayout({children}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className='w-screen h-screen flex flex-row bg-teal-50 overflow-hidden'>
        <Sidebar isOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
        <div className='w-full h-full flex flex-col'>
            <Topbar setSidebarOpen={setSidebarOpen}/>
            {children}
        </div>
    </div>
  )
}

export default DashboardLayout