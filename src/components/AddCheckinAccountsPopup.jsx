import Popup from '@/widgets/Popup'
import Cookies from 'js-cookie';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

function AddCheckinAccountsPopup({pushToAccount, setPopup, eventId}) {
  const [newUserEmail, setNewUserEmail] = useState('');

  async function handleAddAccount(e) {
    e.preventDefault();

    const result = await fetch('/api/addcheckinaccount', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        sessionid: Cookies.get('sessionid'),
        newusermail: newUserEmail,
        eventid: eventId
      })
    });
    if(result.ok) {
      const res = await result.json();
      if(res.success) {
        toast.success("New User Added to checkin Accounts");
        pushToAccount({name: res.newuser.name, email: res.newuser.email});
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
      <Popup title="Add Checkin Account" togglePopup={setPopup}>
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold text-center text-teal-700 mb-6">Add A Checkin Account!</h2>
          <p className="text-center text-gray-600 mb-4">Enter the details given below.</p>

          <form className="space-y-5" onSubmit={(e) => handleAddAccount(e)}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">User Email</label>
              <input
                type="email"
                id="email"
                name="title"
                placeholder="User Email"
                className="w-full px-4 py-2 border text-black outline-teal-600 border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-200 ease-in-out"
                required
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
              />
            </div>

            


            <button
              type="submit"
              className="w-full py-3 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
            >
              Add Account
            </button>
          </form>


        </div>
      </Popup>
    </div>
  )
}

export default AddCheckinAccountsPopup