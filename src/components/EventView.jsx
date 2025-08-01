"use client";
import React, { useEffect, useState } from 'react'
import styles from './styles/event.module.css';
import { useLoading } from '@/contexts/LoadingContext';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useDashboardContext } from '@/contexts/DashboardContext';


function EventView({ eventid }) {
    const { setLoading } = useLoading();
    const [event, setEvent] = useState({
        title: '',
        type: '',
        bridename: '',
        groomname: '',
        location: '',
        date: '',
        housename: '',
        otherevent: '',
        time: '',
        endtime: ''
    })
    const router = useRouter();

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

    function formatLoc(locationStr) {
        console.log(locationStr)
        // Match before the first comma or period
        const [firstPart, ...restParts] = locationStr.split(/[,\.]/);

        // Trim and rebuild
        const before = firstPart.trim();
        const after = restParts.join(',').trim(); // Join the rest back with commas if needed

        return [before, after];
    }


    const {setTitle} = useDashboardContext();

    useEffect(() => {
        setTitle("Event Overview")
        async function loadDetails() {

            const sessionId = Cookies.get("sessionid");
            if (!sessionId) {
                toast.warning("Please Login")
                router.replace("/login")
            }

            const result = await fetch("/api/geteventdetails", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sessionid: sessionId,
                    eventid: eventid
                })
            });

            if (result.ok) {
                const res = await result.json();
                if (res.success) {
                    setEvent(res.event);
                }
                else {
                    toast.error(res.error);
                    router.replace("/dashboard");
                }
            }
            else {
                toast.error("Something Went Wrong");
                router.replace("/dashboard")
            }
            setLoading(false);
        }
        loadDetails();
    }, [])

    return (
        <main className={`container mx-auto px-4 py-8 sm:py-10 lg:py-12 max-w-5xl pt-16 sm:pt-20 lg:pt-24 h-full overflow-x-auto ${styles.scrollbarHide}`}>
            {/* <!-- Names Section - Now serves as the primary visual header --> */}
            <section className="bg-white p-6 sm:p-8 rounded-xl shadow-lg mb-8 text-center border-t-4 border-teal-500">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-teal-700 mb-2 leading-tight">
                    The Grand Celebration
                </h1>
                <p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-teal-600 opacity-90">
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)} Ceremony
                </p>
                <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mt-6">
                    <span className="text-teal-600">{event.groomname}</span> <span className='text-teal-700'> ❤︎ </span> <span className="text-teal-600">{event.bridename}</span>
                </p>
                <p className="text-lg sm:text-xl text-gray-600 mt-2">
                    Bride & Groom
                </p>
            </section>

            {/* <!-- Details Grid --> */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8">
                {/* <!-- Date --> */}
                <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-teal-400">
                    <p className="text-sm font-medium text-teal-700 mb-1">Date</p>
                    <p className="text-xl font-semibold text-gray-800">{event.date}</p>
                    <br />
                    <p className="font-semibold text-gray-800">{formatTextDate(event.date)}</p>
                </div>

                {/* <!-- Time --> */}
                <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-teal-400">
                    <p className="text-sm font-medium text-teal-700 mb-1">Time</p>
                    <p className="text-xl font-semibold text-gray-800">{event.time} {event.endtime && (<span>- {event.endtime}</span>)}</p>
                </div>

                {/* <!-- Location --> */}
                <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-teal-400 col-span-1 md:col-span-2 lg:col-span-1">
                    <p className="text-sm font-medium text-teal-700 mb-1">Location</p>
                    <p className="text-xl font-semibold text-gray-800">{formatLoc(event.location)[0]}</p>
                    <p className="text-md text-gray-600 mt-1">{formatLoc(event.location)[1]}</p>
                </div>

                {/* <!-- Other Event (if applicable) --> */}
                <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-teal-400 col-span-1 md:col-span-2 lg:col-span-3">
                    <p className="text-sm font-medium text-teal-700 mb-1">Additional Event</p>
                    <p className="text-xl font-semibold text-gray-800">Reception Dinner to follow</p>
                </div>
            </section>

            {/* <!-- Buttons Section --> */}
            <section className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                <button className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-lg shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
                    Edit Event
                </button>
                <button className="bg-teal-600 hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-lg shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
                    Share Event
                </button>
                <button onClick={() => {
                    router.push(`${window.location.pathname}/attendees`);
                }} className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-lg shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
                    Manage Attendees
                </button>
            </section>

            {/* <!-- Call to Action / Message --> */}
            <section className="bg-white p-6 sm:p-8 rounded-xl shadow-lg text-center">
                <p className="text-md sm:text-lg lg:text-xl text-gray-700 leading-relaxed">
                    We would be honored to have you join us on this special day as we begin our journey together.
                </p>
            </section>
        </main>
    )
}

export default EventView