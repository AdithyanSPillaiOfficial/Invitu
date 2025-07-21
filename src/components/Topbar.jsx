import React from 'react'

function Topbar({setSidebarOpen}) {
    return (
        <div>
            {/* <!-- Top Bar --> */}
            <header className="bg-white p-4 md:p-6 shadow-md flex flex-col sm:flex-row justify-between items-center rounded-bl-2xl">
                <div className="flex items-center justify-between w-full sm:w-auto mb-4 sm:mb-0">
                    {/* Hamburger menu for mobile */}
                    <button id="openSidebarBtn" className="md:hidden p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition duration-200 mr-4" onClick={() => setSidebarOpen(true)}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800">Dashboard Overview</h1>
                </div>
                <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                    <input
                        type="text"
                        placeholder="Search events..."
                        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200 w-full sm:w-auto"
                    />
                    <div className="flex space-x-3">
                        <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition duration-200">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                        </button>
                        <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold">JD</div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Topbar