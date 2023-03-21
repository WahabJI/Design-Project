import Link from 'next/link';
import Footer from '../components/Footer'
import {HandleSignOut} from '../components/SignOut'
import localFont from "next/font/local"

const barlow = localFont({
  src: "../public/fonts/Barlow-Regular.ttf",
  weight: '200'
})

export default function HomePage() {
    return (
      <div className={barlow.className}>
        {/* TOP BAR */}
        <nav className="flex absolute w-full items-center font-bold text-4xl text-beige bg-light_blue h-14">
          <div className="ml-4">
            FUEL QUOTER
          </div>
          <ul className="ml-auto left-0 right-0 top-full inline-flex">
            <li className="flex mr-4 items-center">
              <Link href="/QuoteForm"><span>QUOTE</span></Link>
            </li>
            <li className="flex mr-4 items-center">
              <Link href="/QuoteHistory"><span>HISTORY</span></Link>
            </li>
            <li className="flex mr-4 items-center">
              <Link href="/ProfilePage"><span>PROFILE</span></Link>
            </li>
            <li className="flex mr-4 items-center">
              <button onClick={HandleSignOut}>LOGOUT</button>
            </li>
          </ul>
        </nav>


        {/* LOGIN FORM */}
        <div className="flex flex-col py-16 justify-between h-screen bg-gray-100">
          <div className="px-8 py-6 text-left w-5/6 bg-white shadow-lg m-auto">
            <h3 className="text-2xl font-bold">YOUR LAST QUOTE</h3>
            <div className="flex flex-row">
              <div>
                <div className="mt-4 flex flex-row space-x-4">
                    <div className="text-light_blue">Gallons Requested:</div>
                    <div className="text-black inline-block">50</div>
                  </div>
                  <div className="flex flex-row space-x-14">
                    <div className="text-light_blue">Amount Paid:</div>
                    <div className="text-black inline-block">$2,945.00</div>
                  </div>
                  <div className="flex flex-row space-x-10">
                    <div className="text-light_blue">Date Delivered:</div>
                    <div className="text-black inline-block">February 16, 2023</div>
                  </div>
              </div>
              <div className="pl-24 pr-10">
                <div className="mt-4 flex flex-row space-x-4">
                  <div className="text-light_blue">Price / Gallon:</div>
                  <div className="text-black inline-block">$0.25</div>
                </div>
                <div className="flex flex-row space-x-8">
                  <div className="text-light_blue">Address:</div>
                  <div className="text-black inline-block px-5">5098 Jacksonville Rd</div>
                </div>
                <div className="flex flex-row space-x-10">
                  <div className="text-black inline-block px-28">Apartment 1960</div>
                </div>
                <div className="flex flex-row space-x-10">
                  <div className="text-black inline-block px-28">Houston, TX, 77034</div>
                </div>
              </div>
              <div className>
                <Link href="/QuoteHistory"><button className="px-6 py-2 mt-4 text-beige bg-light_blue rounded-lg hover:bg-light_blue/75 hover:text-beige">View Full<br></br>Quote History</button></Link>
              </div>
            </div>
          </div>

          <div className="flex flex-row">
            <div className="pl-8 py-6 text-left w-1/4 bg-white shadow-lg mx-auto">
              <h3 className="text-2xl font-bold">PROFILE OVERVIEW</h3>
                <div className="mt-4 flex flex-row space-x-12">
                  <div className="text-light_blue">Name:</div>
                  <div className="text-black inline-block px-1">Joe Shmoe</div>
                </div>
                <div className="flex flex-row space-x-9">
                  <div className="text-light_blue">Address:</div>
                  <div className="text-black inline-block">5098 Jacksonville Rd</div>
                </div>
                <div className="flex flex-row space-x-10">
                  <div className="text-black inline-block pl-24">Apartment 1960</div>
                </div>
                <div className="flex flex-row space-x-10">
                  <div className="text-black inline-block pl-24">Houston, TX, 77034</div>
                </div>
                <div className="flex-grow flex justify-center items-center">
                  <Link href="/ProfilePage"><button className="px-6 py-2 mt-4 text-beige bg-light_blue rounded-lg hover:bg-light_blue/75 hover:text-beige">View / Edit Profile</button></Link>
                </div>
            </div>

            <div className="px-8 py-6 text-left w-3/5 bg-white shadow-lg m-auto">
              <h3 className="text-2xl font-bold">WHAT IS THE FUEL QUOTER?</h3>
                <div className="text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do <div className="text-light_blue inline-block">eiusmod</div> tempor incididunt 
                    ut labore et dolore magna aliqua. Ut enim ad minim quis nostrud exercitation <div className="text-light_blue inline-block">ullamco</div> laboris 
                    nisi ut aliquip ex ea commodo consequat. Duis aute <div className="text-light_blue inline-block">irure</div> dolor in reprehenderit in voluptate 
                    velit <div className="text-light_blue inline-block">esse</div> dolore eu fugiat nulla pariatur. Excepteur sint occaecat <div className="text-light_blue inline-block">cupidatat</div> non 
                    proident, sunt in culpa qui officia deserunt.
                </div>
                <div className="flex flex-row space-x-10 justify-center">
                  <Link href="/QuoteForm"><button className="px-6 py-2 mt-4 text-beige bg-light_blue rounded-lg hover:bg-light_blue/75 hover:text-beige">Go to Fuel Quote Form</button></Link>
                </div>
            </div>
          </div>
        </div>


        {/* FOOTER */}
        <Footer/>

      </div>
    );
  }