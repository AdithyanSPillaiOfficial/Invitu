import Popup from '@/widgets/Popup'
import React from 'react'

function AddEventPopup({togglePopup}) {
  return (
    <div>
        <Popup title="Add Event" togglePopup={togglePopup}>
            <div>This is a sample event</div>
        </Popup>
    </div>
  )
}

export default AddEventPopup