import Link from 'next/link';
import Footer from '../components/Footer'
export default function profile_page() {
    return (
        <div className="flex flex-col h-screen justify-between">
            <header>
                {/* TOP BAR */}
                <nav className="flex w-full items-center font-bold text-4xl text-beige bg-light_blue h-14">
                    <div className="ml-4">
                        FUEL QUOTER
                    </div>
                    <ul className="ml-auto left-0 right-0 top-full inline-flex">
                    <li className="flex mr-4 items-center">
                    <Link href="/"><span>HOME</span></Link>
                    </li>
                    <li className="flex mr-4 items-center">
                    <Link href="/QuoteForm"><span>QUOTE</span></Link>
                    </li>
                    <li className="flex mr-4 items-center">
                    <Link href="/QuoteHistory"><span>HISTORY</span></Link>
                    </li>
                    <li className="flex mr-4 items-center">
                    <Link href="/"><span>LOGOUT</span></Link>
                    </li>
                    </ul>
                </nav>
            </header>


            {/* QUOTE FORM */}
            <main className="flex-1 overflow-y-auto bg-gray-100 p-8">
                <div className="flex-initial w-96  px-8 py-6 bg-white shadow-lg mx-auto my-auto">
                    <h3 className="text-2xl font-bold text-center">Profile</h3>
                    <form action="">
                        <div className="mt-3">
                            <div>
                                <label className="block" for="First Name">First Name</label>
                                <input type="text" placeholder="First Name" className="w-full px-5 py-2 mt-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                            </div>
                            <div className="mt-3">
                                <label className="block">Last Name</label>
                                <input type="text" placeholder="Last Name" className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                            </div>
                            <div className="mt-3">
                                <label className="block">Address 1</label>
                                <input type="text" placeholder="Address 1" className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                            </div>
                            <div className="mt-3">
                                <label className="block">Address 2 (optional)</label>
                                <input type="text" placeholder="Address 2" className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                            </div>
                            <div className="mt-3">
                                <label className="block">City</label>
                                <input type="text" placeholder="City" className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                            </div>
                            <div className="mt-3">
                                <label className="block">State</label>
                                <input type="text" placeholder="State" className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                            </div>
                            <div className="mt-3">
                                <label className="block">Zip Code</label>
                                <input type="text" placeholder="Zip Code" className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                            </div>


                            <div class="md:flex items-center justify-center mt-6 mx-auto">
                                <button className="block w-1/2 py-2 mt-4 mx-auto text-beige bg-light_blue rounded-lg hover:bg-light_blue/75 hover:text-beige">Update</button>
                            </div>




                        </div>


                    </form>
                </div>
            </main>


            {/* FOOTER */}
            <Footer />

        </div>



    );
}

//   export default fuel_quote_form;