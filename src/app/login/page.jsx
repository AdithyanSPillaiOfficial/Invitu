import AuthForm from '@/components/AuthForm'
import Loading from '@/widgets/Loading'
import React from 'react'

function page() {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <AuthForm />
      </Suspense>
    </div>
  )
}

export default page