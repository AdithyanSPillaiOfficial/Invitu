"use client";
import React, { useEffect, useState } from 'react'
import AddCheckinAccountsPopup from './AddCheckinAccountsPopup';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

function EventCheckinAccounts({ eventId }) {
    const [popupActive, setPopupActive] = useState(false);
    const [checkinAccounts, setCheckinAccounts] = useState([]);
    const [accountsArr, setAccountsArr] = useState([]);
    const [searchString, setSearchString] = useState('');

    function setUserImage(name) {
        // const user = JSON.parse(Cookies.get('user'));
        const seperatedname = name.split(" ");
        const placeholdername = seperatedname[0].toUpperCase().charAt(0) + (seperatedname.length > 1 ? seperatedname[1].toUpperCase().charAt(0) : '')
        return placeholdername
    }

    async function fetchAccounts() {
        const result = await fetch('/api/getcheckinaccounts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                eventid: eventId,
                sessionid: Cookies.get('sessionid')
            })
        });
        if (result.ok) {
            const res = await result.json();
            if (res.success) {
                setCheckinAccounts(res.checkinaccounts);
                setAccountsArr(res.checkinaccounts);
            }
            else toast.error(res.error);
        }
        else {
            toast.error("Something went wrong");
        }
    }

    useEffect(() => {
        fetchAccounts();
    }, [])

    function filterAccounts(searchString) {
        // Filter items where *any* value contains the search string
        const filtered = accountsArr.filter(obj =>
            Object.values(obj).some(
                val =>
                    val.toString().toLowerCase().includes(searchString.toLowerCase())
            )
        );

        if (filtered.length < 1) {
            return accountsArr
        }
        else return filtered
    }

    async function deletCheckinAccount(email) {
        const result = await fetch('/api/deletecheckinaccount', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sessionid: Cookies.get('sessionid'),
                deleteusermail: email,
                eventid: eventId
            })
        });
        if (result.ok) {
            const res = await result.json();
            if (res.success) {
                setCheckinAccounts(checkinAccounts.filter(obj => obj.email !== email));
                setAccountsArr(accountsArr.filter(obj => obj.email !== email))
                toast.success("User Deleted from checkin Accounts");
            }
            else {
                toast.error(res.error);
            }
        }
        else {
            toast.error("Something went wrong");
        }
    }

    return (
        // <!-- Main Container -->
        <div className="bg-white mt-5 w-full h-full p-6 pb-50 md:pb-40 sm:p-10 space-y-8 overflow-scroll">

            {/* <!-- Header and Add Attendee Button --> */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                {/* <h1 className="text-4xl font-bold text-teal-800">Event Attendees</h1> */}
                <input type="text" placeholder='Search Accounts' value={searchString} onChange={(e) => { setSearchString(e.target.value); setCheckinAccounts(filterAccounts(e.target.value)) }} className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200 w-full sm:w-auto" />
                {/* <!-- Add Attendee Button with an SVG icon --> */}
                <button onClick={() => setPopupActive(true)} className="flex items-center gap-2 bg-teal-500 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105 active:scale-95 duration-200 focus:outline-none focus:ring-4 focus:ring-teal-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    <span>Add Check In Accounts</span>
                </button>
            </div>

            {/* <!-- Attendees List with Card-like Design --> */}
            <div className="divide-y divide-gray-200 rounded-2xl border border-gray-200 overflow-hidden">
                {/* <!-- Attendee Item 1 --> */}
                {checkinAccounts.map((attendee, index) => (
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

                            {/* <!-- Delete Button --> */}
                            <button onClick={() => deletCheckinAccount(attendee.email)} className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200 rounded-full hover:bg-gray-100" title="Delete">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            {popupActive && (<AddCheckinAccountsPopup setPopup={setPopupActive} pushToAccount={(obj) => { setCheckinAccounts([...checkinAccounts, obj]), setAccountsArr([...accountsArr, obj]) }} eventId={eventId} />)}
        </div>
    )
}

export default EventCheckinAccounts