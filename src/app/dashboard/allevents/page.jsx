"use client";
import EventList from '@/components/EventList'
import { useDashboardContext } from '@/contexts/DashboardContext'
import React, { useEffect } from 'react'

function AllEvents() {
    const {setTitle} = useDashboardContext();
    useEffect(() => {
      setTitle("All Events");
    }, [])
    
  return (
    <div className='w-full h-full'>
        <EventList title={"All Events"}/>
    </div>
  )
}

export default AllEvents