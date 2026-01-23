"use client";
import React, { useEffect, useState } from 'react'
import { Scanner } from '@yudiel/react-qr-scanner'; // UPDATED IMPORT
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

function CheckinWindow({ eventId }) {

    const [activeMode, setActiveMode] = useState('qr');
    const [searchQuery, setSearchQuery] = useState('');
    const [recentCheckIn, setRecentCheckIn] = useState(null);

    const [guests, setGuests] = useState([]);

    async function fetchAttendees() {
        const result = await fetch('/api/getattendees', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sessionid: Cookies.get('sessionid'),
                eventid: eventId
            })
        })

        if (result.ok) {
            const res = await result.json();
            if (res.success) {
                res.attendees.forEach((obj, index) => {
                    obj.id = index + 1;
                });
                setGuests(res.attendees);
            }
            else {
                toast.error(res.error);
            }
        }
        else {
            toast.error('Something Went Wrong');
        }
    }
    useEffect(() => {
        fetchAttendees();
    }, [])


    const stats = {
        total: guests?.length,
        checkedIn: guests?.filter(g => g.status === 'Checked In').length,
        pending: guests?.filter(g => g.status === 'Pending').length
    };

    const handleCheckIn = (guestId) => {
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const updatedGuests = guests.map(g => {
            if (g.id === guestId) {
                const updated = { ...g, status: "Checked In", time: timestamp };
                setRecentCheckIn(updated);
                return updated;
            }
            return g;
        });
        setGuests(updatedGuests);

        setTimeout(() => {
            setRecentCheckIn(null);
            setSearchQuery('');
        }, 3000);
    };

    // --- NEW SCAN LOGIC ---
    const handleScan = (detectedCodes) => {
        if (detectedCodes && detectedCodes.length > 0) {
            const rawValue = detectedCodes[0].rawValue;
            console.log("Scanned:", rawValue);

            // LOGIC: For demo purposes, any QR code will randomly check in a pending guest.
            // In a real app, you would use `rawValue` to find the specific guest.
            const pendingGuest = guests.find(g => g.status === "Pending");
            if (pendingGuest && !recentCheckIn) {
                handleCheckIn(pendingGuest.id);
            }
        }
    };

    // --- Inline Icons ---
    const Icons = {
        QrCode: ({ size = 20, className }) => (
            <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="5" height="5" x="3" y="3" rx="1" /><rect width="5" height="5" x="16" y="3" rx="1" /><rect width="5" height="5" x="3" y="16" rx="1" /><path d="M21 16h-3a2 2 0 0 0-2 2v3" /><path d="M21 21v.01" /><path d="M12 7v3a2 2 0 0 1-2 2H7" /><path d="M3 12h.01" /><path d="M12 3h.01" /><path d="M12 16v.01" /><path d="M16 12h1" /><path d="M21 12v.01" /><path d="M12 21v-1" /></svg>
        ),
        Search: ({ size = 20, className }) => (
            <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
        ),
        User: ({ size = 20, className }) => (
            <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
        ),
        CheckCircle: ({ size = 20, className }) => (
            <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" /></svg>
        ),
        Grid: ({ size = 20, className }) => (
            <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" /><rect width="7" height="7" x="14" y="14" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" /></svg>
        ),
        Refresh: ({ size = 20, className }) => (
            <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" /><path d="M16 21h5v-5" /></svg>
        ),
        Camera: ({ size = 20, className }) => (
            <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" /></svg>
        )
    };

    return (
        <div className="bg-white w-[calc(100%-50px)] m-5 md:rounded-3xl shadow-none md:shadow-2xl overflow-hidden flex flex-col md:flex-row h-full  border-0 md:border border-slate-200">

            {/* === LEFT SIDE (Action) === */}
            <div className="w-full md:w-5/12 lg:w-4/12 bg-teal-700 p-4 md:p-6 flex flex-col flex-shrink-0 relative overflow-hidden text-white transition-all duration-300">

                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-teal-600 opacity-50 blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-teal-800 opacity-50 blur-3xl pointer-events-none"></div>

                {/* Header */}
                <div className="relative z-10 mb-4 flex justify-between items-center md:block flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                            <Icons.Grid size={20} className="text-teal-100" />
                        </div>
                        <div>
                            <h1 className="text-lg md:text-xl font-bold tracking-wide">EventDesk</h1>
                            <p className="text-teal-200 text-xs md:text-sm md:block hidden">Session: Morning Keynote</p>
                        </div>
                    </div>
                    <div className="md:hidden text-right">
                        <span className="text-2xl font-bold">{stats.checkedIn}</span>
                        <span className="text-teal-300 text-xs mx-1">/</span>
                        <span className="text-teal-300 text-xs">{stats.total}</span>
                    </div>
                </div>

                {/* Desktop Stats */}
                <div className="hidden md:grid grid-cols-3 gap-4 mb-6 relative z-10 flex-shrink-0">
                    <div className="bg-teal-800/50 p-4 rounded-2xl border border-teal-600/30 backdrop-blur-md">
                        <p className="text-teal-300 text-xs font-medium uppercase tracking-wider mb-1">Total</p>
                        <p className="text-3xl font-bold text-white">{stats.total}</p>
                    </div>
                    <div className="bg-teal-800/50 p-4 rounded-2xl border border-teal-600/30 backdrop-blur-md">
                        <p className="text-teal-300 text-xs font-medium uppercase tracking-wider mb-1">Checked In</p>
                        <p className="text-3xl font-bold text-white">{stats.checkedIn}</p>
                    </div>
                    <div className="bg-teal-800/50 p-4 rounded-2xl border border-teal-600/30 backdrop-blur-md">
                        <p className="text-teal-300 text-xs font-medium uppercase tracking-wider mb-1">Pending</p>
                        <p className="text-3xl font-bold text-white">{stats.pending}</p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-teal-900/40 p-1 rounded-xl flex mb-4 relative z-10 flex-shrink-0">
                    <button
                        onClick={() => setActiveMode('qr')}
                        className={`flex-1 py-2 px-4 rounded-lg text-xs md:text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2
                ${activeMode === 'qr' ? 'bg-white text-teal-700 shadow-md' : 'text-teal-200 hover:bg-teal-800/50'}`}
                    >
                        <Icons.Camera size={16} /> Scan QR
                    </button>
                    <button
                        onClick={() => setActiveMode('search')}
                        className={`flex-1 py-2 px-4 rounded-lg text-xs md:text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2
                ${activeMode === 'search' ? 'bg-white text-teal-700 shadow-md' : 'text-teal-200 hover:bg-teal-800/50'}`}
                    >
                        <Icons.Search size={16} /> Manual
                    </button>
                </div>

                {/* === Main Action Area === */}
                <div className="flex-1 bg-black/20 rounded-2xl border border-teal-500/20 relative z-10 overflow-hidden flex flex-col">

                    {/* Success Overlay */}
                    {recentCheckIn && (
                        <div className="absolute inset-0 z-50 bg-teal-600 flex flex-col items-center justify-center text-center p-6 animate-in fade-in zoom-in duration-300">
                            <div className="bg-white p-3 md:p-4 rounded-full mb-2 md:mb-4 shadow-lg animate-bounce">
                                <Icons.CheckCircle size={32} className="text-teal-600" />
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold text-white mb-1">Checked In!</h2>
                            <p className="text-teal-100 text-base md:text-lg font-medium">{recentCheckIn.name}</p>
                        </div>
                    )}

                    {/* QR View */}
                    {activeMode === 'qr' && (
                        // UPDATE: Added 'min-h-[300px]' to force visibility on mobile
                        <div className="relative w-full h-full min-h-[300px] flex items-center justify-center bg-black overflow-hidden rounded-2xl">
                            <div className="absolute inset-0 w-full h-full">
                                <Scanner
                                    onScan={handleScan}
                                    components={{
                                        audio: false,
                                        tracker: false
                                    }}
                                    // UPDATE: Ensure video object covers the whole area
                                    styles={{
                                        container: { width: '100%', height: '100%' },
                                        video: { width: '100%', height: '100%', objectFit: 'cover' }
                                    }}
                                />
                            </div>

                            {/* Custom Overlay (Grid Lines) */}
                            <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10">
                                <div className="w-48 h-48 md:w-64 md:h-64 border-2 border-teal-400/70 rounded-2xl relative shadow-[0_0_100px_rgba(0,0,0,0.5)]">
                                    <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-teal-400 rounded-tl-xl"></div>
                                    <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-teal-400 rounded-tr-xl"></div>
                                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-teal-400 rounded-bl-xl"></div>
                                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-teal-400 rounded-br-xl"></div>
                                    <div className="w-full h-0.5 bg-red-500/80 shadow-[0_0_15px_rgba(239,68,68,1)] absolute top-0 animate-[scan_2s_ease-in-out_infinite]"></div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Manual Search View */}
                    {activeMode === 'search' && (
                        <div className="p-4 md:p-6 flex flex-col h-full bg-teal-800/30">
                            <div className="relative mb-2 md:mb-6">
                                <Icons.Search className="absolute left-3 top-3.5 text-teal-200" size={18} />
                                <input
                                    type="text"
                                    placeholder="Type guest name..."
                                    className="w-full bg-teal-900/50 border border-teal-500/30 text-white placeholder-teal-300/50 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent text-sm md:text-base"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    autoFocus
                                />
                            </div>
                            <div className="flex-1 flex flex-col items-center justify-center text-teal-200/50">
                                <Icons.User size={48} className="mb-2 opacity-50" />
                                <p className="text-sm">Search results will appear in the list</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* === RIGHT SIDE (List) === */}
            <div className="flex-1 bg-white flex flex-col overflow-hidden relative rounded-t-3xl md:rounded-none -mt-4 md:mt-0 z-20 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] md:shadow-none">
                {/* Header */}
                <div className="p-4 md:p-8 border-b border-slate-100 flex justify-between items-end flex-shrink-0 bg-white">
                    <div>
                        <h2 className="text-lg md:text-2xl font-bold text-slate-800">Guest List</h2>
                        <p className="text-slate-500 text-xs md:text-sm mt-0.5">Real-time attendance tracking</p>
                    </div>
                    <button className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-full transition-colors" onClick={() => fetchAttendees()}>
                        <Icons.Refresh size={20} />
                    </button>
                </div>

                {/* List Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-2 md:p-4 space-y-1 pb-20 md:pb-4">
                    {guests
                        ?.filter(g => g.name.toLowerCase().includes(searchQuery.toLowerCase()))
                            .map((guest) => (
                                <div key={guest.id} className={`grid grid-cols-12 items-center p-3 md:p-4 rounded-xl transition-all duration-200 border ${guest.status === 'Checked In' ? 'bg-teal-50/30 border-teal-100/50' : 'bg-white border-transparent hover:border-slate-100 hover:shadow-sm'}`}>
                                    <div className="col-span-8 md:col-span-5 flex items-center gap-2 md:gap-3">
                                        <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-bold shadow-sm flex-shrink-0 ${guest.status === 'Checked In' ? 'bg-teal-100 text-teal-700' : 'bg-slate-100 text-slate-500'}`}>
                                            {guest.name.charAt(0)}
                                        </div>
                                        <div className="truncate pr-2">
                                            <h4 className={`font-semibold text-sm truncate ${guest.status === 'Checked In' ? 'text-teal-900' : 'text-slate-700'}`}>{guest.name}</h4>
                                            <p className="text-[10px] text-slate-400 md:hidden flex items-center gap-1">{guest.role}</p>
                                        </div>
                                    </div>
                                    <div className="col-span-3 hidden md:flex items-center">
                                        <span className="text-xs text-slate-500 font-medium px-2 py-1 bg-slate-100 rounded-md">{guest.role}</span>
                                    </div>
                                    <div className="col-span-4 md:col-span-4 flex justify-end">
                                        {guest.status === 'Checked In' ? (
                                            <div className="flex flex-col items-end">
                                                <span className="flex items-center gap-1 text-teal-600 text-xs md:text-sm font-bold bg-white px-2 py-1 md:px-3 rounded-full shadow-sm border border-teal-100">
                                                    <Icons.CheckCircle size={12} className="md:w-3.5 md:h-3.5" /> Checked In
                                                </span>
                                            </div>
                                        ) : (
                                            <button onClick={() => handleCheckIn(guest.id)} className="text-xs md:text-sm font-medium text-slate-500 hover:text-teal-600 hover:bg-teal-50 px-3 py-1.5 md:px-4 md:py-2 rounded-lg border border-slate-200 hover:border-teal-200 transition-all bg-white shadow-sm">
                                                Check In
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                </div>
            </div>
        </div>
    )
}

export default CheckinWindow