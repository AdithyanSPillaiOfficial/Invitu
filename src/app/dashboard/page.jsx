"use client";
import EventList from '@/components/EventList'
import { useDashboardContext } from '@/contexts/DashboardContext';
import React, { useEffect } from 'react'

function page() {
  const {setTitle} = useDashboardContext();
  useEffect(() => {
    setTitle("Dashboard Overview")
  }, [])
  
  const stats = [
    {
      title: 'Total Events', value: 128, icon: (
        <svg className="w-10 h-10 text-teal-400 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: 'Upcoming Week', value: 6, icon: (
        <svg className="w-10 h-10 text-teal-400 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Attendees', value: '2,450', icon: (
        <svg className="w-10 h-10 text-teal-400 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857..." />
        </svg>
      )
    },
    {
      title: 'New Registrations', value: 52, icon: (
        <svg className="w-10 h-10 text-teal-400 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3..." />
        </svg>
      )
    }
  ];
  return (
    <div className='w-full h-full'>
      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 p-4 md:p-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-5 rounded-xl shadow-md flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
              <p className="text-3xl font-bold text-teal-700 mt-1">{stat.value}</p>
            </div>
            {stat.icon}
          </div>
        ))}
      </div>
      <EventList title={"Recent Events"}/>
    </div>
  )
}

export default page