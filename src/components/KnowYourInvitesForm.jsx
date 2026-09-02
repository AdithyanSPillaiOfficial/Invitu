"use client";
import React, { useState } from 'react'

function KnowYourInvitesForm({handleSubmit}) {
    const [searchText, setSearchText] = useState("");
    
    return (
        <div className='h-screen flex flex-col items-center justify-center'>
        <div className={`form-container z-10 bg-white p-8 md:p-10 lg:p-12 rounded-xl shadow-2xl w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/5 max-w-md transition-all duration-500 ease-in-out`}>

            <div className="space-y-6">
                <h2 className="text-3xl font-semibold text-center text-teal-700 mb-6">Welcome Dear!</h2>
                <p className="text-center text-gray-600 mb-8">Find who Invited you.</p>

                <form className="space-y-5" onSubmit={(e) => handleSubmit(e, searchText)}>
                    <div>
                        <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-1">Email or Phone Number</label>
                        <input
                            type="text"
                            id="search-text"
                            name="searchtext"
                            placeholder="your.love@example.com or 9123456780"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-200 ease-in-out outline-teal-600"
                            required
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </div>


                    <button
                        type="submit"
                        className="w-full py-3 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        Search
                    </button>
                </form>

            </div>
        </div>
        </div>
    )
}

export default KnowYourInvitesForm;