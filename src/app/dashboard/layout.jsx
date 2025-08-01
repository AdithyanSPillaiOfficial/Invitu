"use client";
import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'
import { DashboardProvider } from '@/contexts/DashboardContext';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const sessionId = Cookies.get("sessionid");
  const user = Cookies.get('user');
  useEffect(() => {
    if (!(sessionId || user)) {
      toast.warning("Please Login")
      router.replace("/login")
    }
  }, [])

  return (
    <div className='w-screen h-screen flex flex-row bg-teal-50 overflow-hidden'>
      {sessionId && (<>
        <DashboardProvider>
          <Sidebar isOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className='w-full h-full flex flex-col'>
            <Topbar setSidebarOpen={setSidebarOpen}/>
            {children}
          </div>
        </DashboardProvider>
      </>)}
    </div>
  )
}

export default DashboardLayout