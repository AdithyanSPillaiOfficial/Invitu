import WeddingInvite from '@/components/invites/WeddingInvite';
import React, { use } from 'react'

function page({params}) {
    params = use(params);
  return (
    <div>
        <WeddingInvite />
    </div>
  )
}

export default page