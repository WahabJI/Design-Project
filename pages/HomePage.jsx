import Link from 'next/link';
import Head from 'next/head';
import Footer from '../components/Footer'
import localFont from "next/font/local"
import { useSession } from 'next-auth/react';
const barlow = localFont({
  src: "../public/fonts/Barlow-Regular.ttf",
  weight: '200'
})

export default function HomePage() {
  const { data: session, status } = useSession()
  return (
    <div className={barlow.className}>
      <Head>
        <title>Fuel Quoter: Get Your Fuel Fast</title>
        <link rel="icon" href="/gasPump.ico" />
      </Head>
      <div className= "flex flex-col min-h-screen h-screen justify-between bg-gray-100 overflow-auto">
      {/* TOP BAR */}
      <header >
        <nav className="relative flex w-full items-center font-bold text-4xl text-beige bg-light_blue shadow-md h-16">
          <div className="ml-8">
            <Link href="/"> FUEL QUOTER </Link>
          </div>
          <ul className="ml-auto left-0 right-0 top-full inline-flex">
            <li className="flex mr-8 items-center hover:underline">
              <Link href="/LoginPage"> LOGIN </Link>
            </li>
            <li className="flex mr-8 items-center hover:underline">
                <Link href="/RegisterPage"> REGISTER </Link>
            </li>
          </ul>
        </nav>
      </header>


      {/* LOGIN FORM */}
      <div className="flex flex-col py-16 justify-between bg-gray-100">
        <div className="px-8 py-6 text-left w-5/6 bg-white shadow-lg m-auto mb-16">
          <h3 className="text-2xl font-bold">WELCOME!</h3>
              <div className="mt-4">
                <div>Click one of the <div className="text-light_blue inline-block">buttons</div> below to continue</div>
                <div className="flex items-baseline space-x-8">
                    <Link href="/LoginPage"><button className="px-6 py-2 mt-4 text-beige bg-light_blue rounded-lg hover:bg-light_blue/75 hover:text-beige">Login</button></Link>
                    <Link href="RegisterPage"><button className="px-6 py-2 mt-4 text-beige bg-light_blue rounded-lg hover:bg-light_blue/75 hover:text-beige">Register</button></Link>
                </div>  
              </div>  
        </div>
        <div className="px-8 py-6 text-left w-5/6 bg-white shadow-lg m-auto">
          <h3 className="text-2xl font-bold">WHAT IS THE FUEL QUOTER?</h3>
            <p className="text-justify leading-6 mt-2"> 
              <div className="inline-block text-light_blue">Fuel Quoter</div> is a user-friendly software application designed to provide clients with reliable, accurate, and timely predictions of fuel rates.
              Using a client's location, the amount of fuel they are requesting, and company profit margin, we generate a personalized quote for each client.
            </p>
            <p className="text-left leading-6 mt-2">
              Whether you are a new customer looking to establish a relationship or an existing customer seeking competitive pricing, Fuel Quoter is an essential tool for all your fuel rate prediction needs.
            </p>  
        </div>
      </div>


      {/* FOOTER */}
      <Footer/>

    </div>
    </div>
  );
}