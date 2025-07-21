"use client";
import React, { useState } from 'react';
import EventTile from './EventTile';
import AddEventPopup from './AddEventPopup';

const stats = [
  { title: 'Total Events', value: 128, icon: (
    <svg className="w-10 h-10 text-teal-400 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  )},
  { title: 'Upcoming Week', value: 6, icon: (
    <svg className="w-10 h-10 text-teal-400 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )},
  { title: 'Attendees', value: '2,450', icon: (
    <svg className="w-10 h-10 text-teal-400 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857..." />
    </svg>
  )},
  { title: 'New Registrations', value: 52, icon: (
    <svg className="w-10 h-10 text-teal-400 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3..." />
    </svg>
  )}
];

const events = [
  {
    title: 'Team Meeting',
    date: 'July 25, 2025',
    time: '10:00 AM - 11:00 AM',
    location: 'Conference Room A'
  },
  {
    title: 'Project Deadline Review',
    date: 'August 1, 2025',
    time: '2:00 PM - 3:30 PM',
    location: 'Online (Zoom)'
  },
  {
    title: 'Client Presentation',
    date: 'August 5, 2025',
    time: '11:00 AM - 12:00 PM',
    location: 'Client Office'
  },
  {
    title: 'Company Picnic',
    date: 'August 15, 2025',
    time: '1:00 PM - 5:00 PM',
    location: 'Central Park'
  },
  {
    title: 'Marketing Strategy Session',
    date: 'August 20, 2025',
    time: '9:00 AM - 12:00 PM',
    location: 'Marketing Department'
  },
  {
    title: 'Product Launch Prep',
    date: 'August 28, 2025',
    time: '3:00 PM - 5:00 PM',
    location: 'Development Lab'
  }
];

const EventList = () => {

    const [addEventOpen, setAddEventOpen] = useState(false);
  return (
    <main className="flex-grow p-4 md:p-6 h-full overflow-y-auto max-h-full box-border pb-20">
      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
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

      {/* Events Section Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Recent Events</h2>
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
          <EventTile event={event} index={index} key={index}/>
        ))}
      </div>

      {addEventOpen && (
        <AddEventPopup togglePopup={setAddEventOpen}/>
      )}
    </main>
  );
};

export default EventList;
