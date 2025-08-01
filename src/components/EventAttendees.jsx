"use client";
import React, { useState } from 'react'
import AddAttendeePopup from './AddAttendeePopup';

function EventAttendees({eventId}) {
    const [popupActive, setPopupActive] = useState(false);
  return (
    // <!-- Main Container -->
    <div className="bg-white mt-5 w-full h-full p-6 sm:p-10 space-y-8">

        {/* <!-- Header and Add Attendee Button --> */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* <h1 className="text-4xl font-bold text-teal-800">Event Attendees</h1> */}
            {/* <!-- Add Attendee Button with an SVG icon --> */}
            <button onClick={() => setPopupActive(true)} className="flex items-center gap-2 bg-teal-500 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105 active:scale-95 duration-200 focus:outline-none focus:ring-4 focus:ring-teal-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                <span>Add Attendee</span>
            </button>
        </div>

        {/* <!-- Attendees List with Card-like Design --> */}
        <div className="divide-y divide-gray-200 rounded-2xl border border-gray-200 overflow-hidden">
            {/* <!-- Attendee Item 1 --> */}
            <div className="flex items-center justify-between p-4 sm:p-6 hover:bg-gray-50 transition-colors duration-200">
                {/* <!-- Attendee Details --> */}
                <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-teal-100 text-teal-600 font-bold rounded-full text-xl">
                        JD
                    </div>
                    <div>
                        <p className="text-lg font-semibold text-gray-900">Jane Doe</p>
                        <p className="text-sm text-gray-500">jane.doe@example.com</p>
                    </div>
                </div>
                {/* <!-- Action Buttons --> */}
                <div className="flex space-x-2">
                    {/* <!-- Edit Button --> */}
                    <button className="p-2 text-gray-400 hover:text-teal-500 transition-colors duration-200 rounded-full hover:bg-gray-100" title="Edit">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                        </svg>
                    </button>
                    {/* <!-- Share Button --> */}
                    <button className="p-2 text-gray-400 hover:text-teal-500 transition-colors duration-200 rounded-full hover:bg-gray-100" title="Share">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                            <polyline points="16 6 12 2 8 6"></polyline>
                            <line x1="12" y1="2" x2="12" y2="15"></line>
                        </svg>
                    </button>
                    {/* <!-- Delete Button --> */}
                    <button className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200 rounded-full hover:bg-gray-100" title="Delete">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                    </button>
                </div>
            </div>
            
            {/* <!-- Attendee Item 2 --> */}
            <div className="flex items-center justify-between p-4 sm:p-6 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-teal-100 text-teal-600 font-bold rounded-full text-xl">
                        JS
                    </div>
                    <div>
                        <p className="text-lg font-semibold text-gray-900">John Smith</p>
                        <p className="text-sm text-gray-500">john.smith@example.com</p>
                    </div>
                </div>
                <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-teal-500 transition-colors duration-200 rounded-full hover:bg-gray-100" title="Edit">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                        </svg>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-teal-500 transition-colors duration-200 rounded-full hover:bg-gray-100" title="Share">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                            <polyline points="16 6 12 2 8 6"></polyline>
                            <line x1="12" y1="2" x2="12" y2="15"></line>
                        </svg>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200 rounded-full hover:bg-gray-100" title="Delete">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                    </button>
                </div>
            </div>
            
            {/* <!-- Attendee Item 3 --> */}
            <div className="flex items-center justify-between p-4 sm:p-6 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-teal-100 text-teal-600 font-bold rounded-full text-xl">
                        AW
                    </div>
                    <div>
                        <p className="text-lg font-semibold text-gray-900">Alice Williams</p>
                        <p className="text-sm text-gray-500">alice.w@example.com</p>
                    </div>
                </div>
                <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-teal-500 transition-colors duration-200 rounded-full hover:bg-gray-100" title="Edit">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                        </svg>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-teal-500 transition-colors duration-200 rounded-full hover:bg-gray-100" title="Share">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                            <polyline points="16 6 12 2 8 6"></polyline>
                            <line x1="12" y1="2" x2="12" y2="15"></line>
                        </svg>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200 rounded-full hover:bg-gray-100" title="Delete">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        {popupActive && (<AddAttendeePopup setPopup={setPopupActive} eventId={eventId}/>)}
    </div>
  )
}

export default EventAttendees