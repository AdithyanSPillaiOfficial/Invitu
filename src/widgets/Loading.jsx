"use client"
import { useLoading } from '@/contexts/LoadingContext'
import React, { useState } from 'react'
import { HashLoader } from 'react-spinners'

function Loading() {

    const {loading} = useLoading();

   return (
    <>
    {loading && (<div className='fixed top-0 left-0 w-screen h-screen bg-black/60 flex items-center justify-center z-99'>
        <HashLoader color='teal' size={150}/>
    </div>)}
    </>
  )
}

export default Loading