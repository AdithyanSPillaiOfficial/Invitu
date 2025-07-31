import { useRouter } from 'next/navigation'
import React from 'react'

function EventTile({event, index}) {
    const router = useRouter();
    return (
        <div key={index} className="bg-white rounded-xl shadow-md hover:shadow-lg p-6 border-t-4 border-teal-500 transition duration-300 ease-in-out">
            <h3 className="text-lg sm:text-xl font-bold text-teal-700 mb-3">{event.title}</h3>
            <p className="text-gray-700 mb-2 text-sm sm:text-base">
                <span className="font-semibold text-gray-600">Date:</span> {event.date}
            </p>
            <p className="text-gray-700 mb-2 text-sm sm:text-base">
                <span className="font-semibold text-gray-600">Time:</span> {event.time}
            </p>
            <p className="text-gray-700 text-sm sm:text-base">
                <span className="font-semibold text-gray-600">Location:</span> {event.location}
            </p>
            <div className="mt-5 flex justify-end">
                <button className="text-sm text-teal-600 hover:text-teal-800 font-medium py-2 px-4 rounded-lg hover:bg-teal-50 transition duration-300" onClick={() => router.push("/dashboard/event/"+event._id)}>View Details</button>
            </div>
        </div>
    )
}

export default EventTile