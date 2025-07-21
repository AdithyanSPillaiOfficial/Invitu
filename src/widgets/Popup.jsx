import React from 'react'

function Popup({children, title, togglePopup}) {
  return (
    <div className='fixed top-0 left-0 w-screen h-screen bg-black/60 flex flex-col justify-center items-center z-50' onClick={() => togglePopup(false)}>
        <div className='bg-teal-50 flex flex-col relative p-10 rounded-2xl' onClick={(e) => e.stopPropagation()}>
            <div onClick={() => togglePopup(false)} className='font-bold absolute top-4 right-4 h-8 w-8 shadow-md p-1 hover:bg-teal-500 flex flex-col justify-center items-center rounded-full cursor-default hover:text-white'>X</div>
            <span className='text-4xl text-teal-800 font-bold'>{title}</span>
            <hr className='my-4 border-t border-teal-700' />
            {children}
        </div>
    </div>
  )
}

export default Popup