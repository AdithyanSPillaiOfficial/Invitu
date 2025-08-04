"use client";
import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { toast } from "react-toastify";

const WeddingInvite = ({invite}) => {

    // const [invite, setInvite] = useState({})

    // async function fetchInvite() {
    //     const result = await fetch("/api/getinvitedetails", {
    //         method : 'POST',
    //         headers : {
    //             'Content-Type' : 'application/json'
    //         },
    //         body : JSON.stringify({inviteid : inviteid })
    //     });
    //     if(result.ok) {
    //         const res = await result.json();
    //         if(res.success) {
    //             setInvite(res.invite);
    //         }
    //         else {
    //             toast.error(res.error);
    //         }
    //     }
    // }

    // useEffect(() => {
    //   fetchInvite();
    // }, [])

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
    
    return (
        <div className="romantic-background min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            <style>
                {`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Dancing+Script:wght@400;700&display=swap');
        body {
          font-family: 'Playfair Display', serif;
        }
        .font-script {
          font-family: 'Dancing Script', cursive;
        }
        .romantic-background {
          background-color: #f0fdf4;
          background-image: radial-gradient(#e2e8f0 1px, transparent 1px), radial-gradient(#e2e8f0 1px, #f0fdf4 1px);
          background-size: 20px 20px;
          background-position: 0 0, 10px 10px;
        }
        .card-style {
          background-color: #ffffff;
          border: 2px solid #a8c4c7;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
                      0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        @keyframes pulse-heart {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        .pulse-heart {
          animation: pulse-heart 2s infinite;
        }
        `}
            </style>

            <div className="relative max-w-2xl w-full card-style rounded-3xl p-8 md:p-12 text-center text-teal-800 z-10">
                {/* Decorative Heart Backgrounds */}
                <div className="absolute inset-0 z-0 overflow-hidden rounded-3xl">
                    {[
                        { top: "top-10", left: "left-10", size: "w-12 h-12", color: "text-rose-300", rotate: "-rotate-12", opacity: "opacity-60" },
                        { bottom: "bottom-20", right: "right-10", size: "w-16 h-16", color: "text-teal-300", rotate: "rotate-45", opacity: "opacity-40" },
                        { top: "top-1/2", left: "left-1/4", size: "w-8 h-8", color: "text-rose-200", opacity: "opacity-50" },
                        { bottom: "bottom-10", left: "left-1/3", size: "w-10 h-10", color: "text-teal-200", rotate: "-rotate-30", opacity: "opacity-30" },
                        { top: "top-20", right: "right-20", size: "w-14 h-14", color: "text-rose-300", rotate: "rotate-20", opacity: "opacity-70" },
                    ].map((item, idx) => (
                        <svg
                            key={idx}
                            className={`absolute ${item.top || ""} ${item.bottom || ""} ${item.left || ""} ${item.right || ""} ${item.size} ${item.color} ${item.opacity} ${item.rotate || ""}`}
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5A5.4 5.4 0 017.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3A5.4 5.4 0 0122 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                    ))}
                </div>

                {/* Top Swirl Decoration */}
                <div className="relative z-10 flex justify-center">
                    <div className="absolute -top-6 w-48 h-12 md:w-64 md:h-16">
                        <svg className="w-full h-full text-teal-500 opacity-80" viewBox="0 0 100 20">
                            <path d="M5 10 C15 0, 35 0, 45 10 S65 20, 75 10 C85 0, 95 0, 105 10" fill="none" stroke="currentColor" strokeWidth="2" />
                            <path d="M47 8.5 C49 6.5, 51 6.5, 53 8.5 L50 12 L47 8.5 Z" fill="currentColor" />
                        </svg>
                    </div>
                </div>

                {/* Content */}
                <div className="relative z-10 space-y-6 md:space-y-8 mt-6">
                    <h1 className="text-4xl md:text-6xl font-script text-teal-600">You're Invited!</h1>
                    <p className="text-lg md:text-xl font-medium">Please join us as we celebrate our love and begin our new journey together.</p>

                    {/* Couple Names */}
                    <div className="space-y-2">
                        <h2 className="text-5xl md:text-7xl font-bold font-script text-teal-900">{invite.event?.groomname}</h2>
                        <div className="flex items-center justify-center">
                            <svg className="w-12 h-12 md:w-16 md:h-16 text-teal-500 pulse-heart" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5A5.4 5.4 0 017.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3A5.4 5.4 0 0122 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-bold font-script text-teal-900">{invite.event?.bridename}</h2>
                    </div>

                    {/* Dashed Line Separator */}
                    <div className="flex items-center justify-center py-4">
                        <svg className="w-2/3 h-2 text-teal-300 opacity-70" viewBox="0 0 100 2">
                            <line x1="0" y1="1" x2="100" y2="1" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4, 4" />
                        </svg>
                    </div>

                    <p className="font-medium">To, <br /> {invite?.attendee?.name} <br /> {invite?.attendee?.address}</p>

                    <div className="w-full flex flex-col justify-center items-center">
                        <div className="bg-white p-2 w-24 rounded-md shadow-md">
                            <QRCode value={invite?._id+""} size={80} bgColor="#ffffff" />
                            <p className="text-xs mt-1 text-teal-600">Scan for RSVP</p>
                        </div>
                    </div>


                    {/* Wedding Details */}
                    <div className="space-y-4 text-sm md:text-base">
                        {[
                            {
                                icon: "M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z",
                                text: formatTextDate(invite?.event?.date)
                            },
                            {
                                icon: "M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z",
                                text: `${invite?.event?.time} ${invite?.event?.endtime ? "- "+invite?.event?.endtime : ""}`
                            },
                            {
                                icon: "M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z",
                                text: invite?.event?.location
                            },
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center justify-center space-x-2">
                                <svg className="w-6 h-6 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d={item.icon} clipRule="evenodd" />
                                </svg>
                                <span>{item.text}</span>
                            </div>
                        ))}
                    </div>

                    <p className="text-xl font-bold font-script text-teal-900 mt-6">With Love,</p>
                    <p className="text-lg font-bold text-teal-700">{invite?.event?.regards ? invite?.event?.regards : `${invite?.event?.groomname} & ${invite?.event?.bridename}`}</p>
                </div>

                {/* Bottom Swirl Decoration */}
                <div className="relative z-10 flex justify-center">
                    <div className="absolute -bottom-12 w-48 h-12 md:w-64 md:h-16">
                        <svg className="w-full h-full text-teal-500 opacity-80 rotate-180" viewBox="0 0 100 20">
                            <path d="M5 10 C15 0, 35 0, 45 10 S65 20, 75 10 C85 0, 95 0, 105 10" fill="none" stroke="currentColor" strokeWidth="2" />
                            <path d="M47 8.5 C49 6.5, 51 6.5, 53 8.5 L50 12 L47 8.5 Z" fill="currentColor" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeddingInvite;
