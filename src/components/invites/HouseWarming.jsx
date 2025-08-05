"use client";
import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
// import { toast } from "react-toastify"; // Assuming toast is handled externally or removed if not needed for this standalone component

const HousewarmingInvite = ({ invite }) => {
    // Example invite structure for testing:
    // const invite = {
    //     _id: "housewarming123",
    //     attendee: {
    //         name: "Dear Friends & Family",
    //         address: "Your Company is Our Greatest Gift"
    //     },
    //     event: {
    //         type: "housewarming",
    //         hostnames: ["John & Jane Doe"], // Can be an array of names or a single string
    //         date: "2025-09-15T18:00:00Z",
    //         time: "6:00 PM",
    //         endtime: "9:00 PM",
    //         location: "123 Cozy Lane, New Town, USA",
    //         regards: "The Doe Family"
    //     }
    // };

    function formatTextDate(dateString) {
        const date = new Date(dateString);

        const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
        const day = date.getDate();
        const month = date.toLocaleDateString('en-US', { month: 'long' });
        const year = date.getFullYear();

        // Helper to get ordinal suffix
        function getOrdinal(n) {
            const s = ["th", "st", "nd", "rd"];
            const v = n % 100;
            return n + (s[(v - 20) % 10] || s[v] || s[0]);
        }

        return `${weekday}, ${getOrdinal(day)} of ${month} ${year}`;
    }

    // Function to render host names, handling single or multiple hosts
    const renderHostNames = (names) => {
        if (!names) return null;
        if (Array.isArray(names)) {
            return names.map((name, index) => (
                <h2 key={index} className="text-4xl md:text-6xl font-bold font-script text-amber-800">
                    {name}
                </h2>
            ));
        }
        return (
            <h2 className="text-4xl md:text-6xl font-bold font-script text-amber-800">
                {names}
            </h2>
        );
    };

    return (
        <div className="cozy-background min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            <style>
                {`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Dancing+Script:wght@400;700&display=swap');
        body {
          font-family: 'Playfair Display', serif;
        }
        .font-script {
          font-family: 'Dancing Script', cursive;
        }
        .cozy-background {
          background-color: #fefce8; /* Light yellow/cream */
          background-image: radial-gradient(#fde68a 1px, transparent 1px), radial-gradient(#fde68a 1px, #fefce8 1px);
          background-size: 20px 20px;
          background-position: 0 0, 10px 10px;
        }
        .card-style {
          background-color: #ffffff;
          border: 2px solid #fcd34d; /* Amber border */
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
                      0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        @keyframes bounce-house {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .bounce-house {
          animation: bounce-house 2s infinite;
        }
        `}
            </style>

            <div className="relative max-w-2xl w-full card-style rounded-3xl p-8 md:p-12 text-center text-amber-900 z-10">
                {/* Decorative House Backgrounds */}
                <div className="absolute inset-0 z-0 overflow-hidden rounded-3xl">
                    {[
                        { top: "top-10", left: "left-10", size: "w-12 h-12", color: "text-orange-300", rotate: "-rotate-12", opacity: "opacity-60" },
                        { bottom: "bottom-20", right: "right-10", size: "w-16 h-16", color: "text-yellow-400", rotate: "rotate-45", opacity: "opacity-40" },
                        { top: "top-1/2", left: "left-1/4", size: "w-8 h-8", color: "text-amber-200", opacity: "opacity-50" },
                        { bottom: "bottom-10", left: "left-1/3", size: "w-10 h-10", color: "text-orange-200", rotate: "-rotate-30", opacity: "opacity-30" },
                        { top: "top-20", right: "right-20", size: "w-14 h-14", color: "text-yellow-300", rotate: "rotate-20", opacity: "opacity-70" },
                    ].map((item, idx) => (
                        <svg
                            key={idx}
                            className={`absolute ${item.top || ""} ${item.bottom || ""} ${item.left || ""} ${item.right || ""} ${item.size} ${item.color} ${item.opacity} ${item.rotate || ""}`}
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {/* Simple House Icon */}
                            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                        </svg>
                    ))}
                </div>

                {/* Top Swirl Decoration */}
                <div className="relative z-10 flex justify-center">
                    <div className="absolute -top-6 w-48 h-12 md:w-64 md:h-16">
                        <svg className="w-full h-full text-amber-500 opacity-80" viewBox="0 0 100 20">
                            <path d="M5 10 C15 0, 35 0, 45 10 S65 20, 75 10 C85 0, 95 0, 105 10" fill="none" stroke="currentColor" strokeWidth="2" />
                            <path d="M47 8.5 C49 6.5, 51 6.5, 53 8.5 L50 12 L47 8.5 Z" fill="currentColor" />
                        </svg>
                    </div>
                </div>

                {/* Content */}
                <div className="relative z-10 space-y-6 md:space-y-8 mt-6">
                    <h1 className="text-4xl md:text-6xl font-script text-amber-700">Warm Welcome!</h1>
                    <p className="text-lg md:text-xl font-medium">Please join us as we celebrate our new home and new beginnings.</p>
                    <p className="text-xl font-bold font-script text-amber-900 ">Housewarming Celebration Of</p>

                    {/* Host Names */}
                    <div className="space-y-2">
                        {renderHostNames(invite.event?.hostnames)}
                        <div className="flex items-center justify-center">
                            <svg className="w-12 h-12 md:w-16 md:h-16 text-amber-500 bounce-house" fill="currentColor" viewBox="0 0 24 24">
                                {/* House icon */}
                                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                            </svg>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-bold font-script text-teal-900">{invite.event?.housename}</h2>
                    </div>

                    {/* Dashed Line Separator */}
                    <div className="flex items-center justify-center py-4">
                        <svg className="w-2/3 h-2 text-amber-300 opacity-70" viewBox="0 0 100 2">
                            <line x1="0" y1="1" x2="100" y2="1" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4, 4" />
                        </svg>
                    </div>

                    <p className="font-medium">To, <br /> {invite?.attendee?.name} <br /> {invite?.attendee?.address}</p>

                    <div className="w-full flex flex-col justify-center items-center">
                        <div className="bg-white p-2 w-24 rounded-md shadow-md">
                            <QRCode value={invite?._id + ""} size={80} bgColor="#ffffff" />
                            <p className="text-xs mt-1 text-amber-600">Scan for RSVP</p>
                        </div>
                    </div>

                    {/* Event Details */}
                    <div className="space-y-4 text-sm md:text-base">
                        {[
                            {
                                icon: "M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z",
                                text: formatTextDate(invite?.event?.date)
                            },
                            {
                                icon: "M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z",
                                text: `${invite?.event?.time} ${invite?.event?.endtime ? "- " + invite?.event?.endtime : ""}`
                            },
                            {
                                icon: "M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z",
                                text: invite?.event?.location
                            },
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center justify-center space-x-2">
                                <svg className="w-6 h-6 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d={item.icon} clipRule="evenodd" />
                                </svg>
                                <span>{item.text}</span>
                            </div>
                        ))}
                    </div>

                    <p className="text-xl font-bold font-script text-amber-900 mt-6">Warmly,</p>
                    <p className="text-lg font-bold text-amber-700">{invite?.event?.regards ? invite?.event?.regards : `INVITU`}</p>
                </div>

                {/* Bottom Swirl Decoration */}
                <div className="relative z-10 flex justify-center">
                    <div className="absolute -bottom-12 w-48 h-12 md:w-64 md:h-16">
                        <svg className="w-full h-full text-amber-500 opacity-80 rotate-180" viewBox="0 0 100 20">
                            <path d="M5 10 C15 0, 35 0, 45 10 S65 20, 75 10 C85 0, 95 0, 105 10" fill="none" stroke="currentColor" strokeWidth="2" />
                            <path d="M47 8.5 C49 6.5, 51 6.5, 53 8.5 L50 12 L47 8.5 Z" fill="currentColor" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HousewarmingInvite;
