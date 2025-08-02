"use client";
import React, { useEffect, useState } from 'react'
import AddAttendeePopup from './AddAttendeePopup';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import InviteCodePopup from './InviteCodePopup';

function EventAttendees({ eventId }) {
    const [popupActive, setPopupActive] = useState(false);
    const [attendees, setAttendees] = useState([]);
    const [attendeesArr, setAttendeesArr] = useState([])
    const [searchString, setSearchString] = useState('');
    const [showInvite, setShowInvite] = useState({show : false, inviteid : ''});
    const router = useRouter();

    function setUserImage(name) {
        // const user = JSON.parse(Cookies.get('user'));
        const seperatedname = name.split(" ");
        const placeholdername = seperatedname[0].toUpperCase().charAt(0) + (seperatedname.length>1 ? seperatedname[1].toUpperCase().charAt(0) : '')
        return placeholdername
    }

    async function fetchAttendees() {
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
                eventid: eventId
            })
        });

        if (result.ok) {
            const res = await result.json();
            if (res.success) {
                setAttendees(res.event.attendees || [])
                setAttendeesArr(res.event.attendees || [])
                console.log(res.event.attendees)
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
    }

    function filterAttendees(searchString) {
        // Filter items where *any* value contains the search string
        const filtered = attendeesArr.filter(obj =>
            Object.values(obj).some(
                val =>
                    val.toString().toLowerCase().includes(searchString.toLowerCase())
            )
        );

        if (filtered.length < 1) {
            return attendeesArr
        }
        else return filtered
    }

    function successCallback(inviteid) {
        fetchAttendees()
        setShowInvite({show : true, inviteid : inviteid})
    }

    useEffect(() => {
        fetchAttendees();
    }, [])

    return (
        // <!-- Main Container -->
        <div className="bg-white mt-5 w-full h-full p-6 sm:p-10 space-y-8">

            {/* <!-- Header and Add Attendee Button --> */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                {/* <h1 className="text-4xl font-bold text-teal-800">Event Attendees</h1> */}
                <input type="text" placeholder='Search Attendees' value={searchString} onChange={(e) => { setSearchString(e.target.value); setAttendees(filterAttendees(e.target.value)) }} className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200 w-full sm:w-auto" />
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
                {attendees.map((attendee, index) => (
                    <div className="flex items-center justify-between p-4 sm:p-6 hover:bg-gray-50 transition-colors duration-200" key={index}>
                        {/* <!-- Attendee Details --> */}
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center justify-center w-12 h-12 bg-teal-100 text-teal-600 font-bold rounded-full text-xl">
                                {setUserImage(attendee.name)}
                            </div>
                            <div>
                                <p className="text-lg font-semibold text-gray-900">{attendee.name}</p>
                                <p className="text-sm text-gray-500">{attendee.email}</p>
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
                            <button onClick={() => setShowInvite({show : true, inviteid : attendee.inviteid})} className="p-2 text-gray-400 hover:text-teal-500 transition-colors duration-200 rounded-full hover:bg-gray-100" title="Share">
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
                ))}

            </div>
            {popupActive && (<AddAttendeePopup setPopup={setPopupActive} eventId={eventId} sucessCallback={successCallback} />)}
            {showInvite.show && (<InviteCodePopup togglePopup={(val) => setShowInvite({...showInvite, show : val})} inviteId={showInvite.inviteid}  />)}
        </div>
    )
}

export default EventAttendees