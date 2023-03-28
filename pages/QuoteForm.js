// need to fix sticky navbar and footer (make not sticky)
import Link from 'next/link';
import Footer from '../components/Footer'
import localFont from "next/font/local"
import {useState , useEffect} from 'react'

const barlow = localFont({
    src: "../public/fonts/Barlow-Regular.ttf",
    weight: '200'
})
  
export default function fuel_quote_form() {
    const [userData, setUserData] = useState([]);
    const [gallonsRequested, setGallonsRequested] = useState('');
    const [deliveryDate, setDeliveryDate] = useState('');
    useEffect(() => {
        fetch('http://localhost:3000/api/getProfilePage', {
            method: "GET"
            })
            .then(res => res.json())
            .then(data => {
                setUserData(data);
            })
    }, [])

    const handleSubmit = (e) => {
        console.log("submitting")
        e.preventDefault();
        //call some function or backend API route to calculate the price
        //then set the price to the state
        //make sure to also display the price on the frontend
        //and to enable the submit button

        //remove the disabled attribute from the order now button
        document.getElementById("quotePriceButton").disabled = false;
        document.getElementById("quotePrice").value = Math.floor(Math.random()*1000 + 100)
    }
    return (
        <div className={barlow.className}>
        <div className="flex flex-col min-h-screen bg-gray-100">
            <header>
                {/* TOP BAR */}
                <nav className="relative flex w-full items-center font-bold text-4xl text-beige bg-light_blue shadow-md h-14">
                <div className="ml-6">
                    FUEL QUOTER
                </div>
                <ul className="ml-auto left-0 right-0 top-full inline-flex">
                    <li className="flex mr-6 items-center">
                        <Link href="/"><span>HOME</span></Link>
                    </li>
                    <li className="flex mr-6 items-center">
                        <Link href="/QuoteHistory"><span>HISTORY</span></Link>
                    </li>
                    <li className="flex mr-6 items-center">
                        <Link href="/ProfilePage"><span>PROFILE</span></Link>
                    </li>
                    <li className="flex mr-6 items-center">
                        <Link href="/HomePage"><span>LOGOUT</span></Link>
                    </li>
                </ul>
                </nav>
            </header>


        <main className="flex-grow flex items-center justify-center">
        {/* QUOTE FORM */}
            <div className="flex justify-center items-center">
                <div className="flex bg-white shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-[80%] flex-col">
                    {/* Title */}
                    <div className="flex-col flex w-full py-2.5 px-4 justify-center items-center">
                        <div>
                            <h1 className="font-bold text-2xl mt-4 mb-2 text-center">Get a Fuel Quote!</h1>
                        </div>
                        <div>
                            <span className='text-center'>Get a quote by checking your info, filling out the rest of the form, and click 
                            <span className="text-light_blue"> Get Quote </span> below to see your suggested quote on the right. </span>
                        </div>
                    </div>
                    <hr className="border-black mt-2 mx-16"></hr>

                    <div className="flex w-full justify-center px-4 py-6">    
                        {/* left */}
                        <div className="w-full px-4 lg:w-1/2 border-r border-dark_grey">
                            <div>
                                <label className="block font-bold">Address 1</label>
                                <input disabled type="text" value={userData.address1} placeholder="Address 1" className="w-full px-4 py-2.5 mt-1 border rounded-md" />
                            </div>
                            <div className="mt-4">
                                <label className="block font-bold mt-4">Address 2</label>
                                <input disabled type="text" value={userData.address2} placeholder="Address 2 (optional)" className="w-full px-4 py-2.5 mt-1 border rounded-md" />
                            </div>
                            <div className="mt-4">
                                <div className="flex flex-col sm:flex-row">
                                    <div className="relative flex-initial sm:w-1/2">
                                        <label className="block font-bold">City</label>
                                        <input disabled type="text" value={userData.city} placeholder="City" name="billing-address" className="w-full px-4 py-2.5 mt-1 border rounded-md" />
                                    </div>
                                    <div className="relative flex-initial sm:w-1/4 mx-1">
                                        <label className="block font-bold">State</label>
                                        <input disabled type="text" value={userData.state} placeholder="State" name="billing-state" className="w-full px-4 py-2.5 mt-1 border rounded-md"/>
                                    </div>
                                    <div className="relative flex-initial sm:w-1/4">
                                        <label className="block font-bold ">Zip</label>
                                        <input disabled type="text" value={userData.zipCode} placeholder="ZIP" name="billing-zip" className="w-full px-4 py-2.5 mt-1 border rounded-md" />
                                    </div>
                                </div>
                                <span className="text-sm mt-2 justify-center"> 
                                Not the right address? Change it on your profile <Link href="/ProfilePage" className="text-light_blue underline hover:font-bold">here</Link>!
                                </span>
                            </div>
                        </div>

                        {/* middle */}
                        <div className="w-full px-4 lg:w-1/4 justify-center">
                        <form onSubmit={handleSubmit}>
                            <div className='mb-4'>
                                <label className='"block font-bold'>Delivery Date</label>
                                <input type="date" value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} className="w-full px-4 py-2.5 mt-1 border rounded-md" required/>

                                <label className="mt-4 block font-bold">Gallons Requesting</label>
                                <input type="number" value={gallonsRequested} onChange={(e) => setGallonsRequested(e.target.value)} step="0.01" placeholder="0.00" className="w-full px-4 py-2.5 mt-1 border rounded-md" required/>
                            </div>
                        
                            <button type="submit" className="block w-1/2 py-2.5 mt-4 mx-auto text-light_blue border border-light_blue rounded-lg hover:outline-double">
                                Get Quote
                            </button>
                        </form>         
                        </div>

                        {/* right */}
                        <div className="w-full px-4 lg:w-1/4 justify-center">
                            {/* will enable this text box once user has requested a quote */}
                        <form>
                            <div className="mb-4">
                                <label className="block font-bold">Price Per Gallon</label>
                                <div className="flex">
                                    <span className="inline-flex items-center px-4 py-2.5 mt-1 border-r-none border rounded-l-md"> $ </span>
                                    <input id="pricePerGallon" type="number" placeholder="0.00" className="w-full px-4 py-2.5 mt-1 border rounded-r-md" disabled/>
                                </div>
                            </div>
                            <div className='mt-4'>
                                <label className="block mt-4 font-bold">Suggested Quote</label>
                                <div className="flex">
                                    <span className="inline-flex items-center px-4 py-2.5 mt-1 border-r-none border rounded-l-md"> $ </span>
                                    <input id="quotePrice" type="number" placeholder="0.00" className="w-full px-4 py-2.5 mt-1 border rounded-r-md" disabled/>
                                </div>
                            </div>
                            <button id="quotePriceButton" className="block w-1/2 py-2.5 mt-4 mx-auto bg-light_blue rounded-lg text-beige hover:bg-light_blue/75 hover:text-beige" disabled>
                                Order Now
                            </button>
                        </form>          
                        </div>

                    </div>


                </div>
            </div>
        </main>


        {/* FOOTER */}
        {/* add conditional button stuff later */}
        <Footer/>

        </div>
        </div>
      
    );
  }
