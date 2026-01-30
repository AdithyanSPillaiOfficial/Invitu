import EventCheckinAccounts from '@/components/EventCheckinAccounts'
import React, { use } from 'react'

function page({params}) {
    params = use(params);
  return (
    <div>
        <EventCheckinAccounts eventId={params.eventid}/>
    </div>
  )
}

export default page