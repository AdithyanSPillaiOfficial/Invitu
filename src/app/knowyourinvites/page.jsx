"use client";
import KnowYourInvites from '@/components/KnowYourInvites';
import KnowYourInvitesForm from '@/components/KnowYourInvitesForm'
import { useLoading } from '@/contexts/LoadingContext';
import Loading from '@/widgets/Loading';
import React, { Suspense, useState } from 'react'
import { toast } from 'react-toastify';

function page() {
    const {setLoading} = useLoading();
    const [showResult, setShowResult] = useState(false);
    const [invites, setInvites] = useState([]);

    async function handleSubmit(e, searchText) {
        e.preventDefault();

        setLoading(true);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+?[0-9\s()-]{7,20}$/;

        if (emailRegex.test(searchText)) {
            toast.success(`Processing search for Email address ${searchText}`)
        }
        else if (phoneRegex.test(searchText)) {
            toast.success(`You Searched Phone number ${searchText}`);
        }
        else {
            toast.error("You entered an Invalid value")
        }

        if (emailRegex.test(searchText) || phoneRegex.test(searchText)) {
            const res = await fetch("/api/knowyourinvites", {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({searchtext: searchText})
            })
            if(res.ok) {
                const result = await res.json();
                if(result.success) {
                    setInvites(result.invites);
                    setShowResult(true)
                    console.log(invites);
                    toast.success(`Found ${result.invites.length} invites`);
                }
                else {
                    toast.error(result.error)
                }
            }
            else {
                toast.error("Something went wrong");
            }
        }
        setLoading(false);
    }
    return (
        <div>
            <Suspense fallback={<Loading />}>
                { showResult ? <KnowYourInvites invites={invites} /> : <KnowYourInvitesForm handleSubmit={handleSubmit} />}
            </Suspense>
        </div>
    )
}

export default page