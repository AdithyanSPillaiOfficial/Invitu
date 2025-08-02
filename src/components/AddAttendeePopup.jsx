import Popup from '@/widgets/Popup'
import Cookies from 'js-cookie'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

function AddAttendeePopup({setPopup, eventId, sucessCallback}) {
    const [attendee, setAttendee] = useState({
        name : "",
        email : "",
        address : "",
        phone : "",
        noofpersons : 1,
    })

    async function handleAddAttendee(e) {
        e.preventDefault();
        const result = await fetch("/api/addattendee", {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                sessionid : Cookies.get('sessionid'),
                eventid : eventId,
                attendee : attendee
            })
        })
        if(result.ok) {
            const res = await result.json();

            if(res.success) {
                console.log(res);
                toast.success('Attendee Added Sucessfully');
                sucessCallback(res.inviteid);
                setPopup(false);
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
        <div>
            <Popup title={"Add Attendee"} togglePopup={setPopup}>
                <div className="space-y-6">
                    <h2 className="text-3xl font-semibold text-center text-teal-700 mb-6">Add a charector to your story!</h2>
                    <p className="text-center text-gray-600 mb-4">Enter the attendee details given below.</p>

                    <form className="space-y-5" onSubmit={(e) => handleAddAttendee(e)}>
                        <div>
                            <label htmlFor="attendee-name" className="block text-sm font-medium text-gray-700 mb-1">Attendee Name</label>
                            <input
                                type="text"
                                id="attendee-name"
                                name="name"
                                placeholder="Attendee Name"
                                className="w-full px-4 py-2 border text-black outline-teal-600 border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-200 ease-in-out"
                                required
                                value={attendee.name}
                                onChange={(e) => setAttendee({ ...attendee, name: e.target.value })}
                            />
                        </div>

                        <div>
                            <label htmlFor="attendee-email" className="block text-sm font-medium text-gray-700 mb-1">Attendee Email</label>
                            <input
                                type="email"
                                id="attendee-email"
                                name="email"
                                placeholder="Attendee Email"
                                className="w-full px-4 py-2 border text-black outline-teal-600 border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-200 ease-in-out"
                                required
                                value={attendee.email}
                                onChange={(e) => setAttendee({ ...attendee, email: e.target.value })}
                                onBlur={() => {
                                    if(!attendee.email.includes("@")) {
                                        setAttendee({...attendee, email : attendee.email+"@gmail.com"})
                                    }
                                }}
                            />
                        </div>

                        <div>
                            <label htmlFor="attendee-address" className="block text-sm font-medium text-gray-700 mb-1">Attendee Address</label>
                            <input
                                type="text"
                                id="attendee-address"
                                name="address"
                                placeholder="Attendee Address"
                                className="w-full px-4 py-2 border text-black outline-teal-600 border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-200 ease-in-out"
                                value={attendee.address}
                                onChange={(e) => setAttendee({ ...attendee, address: e.target.value })}
                            />
                        </div>

                        <div>
                            <label htmlFor="attendee-phone" className="block text-sm font-medium text-gray-700 mb-1">Attendee Phone</label>
                            <input
                                type="phone"
                                id="attendee-phone"
                                name="phone"
                                placeholder="Attendee Phone"
                                className="w-full px-4 py-2 border text-black outline-teal-600 border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-200 ease-in-out"
                                value={attendee.phone}
                                onChange={(e) => setAttendee({ ...attendee, phone: e.target.value })}
                            />
                        </div>

                        <div>
                            <label htmlFor="attendee-noofpersons" className="block text-sm font-medium text-gray-700 mb-1">No. of Persons Attending</label>
                            <input
                                type="number"
                                id="attendee-noofpersons"
                                name="noofpersons"
                                placeholder="No. of Persons Attending"
                                className="w-full px-4 py-2 border text-black outline-teal-600 border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-200 ease-in-out"
                                required
                                value={attendee.noofpersons}
                                onChange={(e) => setAttendee({ ...attendee, noofpersons: e.target.value })}
                            />
                        </div>


                        <button
                            type="submit"
                            className="w-full py-3 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            Add Attendee
                        </button>
                    </form>


                </div>
            </Popup>
        </div>
    )
}

export default AddAttendeePopup