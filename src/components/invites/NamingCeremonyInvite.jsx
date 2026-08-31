"use client";
import React from "react";
import QRCode from "react-qr-code";

// ==============================
// EXAMPLE INVITE DATA STRUCTURE
// ==============================
// const invite = {
//     _id: "naming_ceremony_204",
//     attendee: { name: "Arjun & Divya" },
//     event: {
//         babyName: "Aanya Rose Menon",
//         milestone: "100 Days Old",
//         date: "2026-10-18T10:00:00Z",
//         time: "10:00 AM", endtime: "1:00 PM",
//         location: "Green Meadows Hall, Kochi",
//         regards: "The Menon Family"
//     }
// };

// A single glossy, bead-like charm used on the hanging nursery mobile.
// The layered inset shadows fake a soft 3D, plastic/porcelain sheen.
const Charm = ({ gradient, size = 24 }) => (
    <div
        style={{
            width: size,
            height: size,
            borderRadius: "9999px",
            background: gradient,
            boxShadow:
                "inset -3px -3px 6px rgba(0,0,0,0.18), inset 3px 3px 5px rgba(255,255,255,0.75), 0 3px 6px rgba(0,0,0,0.15)",
        }}
    />
);

// A single letter rendered as a real, rotating 3D cube using CSS 3D transforms.
// Only the three faces that can ever be visible (front, top, right) are drawn.
const NameCube = ({ letter, colors, delay }) => (
    <div className="cube-scene">
        <div
            className="cube"
            style={{
                animationDelay: `${delay}s`,
                "--face-top": colors.top,
                "--face-front": colors.front,
                "--face-side": colors.side,
            }}
        >
            <div className="cube-face face-front">{letter}</div>
            <div className="cube-face face-top" aria-hidden="true" />
            <div className="cube-face face-right" aria-hidden="true" />
        </div>
    </div>
);

