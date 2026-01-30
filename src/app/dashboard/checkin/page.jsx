'use client';
import CheckinTile from '@/components/CheckInTile';
import EventTile from '@/components/EventTile';
import { useDashboardContext } from '@/contexts/DashboardContext';
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

function page() {

  const [checkinEvents, setCheckinEvents] = useState([]);

  const {setTitle} = useDashboardContext();
  useEffect(() => {
    setTitle("Checkin Accounts")
    fetchEvents();
  }, [])
  
  
  
  async function fetchEvents() {
    const result = await fetch('/api/getcheckinevents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sessionid: Cookies.get('sessionid')
      })
    })
    if(result.ok) {
      const res = await result.json();
      if(res.success) {
        if(res.events.length < 1) toast.warning('No Events Associated with your account');
        setCheckinEvents(res.events);
        console.log('Events : ', res.events)
      }
      else {
        toast.error(res.error);
      }
    }
    else {
      toast.error('Something Went Wrong');
    }
  }
  return (
    <div className='w-full m-5 pb-25 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mb-28'>
      {
        checkinEvents.map((event, index) => (
          <CheckinTile event={event} key={index}/>
        ))
      }
    </div>
  )
}

export default page