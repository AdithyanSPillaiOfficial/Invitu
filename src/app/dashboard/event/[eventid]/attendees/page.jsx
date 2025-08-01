import EventAttendees from '@/components/EventAttendees'
import React, { use } from 'react'

function page({params}) {
    params = use(params)
  return (
    <div className='w-full h-full'>
        <EventAttendees eventId={params.eventid}/>
    </div>
  )
}

export default page