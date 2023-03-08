import { Inter } from '@next/font/google'
import HomePage from './HomePage'
import LoggedInHomePage from './LoggedInHomePage'
import { useSession,signOut } from 'next-auth/react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { data: session } = useSession()
  return (
    <>
      {session ? <LoggedInHomePage /> : <HomePage /> }
    </>
  )
}
