"use client";
import React, { useEffect, useState } from 'react';
import EventTile from './EventTile';
import AddEventPopup from './AddEventPopup';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useDashboardContext } from '@/contexts/DashboardContext';


const EventList = ({title}) => {

  const [addEventOpen, setAddEventOpen] = useState(false);


  // const [events, setEvents] = useState([
  //   {
  //     title: 'Team Meeting',
  //     date: 'July 25, 2025',
  //     time: '10:00 AM - 11:00 AM',
  //     location: 'Conference Room A'
  //   },
  //   {
  //     title: 'Project Deadline Review',
  //     date: 'August 1, 2025',
  //     time: '2:00 PM - 3:30 PM',
  //     location: 'Online (Zoom)'
  //   },
  //   {
  //     title: 'Client Presentation',
  //     date: 'August 5, 2025',
  //     time: '11:00 AM - 12:00 PM',
  //     location: 'Client Office'
  //   },
  //   {
  //     title: 'Company Picnic',
  //     date: 'August 15, 2025',
  //     time: '1:00 PM - 5:00 PM',
  //     location: 'Central Park'
  //   },
  //   {
  //     title: 'Marketing Strategy Session',
  //     date: 'August 20, 2025',
  //     time: '9:00 AM - 12:00 PM',
  //     location: 'Marketing Department'
  //   },
  //   {
  //     title: 'Product Launch Prep',
  //     date: 'August 28, 2025',
  //     time: '3:00 PM - 5:00 PM',
  //     location: 'Development Lab'
  //   }
  // ]);

  const [events, setEvents] = useState([]);


  useEffect(() => {
    async function fetchEvents() {
      const result = await fetch("/api/getevents", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sessionid: Cookies.get("sessionid") })
      });
      if (result.ok) {
        const res = await result.json();
        if (res.success) {
          if (res.events && res.events.length > 0) {
            setEvents(res.events);
          }
          else toast.warning("You dont have any events registered");
        }
        else console.log(res.error)
      }
    }
    fetchEvents();
  }, [])


  return (
    <main className="flex-grow p-4 md:p-6 h-full overflow-y-auto max-h-full box-border pb-20">

      {/* Events Section Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{title ? title : "Events"}</h2>
        <button id="addEventBtn" onClick={() => setAddEventOpen(true)} className="bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-bold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center space-x-2 focus:outline-none focus:ring-4 focus:ring-teal-300 w-full sm:w-auto justify-center">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Add Event</span>
        </button>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mb-28">
        {events.map((event, index) => (
          <EventTile event={event} index={index} key={index} />
        ))}
      </div>

      {addEventOpen && (
        <AddEventPopup togglePopup={setAddEventOpen} setEvents={setEvents} />
      )}
    </main>
  );
};

export default EventList;
