import { useLoading } from '@/contexts/LoadingContext';
import Popup from '@/widgets/Popup'
import Cookies from 'js-cookie';
import React, { useState } from 'react'
import { toast } from 'react-toastify'

function EditEventPopup({ togglePopup, setEvents }) {
  const {setLoading} = useLoading();
  const [eventDetails, setEventDetails] = useState({
    title: '',
    type: '',
    bridename: '',
    groomname: '',
    location: '',
    date: '',
    housename: '',
    otherevent: '',
    time: '',
    endtime : ''
  });
  const [enableEndtime, setEnableEndtime] = useState(false);

  async function handleAddEvent(e) {
    e.preventDefault();
    setLoading(true);
    const result = await fetch("/api/addevent", {
      method : "POST",
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
        sessionid : Cookies.get("sessionid"),
        event : eventDetails
      })
    });

    if(result.ok) {
      const res = await result.json();

      if(res.success) {
        setEvents(events => [...events, eventDetails]);
        toast.success("Event Added Sucessfully");
        togglePopup(false);
      }
      else {
        toast.error(res.error);
      }
    }
    setLoading(false);
  }
  return (
    <div>
      <Popup title="Add Event" togglePopup={togglePopup}>
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold text-center text-teal-700 mb-6">Make a Story With Us!</h2>
          <p className="text-center text-gray-600 mb-4">Enter the details given below.</p>

          <form className="space-y-5" onSubmit={(e) => handleAddEvent(e)}>
            <div>
              <label htmlFor="event-title" className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
              <input
                type="text"
                id="event-title"
                name="title"
                placeholder="Your Special Event"
                className="w-full px-4 py-2 border text-black outline-teal-600 border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-200 ease-in-out"
                required
                value={eventDetails.title}
                onChange={(e) => setEventDetails({ ...eventDetails, title: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="event-type" className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
              <select name="event-type" id="" value={eventDetails.type} onChange={(e) => setEventDetails({ ...eventDetails, type: e.target.value })} className='w-full px-4 py-2 border text-black outline-teal-600 border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-200 ease-in-out'>
                <option value="" disabled>--Select--</option>
                <option value="wedding">Wedding</option>
                <option value="engagement">Engagement</option>
                <option value="housewarming">House Warming</option>
                <option value="others">Others</option>
              </select>
            </div>

            <div>
              <label htmlFor="event-location" className="block text-sm font-medium text-gray-700 mb-1">Event Location</label>
              <input
                type="text"
                id="event-location"
                name="location"
                placeholder="Your Special Location"
                className="w-full px-4 py-2 border text-black outline-teal-600 border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-200 ease-in-out"
                required
                value={eventDetails.location}
                onChange={(e) => setEventDetails({ ...eventDetails, location: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="event-date" className="block text-sm font-medium text-gray-700 mb-1">Event Date</label>
              <input
                type="date"
                id="event-date"
                name="date"
                placeholder="Your Special Date"
                className="w-full px-4 py-2 border text-black outline-teal-600 border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-200 ease-in-out"
                required
                min={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
                value={eventDetails.date}
                onChange={(e) => setEventDetails({ ...eventDetails, date: e.target.value })}
              />
            </div>

            <div className='flex flex-row gap-4'>
              <div className='w-full'>
                <label htmlFor="event-time" className="block text-sm font-medium text-gray-700 mb-1">Event Time</label>
                <input
                  type="time"
                  id="event-time"
                  name="time"
                  placeholder="Your Special Time"
                  className="w-full px-4 py-2 border text-black outline-teal-600 border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-200 ease-in-out"
                  required
                  value={eventDetails.time}
                  onChange={(e) => setEventDetails({ ...eventDetails, time: e.target.value })}
                />
              </div>
              {enableEndtime && (<div className='w-1/2'>
                <label htmlFor="event-endtime" className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                <input
                  type="time"
                  id="event-endtime"
                  name="endtime"
                  placeholder="Your Special Conclusive Time"
                  className="w-full px-4 py-2 border text-black outline-teal-600 border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-200 ease-in-out"
                  required
                  value={eventDetails.endtime}
                  min={eventDetails.time}
                  onChange={(e) => setEventDetails({ ...eventDetails, endtime: e.target.value })}
                />
              </div>)}
            </div>

            <label class="inline-flex items-center me-5 cursor-pointer">
              <input type="checkbox" value="" class="sr-only peer" onChange={(e) => setEnableEndtime(e.target.checked)} />
                <div class="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600 dark:peer-checked:bg-teal-600"></div>
                <span class="ms-3 text-sm font-medium text-gray-900">Enable End Time</span>
            </label>



            {
              (eventDetails.type === "wedding" || eventDetails.type === "engagement") && (
                <div>
                  <label htmlFor="event-bridename" className="block text-sm font-medium text-gray-700 mb-1">Bride Name</label>
                  <input
                    type="text"
                    id="event-bridename"
                    name="bridename"
                    placeholder="Your Forever Beautiful Bride"
                    className="w-full px-4 py-2 border text-black outline-teal-600 border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-200 ease-in-out"
                    required
                    value={eventDetails.bridename}
                    onChange={(e) => setEventDetails({ ...eventDetails, bridename: e.target.value })}
                  />
                </div>
              )
            }

            {
              (eventDetails.type === "wedding" || eventDetails.type === "engagement") && (
                <div>
                  <label htmlFor="event-groomname" className="block text-sm font-medium text-gray-700 mb-1">Groom Name</label>
                  <input
                    type="text"
                    id="event-groomname"
                    name="groomname"
                    placeholder="Your Handsome Groom"
                    className="w-full px-4 py-2 border text-black outline-teal-600 border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-200 ease-in-out"
                    required
                    value={eventDetails.groomname}
                    onChange={(e) => setEventDetails({ ...eventDetails, groomname: e.target.value })}
                  />
                </div>
              )
            }

            {
              eventDetails.type === "housewarming" && (
                <div>
                  <label htmlFor="event-housename" className="block text-sm font-medium text-gray-700 mb-1">House Name</label>
                  <input
                    type="text"
                    id="event-housename"
                    name="housename"
                    placeholder="Your Beautiful House Name"
                    className="w-full px-4 py-2 border text-black outline-teal-600 border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-200 ease-in-out"
                    required
                    value={eventDetails.housename}
                    onChange={(e) => setEventDetails({ ...eventDetails, housename: e.target.value })}
                  />
                </div>
              )
            }

            {
              eventDetails.type === "others" && (
                <div>
                  <label htmlFor="event-otherevent" className="block text-sm font-medium text-gray-700 mb-1">What is Your Event ?</label>
                  <input
                    type="text"
                    id="event-otherevent"
                    name="otherevent"
                    placeholder="Your Event"
                    className="w-full px-4 py-2 border text-black outline-teal-600 border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-200 ease-in-out"
                    required
                    value={eventDetails.otherevent}
                    onChange={(e) => setEventDetails({ ...eventDetails, otherevent: e.target.value })}
                  />
                </div>
              )
            }



            <button
              type="submit"
              className="w-full py-3 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
            >
              Add Event
            </button>
          </form>


        </div>
      </Popup>
    </div>
  )
}

export default EditEventPopup