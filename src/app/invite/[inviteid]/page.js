"use client";
import WeddingInvite from '@/components/invites/WeddingInvite';
import React, { use, useEffect, useState } from 'react'
import { toast } from 'react-toastify';

function page({ params }) {
  params = use(params);
  const [invite, setInvite] = useState({})

  async function fetchInvite() {
    const result = await fetch("/api/getinvitedetails", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ inviteid: params.inviteid })
    });
    if (result.ok) {
      const res = await result.json();
      if (res.success) {
        setInvite(res.invite);
      }
      else {
        toast.error(res.error);
      }
    }
  }

  useEffect(() => {
    fetchInvite();
  }, [])

  return (
    <div>
      <WeddingInvite invite={invite} />
    </div>
  )
}

export default page