const NamingCeremonyInvite = ({ invite }) => {
    // Helper function to format date elegantly
    function formatTextDate(dateString) {
        if (!dateString) return "Date TBD";
        const date = new Date(dateString);
        const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
        const day = date.getDate();
        const month = date.toLocaleDateString("en-US", { month: "long" });

        function getOrdinal(n) {
            const s = ["th", "st", "nd", "rd"];
            const v = n % 100;
            return n + (s[(v - 20) % 10] || s[v] || s[0]);
        }
        return `${weekday}, ${month} ${getOrdinal(day)}`;
    }

    const fullName = invite?.event?.babyName || "Our Little One";
    const firstName = fullName.split(" ")[0] || fullName;
    const letters = firstName.split("").filter((ch) => /[a-zA-Z]/.test(ch));
    const familyName = invite?.event?.regards || "The Family";

    // Three recurring block colorways, cycled per letter for gentle rhythm
    const blockPalette = [
        { top: "#ffe3ee", front: "#ec6ea0", side: "#c2185b" },
        { top: "#fbe7c8", front: "#d9a55a", side: "#b0813a" },
        { top: "#ffd7e6", front: "#e0568f", side: "#a91357" },
    ];

    return (
        <div className="naming-background min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&family=Playball&display=swap');

                :root {
                    --color-ink: #4a2e39;
                    --bg-gradient-start: #fff8fa;
                    --bg-gradient-end: #ffe1ec;
                }

                body { font-family: 'Quicksand', sans-serif; }
                .font-script { font-family: 'Playball', cursive; }

                ::-webkit-scrollbar-thumb {
                  background-color: #ec6ea0;
                  border-radius: 9999px;
                  border: 2px solid transparent;
                  background-clip: content-box;
                }

                .naming-background {
                  background: linear-gradient(135deg, var(--bg-gradient-start), var(--bg-gradient-end), var(--bg-gradient-start));
                  background-size: 400% 400%;
                  animation: gradient-shift 16s ease infinite;
                  color: var(--color-ink);
                }

                .naming-card {
                  background-color: rgba(255, 255, 255, 0.86);
                  box-shadow:
                    0 0 0 1px rgba(255, 255, 255, 0.6) inset,
                    0 24px 45px -18px rgba(194, 24, 91, 0.28),
                    0 0 25px 4px rgba(236, 110, 160, 0.12);
                  backdrop-filter: blur(12px);
                  border-radius: 2rem;
                }

                @keyframes gradient-shift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }

                @keyframes card-enter {
                    0% { opacity: 0; transform: scale(0.95) translateY(30px); }
                    100% { opacity: 1; transform: scale(1) translateY(0); }
                }
                .animate-card-enter { animation: card-enter 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards; }

                @keyframes floatDrift {
                    0% { transform: translateY(100vh) rotate(0deg) scale(0.8); opacity: 0; }
                    18% { opacity: 0.55; }
                    82% { opacity: 0.55; }
                    100% { transform: translateY(-10vh) rotate(180deg) scale(1); opacity: 0; }
                }
                .animate-float { animation: floatDrift linear infinite; }

                @keyframes twinkle-pulse {
                    0%, 100% { opacity: 0.4; transform: scale(0.9); }
                    50% { opacity: 1; transform: scale(1.2) rotate(45deg); }
                }
                .animate-twinkle { animation: twinkle-pulse 4s ease-in-out infinite; }

                /* Nursery mobile gently swinging from a thread */
                @keyframes mobile-sway {
                    0%, 100% { transform: rotate(-6deg); }
                    50% { transform: rotate(6deg); }
                }
                .mobile-sway { animation: mobile-sway 4.5s ease-in-out infinite; transform-origin: top center; }

                /* Shimmering script caption for the baby's full name */
                @keyframes shimmer {
                    0% { background-position: -200% center; }
                    100% { background-position: 200% center; }
                }
                .animate-shimmer-text {
                    background: linear-gradient(to right, #c2185b 20%, #ec6ea0 40%, #c2185b 60%);
                    background-size: 200% auto;
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                    animation: shimmer 3.2s linear infinite reverse;
                    display: inline-block;
                }

                /* Real, rotating 3D letter blocks */
                .cube-scene { perspective: 420px; }
                .cube {
                    position: relative;
                    width: 38px;
                    height: 38px;
                    transform-style: preserve-3d;
                    animation: cube-wobble 5.5s ease-in-out infinite;
                }
                .cube-face {
                    position: absolute;
                    width: 38px;
                    height: 38px;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: 'Quicksand', sans-serif;
                    font-weight: 700;
                    font-size: 1.05rem;
                    color: #fff8fa;
                    box-shadow: inset 0 0 6px rgba(255,255,255,0.35);
                }
                .face-front { background: var(--face-front); transform: translateZ(19px); }
                .face-top   { background: var(--face-top);   transform: rotateX(90deg) translateZ(19px); }
                .face-right { background: var(--face-side);  transform: rotateY(90deg) translateZ(19px); }

                @keyframes cube-wobble {
                    0%, 100% { transform: rotateY(-14deg) rotateX(8deg); }
                    50%      { transform: rotateY(14deg) rotateX(-6deg); }
                }

                .hover-pulse:hover { transform: scale(1.02); transition: transform 0.3s ease; }

                @media (prefers-reduced-motion: reduce) {
                    .animate-float, .animate-twinkle, .cube, .mobile-sway,
                    .animate-card-enter, .naming-background, .animate-shimmer-text {
                        animation: none !important;
                    }
                }
                `}
            </style>

            {/* ============================== */}
            {/* BACKGROUND FLOATING NURSERY MOTIFS */}
            {/* ============================== */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                {[...Array(10)].map((_, i) => {
                    const colors = ["text-rose-200", "text-pink-200", "text-rose-300", "text-fuchsia-200"];
                    const shapeType = i % 3;
                    const style = {
                        animationDuration: `${16 + Math.random() * 10}s`,
                        animationDelay: `${Math.random() * 5}s`,
                        left: `${Math.random() * 100}%`,
                        fontSize: `${Math.random() * 1.6 + 1}rem`,
                    };

                    return (
                        <div key={`float-${i}`} className={`absolute -bottom-20 ${colors[i % 4]} animate-float opacity-60`} style={style}>
                            {shapeType === 0 && ( // soft cloud
                                <svg width="1.6em" height="1em" viewBox="0 0 100 60" fill="currentColor">
                                    <ellipse cx="30" cy="35" rx="25" ry="20" />
                                    <ellipse cx="55" cy="25" rx="20" ry="18" />
                                    <ellipse cx="75" cy="35" rx="18" ry="16" />
                                    <rect x="15" y="35" width="70" height="20" rx="10" />
                                </svg>
                            )}
                            {shapeType === 1 && ( // twinkling star
                                <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 20 20" className="animate-twinkle">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            )}
                            {shapeType === 2 && ( // tiny baby footprint
                                <svg width="0.9em" height="1.3em" viewBox="0 0 40 60" fill="currentColor">
                                    <ellipse cx="20" cy="40" rx="14" ry="19" />
                                    <circle cx="9" cy="9" r="5" />
                                    <circle cx="20" cy="4" r="5.5" />
                                    <circle cx="31" cy="9" r="5" />
                                    <circle cx="38" cy="18" r="4" />
                                </svg>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* ============================== */}
            {/* MAIN INVITE CARD */}
            {/* ============================== */}
            <div className="relative max-w-lg w-full naming-card p-6 md:p-10 pt-16 md:pt-20 text-center z-10 animate-card-enter">

                {/* Hanging nursery mobile in place of a banner */}
                <div className="absolute -top-8 md:-top-10 inset-x-0 flex justify-center z-20 pointer-events-none">
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-0.5 bg-rose-300/60 rounded-full" />
                        <div className="flex items-start gap-5 mobile-sway">
                            <div className="flex flex-col items-center">
                                <div className="w-px h-5 bg-rose-300/50" />
                                <Charm gradient="radial-gradient(circle at 30% 30%, #fff5f8, #ec6ea0 70%, #c2185b)" />
                            </div>
                            <div className="flex flex-col items-center mt-3">
                                <div className="w-px h-8 bg-rose-300/50" />
                                <Charm gradient="radial-gradient(circle at 30% 30%, #fff7e8, #e6bd7c 70%, #b0813a)" size={20} />
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="w-px h-4 bg-rose-300/50" />
                                <Charm gradient="radial-gradient(circle at 30% 30%, #ffe6f0, #e0568f 70%, #a91357)" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Container */}
                <div className="relative z-10 space-y-6">
                    <p className="text-rose-500/80 text-sm md:text-base">A little one has arrived, and we couldn't be happier</p>

                    {/* HERO: the baby's first name as rotating 3D blocks */}
                    <div className="flex flex-wrap justify-center gap-2 md:gap-3 py-2">
                        {letters.map((letter, idx) => (
                            <NameCube
                                key={`${letter}-${idx}`}
                                letter={letter.toUpperCase()}
                                colors={blockPalette[idx % blockPalette.length]}
                                delay={idx * 0.15}
                            />
                        ))}
                    </div>

                    <div>
                        <p className="text-gray-500 text-sm md:text-base mb-1">We joyfully invite you to the Naming Ceremony of</p>
                        <h1 className="text-4xl md:text-5xl font-script py-1 animate-shimmer-text">{fullName}</h1>
                    </div>

                    {invite?.event?.milestone && (
                        <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-rose-400 to-pink-400 text-white text-sm font-semibold px-4 py-1.5 rounded-full shadow-md">
                            {invite.event.milestone}
                        </div>
                    )}

                    {/* Decorative divider */}
                    <div className="flex items-center justify-center opacity-50 my-2">
                        <div className="h-px bg-rose-300 w-1/4" />
                        <svg className="w-5 h-5 text-rose-400 mx-2 animate-twinkle" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <div className="h-px bg-rose-300 w-1/4" />
                    </div>

                    {/* Event Details */}
                    <div className="space-y-5 text-base md:text-lg text-gray-700 px-2 md:px-4">
                        {[
                            {
                                colorClass: "text-rose-500 bg-rose-50",
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                ),
                                text: formatTextDate(invite?.event?.date),
                            },
                            {
                                colorClass: "text-pink-500 bg-pink-50",
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ),
                                text: (
                                    <span className="font-semibold">
                                        {`${invite?.event?.time || ""} ${invite?.event?.endtime ? "- " + invite?.event?.endtime : ""}`}
                                    </span>
                                ),
                            },
                            {
                                colorClass: "text-fuchsia-500 bg-fuchsia-50",
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                ),
                                text: invite?.event?.location,
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
                    <div className="mt-8 bg-gradient-to-br from-rose-50 to-pink-50 p-6 rounded-2xl border border-rose-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] relative overflow-hidden hover-pulse">
                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 10px 10px, #ec6ea0 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

                        <p className="font-bold text-lg text-rose-900 relative z-10">Dear {invite?.attendee?.name || "Guest"},</p>
                        <p className="text-rose-700 mb-4 relative z-10">Please scan to RSVP. We'd love to have you with us!</p>

                        <div className="w-full flex justify-center relative z-10 py-2">
                            <div className="bg-white p-3 rounded-xl shadow-[0_4px_15px_-3px_rgba(236,110,160,0.35)] border-2 border-rose-200 group transition-all duration-300 hover:shadow-[0_8px_25px_-5px_rgba(236,110,160,0.5)] hover:border-pink-300">
                                <QRCode value={invite?._id || "error"} size={90} bgColor="#ffffff" fgColor="#c2185b" className="group-hover:opacity-90 transition-opacity" />
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 pb-2">
                        <p className="text-xl font-bold font-script text-rose-800">With all our love,</p>
                        <p className="text-lg font-semibold text-pink-600">{familyName}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NamingCeremonyInvite;