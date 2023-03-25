import HomePage from './HomePage'
import LoggedInHomePage from './LoggedInHomePage'
import { useSession,signOut } from 'next-auth/react'

export default function Home() {
  const { data: session } = useSession()
  console.log(session)
  return (
    <>
      {session ? <LoggedInHomePage /> : <HomePage /> }
    </>
  )
}
