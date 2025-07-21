import Image from 'next/image';
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'react-toastify';

function Sidebar({isOpen, setSidebarOpen}) {
    const router = useRouter();
    function handleLogout() {
        toast.success("Logged Out Sucessfully");
        router.replace("/login");
    }
    return (
        <div className={`
            fixed top-0 left-0 h-screen w-64 bg-white z-50
            transform transition-transform duration-500 ease-in-out
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            md:translate-x-0 md:relative md:block
          `}>
            {/* <!-- Sidebar -->
            <!-- Fixed position on mobile, relative on desktop --> */}
            <aside id="sidebar" className="fixed inset-y-0 left-0 w-64 bg-teal-800 text-white flex-col p-6 rounded-r-2xl shadow-lg z-50 md:relative flex h-screen">
                <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center">
                        {/* <svg className="w-10 h-10 text-teal-300 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <h2 className="text-2xl font-extrabold">EventFlow</h2> */}
                        <Image src="/horizontal_white.png" width={200} height={50} alt='Invitu' />
                    </div>
                    {/* Close button for mobile sidebar */}
                    <button id="closeSidebarBtn" className="md:hidden text-white hover:text-teal-200 focus:outline-none p-2 rounded-full hover:bg-teal-700 transition duration-300" onClick={() => setSidebarOpen(false)}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <nav className="flex-grow">
                    <ul>
                        <li className="mb-4">
                            <a href="#" className="flex items-center p-3 rounded-lg text-teal-100 hover:bg-teal-700 hover:text-white transition duration-200">
                                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                Dashboard
                            </a>
                        </li>
                        <li className="mb-4">
                            <a href="#" className="flex items-center p-3 rounded-lg text-teal-100 hover:bg-teal-700 hover:text-white transition duration-200">
                                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                All Events
                            </a>
                        </li>
                        <li className="mb-4">
                            <a href="#" className="flex items-center p-3 rounded-lg text-teal-100 hover:bg-teal-700 hover:text-white transition duration-200">
                                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.146-1.28-.426-1.849m0 0l-7.402-1.85A2 2 0 007 15.397V11.5c0-.181.02-.362.06-.534m0 0C6.516 10.328 6 9.776 6 9V6a2 2 0 012-2h8a2 2 0 012 2v3c0 .776-.516 1.328-1.06 1.597M18 20h-3.356C14.28 20 13.653 19.854 13.084 19.574m0 0L7.602 17.151M2.685 10.198A2.25 2.25 0 013 9.5V6a2 2 0 012-2h8a2 2 0 012 2v3c0 .776-.516 1.328-1.06 1.597m-2.585 4.398a2.25 2.25 0 00-.685-.198H2.685z" />
                                </svg>
                                Attendees
                            </a>
                        </li>
                    </ul>
                </nav>
                <div className="mt-auto">
                    <a href="#" className="flex items-center p-3 rounded-lg text-teal-100 hover:bg-teal-700 hover:text-white transition duration-200">
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Settings
                    </a>
                    <a href="#" onClick={handleLogout} className="flex items-center p-3 rounded-lg text-teal-100 hover:bg-teal-700 hover:text-white transition duration-200 mt-2">
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                    </a>
                </div>
            </aside>

        </div>
    )
}

export default Sidebar