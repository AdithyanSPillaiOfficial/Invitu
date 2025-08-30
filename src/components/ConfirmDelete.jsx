import Popup from '@/widgets/Popup'
import React from 'react'

function ConfirmDelete({togglePopup, attendee, successCallback}) {
  return (
    <div>
        <Popup title={"Delete Attendee"} togglePopup={togglePopup} >
            <p className='text-xl'>Are You Sure to Delete attendee {attendee.name} ?</p>
            <div className='flex flex-row justify-end items-center gap-5 h-5'>
                <div onClick={() => togglePopup(false)} className='bg-teal-500 px-5 py-3 rounded-2xl text-white cursor-default'>Cancel</div>
                <div onClick={successCallback} className='bg-red-600 px-5 py-3 rounded-2xl p-5 text-white cursor-default'>Delete</div>
                
            </div>
        </Popup>
    </div>
  )
}

export default ConfirmDelete