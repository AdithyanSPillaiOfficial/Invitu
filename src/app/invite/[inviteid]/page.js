"use client";
import HousewarmingInvite from '@/components/invites/HouseWarming';
import WeddingInvite from '@/components/invites/WeddingInvite';
import React, { use, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function Page({ params }) {
  params = use(params);
  const [invite, setInvite] = useState({});

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
      } else {
        toast.error(res.error);
      }
    }
  }

  useEffect(() => {
    fetchInvite();
  }, []); 

  return (
    <div>
      {(invite?.event?.type === "wedding" || invite?.event?.type === "engagement") && (<WeddingInvite invite={invite} />)}
      {invite?.event?.type === "housewarming" && <HousewarmingInvite invite={invite} />}
    </div>
  );
}

export default Page;
