import EventView from '@/components/EventView';
import React, { use } from 'react'

function page({params}) {
    params = use(params);
  return (
    <div className='h-full pb-25'>
      <EventView eventid={params.eventid}/>
    </div>
  )
}

export default page