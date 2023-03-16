// need to fix sticky navbar and footer (make not sticky)
import Link from 'next/link';
import Footer from '../components/Footer'
import localFont from '@next/font/local'

const barlow = localFont({
    src: "../public/fonts/Barlow-Regular.ttf",
    weight: '200'
  })
  

export default function fuel_quote_form() {
    return (
        <div className="flex flex-col min-h-screen">
        <header className={barlow.className}>
            {/* TOP BAR */}
            <nav className="flex w-full items-center font-bold text-4xl text-beige bg-light_blue h-14">
            <div className="ml-4">
                FUEL QUOTER
            </div>
            <ul className="ml-auto left-0 right-0 top-full inline-flex">
                <li className="flex mr-4 items-center">
                    <Link href="/LoggedInHomePage"><span>HOME</span></Link>
                </li>
                <li className="flex mr-4 items-center">
                    <Link href="/QuoteHistory"><span>HISTORY</span></Link>
                </li>
                <li className="flex mr-4 items-center">
                    <Link href="/ProfilePage"><span>PROFILE</span></Link>
                </li>
                <li className="flex mr-4 items-center">
                    <Link href="/HomePage"><span>LOGOUT</span></Link>
                </li>
            </ul>
            </nav>
        </header>


        <div className="flex-grow flex items-center justify-center">
        <main className={barlow.className}>
        {/* QUOTE FORM */}
            <div className="flex justify-center items-center">
                <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl flex-col">
                    {/* Title */}
                    <div className="flex items-center justify-center w-full py-2">
                        <h1 className="font-bold text-2xl mt-4">Get a Fuel Quote!</h1>
                    </div>
                    <hr className="border-black my-2 mx-16"></hr>

                    <div className="flex w-full items-center justify-center">    
                        {/* left */}
                        <div className="w-full p-6 lg:w-3/5">
                            
                            <div className={barlow.className}>
                                <label className="block text-gray-700 font-bold">Address 1</label>
                                <input disabled type="text" placeholder="Address from Profile" className="w-full px-4 py-2 mt-1 border rounded-md" />
                            </div>
                            <div className="mt-4">
                                <label className="block text-gray-700   font-bold mt-4">Address 2</label>
                                <input disabled type="text" placeholder="Address from Profile" className="w-full px-4 py-2 mt-1 border rounded-md" />
                            </div>
                            <div className="mt-4">
                                <div className="flex flex-col sm:flex-row">
                                    <div className="relative flex-initial sm:w-1/2">
                                        <label className="block text-gray-700   font-bold">City</label>
                                        <input disabled type="text" placeholder="City" name="billing-address" className="w-full px-4 py-2 mt-1 border rounded-md" />
                                    </div>
                                    <div className="relative flex-initial sm:w-1/4 mx-1">
                                        <label className="block text-gray-700   font-bold">State</label>
                                        <input disabled type="text" placeholder="State" name="billing-state" className="w-full px-4 py-2 mt-1 border rounded-md"/>
                                    </div>
                                    <div className="relative flex-initial sm:w-1/4">
                                        <label className="block text-gray-700   font-bold ">Zip</label>
                                        <input disabled type="text" placeholder="ZIP" name="billing-zip" className="w-full px-4 py-2 mt-1 border rounded-md" />
                                    </div>
                                </div>
                                <span className="text-sm mt-1 justify-center"> 
                                Not the right address? Change it on your profile <Link href="/ProfilePage" className="text-light_blue underline hover:font-bold">here</Link>!
                                </span>
                            </div>
                        </div>

                        {/* rightt */}
                        <div className="w-full p-8 lg:w-2/5">
                            <div className="py-2">
                                <label className="block   font-bold">Gallons Requesting</label>
                                <input type="text" placeholder="0.00" className="w-full px-4 py-2 mt-1 border rounded-md" />
                            </div>
                            <button className="block w-1/2 py-2 mt-4 mx-auto text-light_blue border border-light_blue rounded-lg hover:outline-double">
                                Get Quote
                            </button>
                            
                            <div className="mt-6 py-2">
                                <label className="block   font-bold">Suggested Quote</label>
                                <div className="flex">
                                    <span className="inline-flex items-center px-4 py-2 mt-1 border-r-none border rounded-l-md"> $ </span>
                                    <input type="number" placeholder="0.00" className="w-full px-4 py-2 mt-1 border rounded-r-md" disabled/>
                                </div>

                            </div>
                            <button className="block w-1/2 py-2 mt-4 mx-auto bg-light_blue rounded-lg text-beige hover:bg-light_blue/75 hover:text-beige" disabled>
                                Order Now
                            </button>
                            
                                
                        </div>
                    </div>


                </div>
            </div>
        </main>
        </div>


        {/* FOOTER */}
        {/* add conditional button stuff later */}
        <Footer/>

      </div>
      
    );
  }
