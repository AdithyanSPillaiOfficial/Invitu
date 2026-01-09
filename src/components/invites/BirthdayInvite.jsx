"use client";
import React from "react";
import QRCode from "react-qr-code";

const BirthdayInvite = ({ invite }) => {
    // ==============================
    // EXAMPLE INVITE DATA STRUCTURE
    // ==============================
    // const invite = {
    //     _id: "bday_bash_789",
    //     attendee: { name: "Alex & Sam" },
    //     event: {
    //         birthdayPerson: "Mia Williams",
    //         age: 10,
    //         theme: "Superheroes & Villains",
    //         date: "2025-10-20T14:00:00Z",
    //         time: "2:00 PM", endtime: "5:00 PM",
    //         location: "Kids Zone Arcade, 456 Fun Blvd, Cityville",
    //         regards: "Mia's Parents"
    //     }
    // };

    // Helper function to format date elegantly
    function formatTextDate(dateString) {
        if (!dateString) return "Date TBD";
        const date = new Date(dateString);
        const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
        const day = date.getDate();
        const month = date.toLocaleDateString('en-US', { month: 'long' });
        
        function getOrdinal(n) {
            const s = ["th", "st", "nd", "rd"];
            const v = n % 100;
            return n + (s[(v - 20) % 10] || s[v] || s[0]);
        }
        return `${weekday}, ${month} ${getOrdinal(day)}`;
    }

    const defaultHost = invite?.event?.birthdayperson || invite?.event?.regards || "Celebrant";

    return (
        <div className="party-background min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&family=Dancing+Script:wght@600;700&display=swap');
                
                :root {
                    --color-primary: #d946ef; /* Fuchsia 600 */
                    --color-secondary: #8b5cf6; /* Violet 600 */
                    --color-accent: #f59e0b; /* Amber 500 */
                    --bg-gradient-start: #fff1f2; /* Rose 50 */
                    --bg-gradient-end: #ede9fe; /* Violet 100 */
                }

                body { font-family: 'Poppins', sans-serif; }
                .font-script { font-family: 'Dancing Script', cursive; }

                /* Thumb (Handle) - Light Mode Default */
                ::-webkit-scrollbar-thumb {
                  background-color: #d946ef; /* Light gray for light mode */
                  border-radius: 9999px;
                  border: 2px solid transparent; /* Creates padding around the thumb */
                  background-clip: content-box;
                  transition: background-color 0.2s;
                }


                /* Dynamic animated background */
                .party-background {
                  background: linear-gradient(135deg, var(--bg-gradient-start), var(--bg-gradient-end), var(--bg-gradient-start));
                  background-size: 400% 400%;
                  animation: gradient-shift 15s ease infinite;
                }

                /* Elegant Glassmorphism Card */
                .party-card {
                  background-color: rgba(255, 255, 255, 0.85);
                  /* Thin glowing border */
                  box-shadow: 
                    0 0 0 1px rgba(255, 255, 255, 0.5) inset,
                    0 20px 40px -15px rgba(139, 92, 246, 0.3),
                    0 0 20px 5px rgba(217, 70, 239, 0.1); /* subtle outer glow */
                  backdrop-filter: blur(12px);
                  border-radius: 2rem;
                }

                /* --- ANIMATIONS --- */
                
                /* Background subtle shift */
                @keyframes gradient-shift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }

                /* Card entrance pop */
                @keyframes card-enter {
                    0% { opacity: 0; transform: scale(0.95) translateY(30px); }
                    100% { opacity: 1; transform: scale(1) translateY(0); }
                }
                .animate-card-enter { animation: card-enter 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards; }

                /* Floating confetti items */
                @keyframes floatUpSlow {
                    0% { transform: translateY(100vh) rotate(0deg) scale(0.8); opacity: 0; }
                    20% { opacity: 0.6; }
                    80% { opacity: 0.6; }
                    100% { transform: translateY(-10vh) rotate(360deg) scale(1); opacity: 0; }
                }
                .animate-float { animation: floatUpSlow linear infinite; }
                
                /* Twinkling effect */
                @keyframes twinkle-pulse {
                    0%, 100% { opacity: 0.4; transform: scale(0.9); filter: brightness(1); }
                    50% { opacity: 1; transform: scale(1.2) rotate(45deg); filter: brightness(1.2); }
                }
                .animate-twinkle { animation: twinkle-pulse 4s ease-in-out infinite; }

                /* Gentle bounce for central icon */
                @keyframes soft-bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .animate-soft-bounce { animation: soft-bounce 3s ease-in-out infinite; }

                /* Shimmering text effect for the name */
                @keyframes shimmer {
                    0% { background-position: -200% center; }
                    100% { background-position: 200% center; }
                }
                .animate-shimmer-text {
                    background: linear-gradient(to right, var(--color-secondary) 20%, var(--color-primary) 40%, var(--color-secondary) 60%);
                    background-size: 200% auto;
                    -webkit-background-clip: text;
                    text-fill-color: transparent;
                    -webkit-text-fill-color: transparent;
                    animation: shimmer 3s linear infinite reverse;
                    display: inline-block;
                }
                
                .hover-pulse:hover { transform: scale(1.02); transition: transform 0.3s ease;}
                `}
            </style>

            {/* ============================== */}
            {/* BACKGROUND ANIMATED CONFETTI */}
            {/* ============================== */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                {/* Mix of shapes for more organic feel */}
                {[...Array(12)].map((_, i) => {
                    const colors = ["text-fuchsia-300", "text-violet-300", "text-amber-200", "text-pink-300"];
                    // Alternating shapes: balloons, circles, squiggles
                    const shapeType = i % 3; 
                    const style = {
                        animationDuration: `${15 + Math.random() * 10}s`,
                        animationDelay: `${Math.random() * 5}s`,
                        left: `${Math.random() * 100}%`,
                        fontSize: `${Math.random() * 2 + 1}rem`
                    };

                    return (
                        <div key={`confetti-${i}`} className={`absolute -bottom-20 ${colors[i % 4]} animate-float opacity-60`} style={style}>
                           {shapeType === 0 && ( // Balloon
                                <svg width="1em" height="1.2em" fill="currentColor" viewBox="0 0 100 120">
                                    <path d="M50,0 C22.4,0 0,22.4 0,50 C0,77.6 22.4,100 50,100 C77.6,100 100,77.6 100,50 C100,22.4 77.6,0 50,0 Z M50,100 L50,120" stroke="currentColor" strokeWidth="4" />
                                </svg>
                           )}
                           {shapeType === 1 && ( // Circle
                                <svg width="0.8em" height="0.8em" fill="currentColor" viewBox="0 0 100 100">
                                     <circle cx="50" cy="50" r="50" />
                                </svg>
                           )}
                           {shapeType === 2 && ( // Squiggle star
                                 <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 20 20" className="animate-twinkle">
                                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                 </svg>
                           )}
                        </div>
                    );
                })}
            </div>

            {/* ============================== */}
            {/* MAIN INVITE CARD */}
            {/* ============================== */}
            <div className="relative max-w-lg w-full party-card p-6 md:p-10 text-center text-gray-800 z-10 animate-card-enter">

                {/* Top Decoration (Banner) - Improved Visibility */}
                <div className="relative z-20 flex justify-center -mt-12 md:-mt-16 mb-2">
                    {/* Decorative Banner SVG background */}
                    <svg className="w-64 h-20 text-purple-100 drop-shadow-lg" viewBox="0 0 200 60" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="bannerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#e9d5ff" />
                                <stop offset="50%" stopColor="#fbcfe8" />
                                <stop offset="100%" stopColor="#e9d5ff" />
                            </linearGradient>
                        </defs>
                        <path d="M0,15 Q100,0 200,15 L200,45 Q100,60 0,45 Z" fill="url(#bannerGrad)" />
                    </svg>
                    
                    {/* High contrast text with glow */}
                    <div className="absolute top-3 inset-x-0 flex flex-col items-center">
                        <span className="font-script text-2xl md:text-3xl text-purple-900 drop-shadow-[0_2px_2px_rgba(255,255,255,0.8)] tracking-wider">
                            Let's Party!
                        </span>
                         {/* Subtle underline decoration */}
                         <svg className="w-24 h-2 text-purple-400 opacity-70" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0,5 Q50,10 100,5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>
                    </div>
                </div>

                {/* Content Container */}
                <div className="relative z-10 space-y-6 mt-4">
                    <div>
                        <h3 className="text-lg md:text-xl font-medium text-purple-600 uppercase tracking-widest mb-1">You're Invited to a</h3>
                        {invite?.event?.theme && (
                             <h2 className="text-2xl md:text-3xl font-bold text-fuchsia-600 font-script">
                                {invite?.event?.theme} Birthday
                             </h2>
                        )}
                        {!invite?.event?.theme && (
                             <h2 className="text-2xl md:text-3xl font-bold text-fuchsia-600 font-script">Birthday Celebration</h2>
                        )}
                    </div>


                    {/* Honoree Section with Shimmer Effect */}
                    <div className="py-2 relative">
                        {/* Central Animated Icon */}
                        <div className="flex justify-center mb-2">
                            <div className="p-3 bg-gradient-to-tr from-purple-100 to-pink-100 rounded-full shadow-md animate-soft-bounce">
                                <svg className="w-12 h-12 text-fuchsia-500" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M21 16.5C21 15.7 20.3 15 19.5 15C18.7 15 18 15.7 18 16.5C18 17.3 18.7 18 19.5 18C20.3 18 21 17.3 21 16.5ZM3 16.5C3 15.7 3.7 15 4.5 15C5.3 15 6 15.7 6 16.5C6 17.3 5.3 18 4.5 18C3.7 18 3 17.3 3 16.5ZM18 11V9.3C18 8 16.9 6.9 15.5 7H13V4C13 3.4 12.6 3 12 3C11.4 3 11 3.4 11 4V7H8.5C7.1 6.9 6 8 6 9.3V11C3.2 11.5 1 13.6 1 16.5C1 17.9 1.6 19.1 2.5 20H2.4C2.2 20.3 2 20.6 2 21C2 21.6 2.5 22 3 22H21C21.6 22 22 21.6 22 21C22 20.6 21.8 20.3 21.6 20H21.5C22.4 19.1 23 17.9 23 16.5C23 13.6 20.8 11.5 18 11Z" />
                                </svg>
                            </div>
                        </div>

                        <p className="text-gray-500 text-sm md:text-base">Celebrating the fabulous</p>
                        
                        {/* Shimmering Name */}
                        <h1 className="text-5xl md:text-6xl font-script font-bold py-2 animate-shimmer-text">
                            {defaultHost}
                        </h1>
                        
                        {invite?.event?.age && (
                             <div className="absolute top-4 right-4 md:right-10 rotate-12">
                                <div className="bg-gradient-to-r from-amber-400 to-orange-400 text-white text-xl font-bold px-4 py-2 rounded-full shadow-lg border-2 border-white">
                                    Big {invite.event.age}!
                                </div>
                             </div>
                        )}
                    </div>

                     {/* Decorative divider */}
                    <div className="flex items-center justify-center opacity-50 my-4">
                        <div className="h-px bg-purple-300 w-1/4"></div>
                        <svg className="w-6 h-6 text-purple-400 mx-2 animate-twinkle" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                        <div className="h-px bg-purple-300 w-1/4"></div>
                    </div>

                    {/* Elegant Event Details */}
                    <div className="space-y-5 text-base md:text-lg text-gray-700 px-4">
                        {[
                            {
                                colorClass: "text-fuchsia-500 bg-fuchsia-50",
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                ),
                                text: formatTextDate(invite?.event?.date)
                            },
                            {
                                colorClass: "text-violet-500 bg-violet-50",
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ),
                                text: <span className="font-semibold">{`${invite?.event?.time} ${invite?.event?.endtime ? "- " + invite?.event?.endtime : ""}`}</span>
                            },
                            {
                                colorClass: "text-amber-500 bg-amber-50",
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                ),
                                text: invite?.event?.location
                            },
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center text-left space-x-4">
                                <div className={`p-3 rounded-xl shadow-sm ${item.colorClass} transition-transform hover:scale-110`}>
                                    {item.icon}
                                </div>
                                <div className="flex-1 leading-tight">{item.text}</div>
                            </div>
                        ))}
                    </div>

                    {/* Guest Info & QR Section */}
                    <div className="mt-8 bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] relative overflow-hidden hover-pulse">
                         {/* Background pattern for QR section */}
                         <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle at 10px 10px, #8b5cf6 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
                        
                        <p className="font-bold text-lg text-purple-900 relative z-10">Dear {invite?.attendee?.name},</p>
                        <p className="text-purple-700 mb-4 relative z-10">Please scan to RSVP. We can't wait!</p>
                        
                        <div className="w-full flex justify-center relative z-10 py-2">
                             {/* QR Code with subtle glow container */}
                            <div className="bg-white p-3 rounded-xl shadow-[0_4px_15px_-3px_rgba(139,92,246,0.3)] border-2 border-purple-200 group transition-all duration-300 hover:shadow-[0_8px_25px_-5px_rgba(139,92,246,0.5)] hover:border-fuchsia-300">
                                <QRCode value={invite?._id || "error"} size={90} bgColor="#ffffff" fgColor="#6d28d9" className="group-hover:opacity-90 transition-opacity"/>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 pb-2">
                        <p className="text-xl font-bold font-script text-purple-800">Love,</p>
                        <p className="text-lg font-semibold text-fuchsia-600">{invite?.event?.regards || "The Hosts"}</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default BirthdayInvite;