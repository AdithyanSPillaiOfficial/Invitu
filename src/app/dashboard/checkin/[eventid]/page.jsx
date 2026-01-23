import CheckinWindow from '@/components/CheckinWindow'
import React, { use } from 'react'

function page({params}) {
    params = use(params)
  return (
    <div className='h-full mb-10'>
        <CheckinWindow eventId={params.eventid}/>
    </div>
  )
}

export default page