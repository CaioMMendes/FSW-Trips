'use client'
import { signIn, signOut, useSession } from 'next-auth/react'

export default function Home() {
  const { data } = useSession()
  return (
    <div>
      <button onClick={() => signIn()}>Login</button>
      <button onClick={() => signOut()}>Logout</button>
      <h1 className="text-3xl font-bold text-red-500 underline ">
        ola {data?.user?.name}
        <img src={data?.user?.image} alt="" />
      </h1>
    </div>



  )
}
