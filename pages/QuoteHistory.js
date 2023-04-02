// need to fix sticky navbar and footer (make not sticky)
import Link from 'next/link';
import Footer from '../components/Footer'
import localFont from "next/font/local"
import {useState, useEffect} from 'react'
import React from 'react';
import {useSession} from 'next-auth/react'
import router from 'next/router'
const barlow = localFont({
    src: "../public/fonts/Barlow-Regular.ttf",
    weight: '200'
})



export default function quote_history() {
    const [quoteHistory, setQuoteHistory] = useState([]);
    const {data: session, status} = useSession();

    useEffect(() => {
        fetch('http://localhost:3000/api/getQuoteHistory')
        .then(res => res.json())
        .then(data => {
            setQuoteHistory(data);
        })
    }, [])
    if(typeof window !== "undefined" && status === "unauthenticated") {
        router.push("/LoginPage")
        return;
      }
    return (
        <div className={barlow.className}>
        <div className= "flex flex-col min-h-screen justify-between">
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
                <Link href="/QuoteForm"><span>QUOTE</span></Link>
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


        {/* QUOTE FORM */}
        <main className="flex-grow flex justify-center py-10 bg-gray-100">
            <div className="px-4 py-6 bg-white max-w-[80%] shadow-lg mx-auto my-auto sm:rounded-sm">
                <h3 className="text-2xl font-bold text-center">Fuel Quote History</h3>
                
                <div className="relative max-w-5xl overflow-x-auto mt-6 px-4">
                <table className="table-auto w-full text-center">
                    <thead className="text uppercase bg-dark_grey">
                        <tr className='border border-dark_grey'>
                            <th scope="col" className=" px-4 py-2">
                                Delivery Date
                            </th>
                            <th scope="col" className=" px-4 py-2">
                                Address 1
                            </th>
                            <th scope="col" className=" px-4 py-2">
                                Address 2
                            </th>
                            <th scope="col" className=" px-4 py-2">
                                City
                            </th>
                            <th scope="col" className=" px-4 py-2">
                                State
                            </th>
                            <th scope="col" className=" px-4 py-2">
                                Zip
                            </th>
                            <th scope="col" className=" px-4 py-2">
                                Gallons
                            </th>
                            <th scope="col" className=" px-4 py-2">
                                Price/Gal
                            </th>
                            <th scope="col" className=" px-4 py-2">
                                Total Cost
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {quoteHistory.map((quote, ) => (
                            <tr className="flex-grow bg-white">
                                <td className="border px-4 py-2">{quote.deliveryDate}</td>
                                <td className="border px-4 py-2">{quote.address1}</td>
                                <td className="border px-4 py-2">{quote.address2}</td>
                                <td className="border px-4 py-2">{quote.city}</td>
                                <td className="border px-4 py-2">{quote.state}</td>
                                <td className="border px-4 py-2">{quote.zipCode}</td>
                                <td className="border px-4 py-2">{quote.gallonsRequested.toFixed(2)}</td>
                                <td className="border px-4 py-2">${quote.pricePerGallon.toFixed(2)}</td>
                                <td className="border px-4 py-2">${quote.totalAmountDue.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>

                
    
                   
          </div>
        </main>


        {/* FOOTER */}
        {/* add conditional button stuff later */}
        
        <Footer />

      </div>
      </div>
      


    );
  }


  /* <tr className="bg-white border-b border-dark_grey">
                            <td scope="row" className=" px-4 py-2 whitespace-nowrap">
                               mm/dd/yyyy
                            </td>
                            <td className=" px-4 py-2">
                                5098 Jacksonville Rd
                            </td>
                            <td className=" px-4 py-2">
                                Apt 1960
                            </td>
                            <td className=" px-4 py-2">
                                Houston
                            </td>
                            <td className=" px-4 py-2">
                                TX
                            </td>
                            <td className=" px-4 py-2">
                                77034
                            </td>
                            <td className=" px-4 py-2">
                                $2.80
                            </td>
                            <td className=" px-4 py-2">
                                $280.00
                            </td>
                        </tr>
                        <tr className="bg-white border-b border-dark_grey">
                            <td scope="row" className=" px-4 py-2 whitespace-nowrap">
                               mm/dd/yyyy
                            </td>
                            <td className=" px-4 py-2">
                                5098 Jacksonville Rd
                            </td>
                            <td className=" px-4 py-2">
                                Apt 1960
                            </td>
                            <td className=" px-4 py-2">
                                Houston
                            </td>
                            <td className=" px-4 py-2">
                                TX
                            </td>
                            <td className=" px-4 py-2">
                                77034
                            </td>
                            <td className=" px-4 py-2">
                                $2.80
                            </td>
                            <td className=" px-4 py-2">
                                $280.00
                            </td>
                        </tr>
                        <tr className="bg-white border-b border-dark_grey">
                            <td scope="row" className=" px-4 py-2 whitespace-nowrap">
                               mm/dd/yyyy
                            </td>
                            <td className=" px-4 py-2">
                                5098 Jacksonville Rd
                            </td>
                            <td className=" px-4 py-2">
                                Apt 1960
                            </td>
                            <td className=" px-4 py-2">
                                Houston
                            </td>
                            <td className=" px-4 py-2">
                                TX
                            </td>
                            <td className=" px-4 py-2">
                                77034
                            </td>
                            <td className=" px-4 py-2">
                                $2.80
                            </td>
                            <td className=" px-4 py-2">
                                $280.00
                            </td>
                        </tr>
                        <tr className="bg-white border-b border-dark_grey">
                            <td scope="row" className=" px-4 py-2 whitespace-nowrap">
                               mm/dd/yyyy
                            </td>
                            <td className=" px-4 py-2">
                                5098 Jacksonville Rd
                            </td>
                            <td className=" px-4 py-2">
                                Apt 1960
                            </td>
                            <td className=" px-4 py-2">
                                Houston
                            </td>
                            <td className=" px-4 py-2">
                                TX
                            </td>
                            <td className=" px-4 py-2">
                                77034
                            </td>
                            <td className=" px-4 py-2">
                                $2.80
                            </td>
                            <td className=" px-4 py-2">
                                $280.00
                            </td>
                        </tr>
                        <tr className="bg-white border-b border-dark_grey">
                            <td scope="row" className=" px-4 py-2 whitespace-nowrap">
                               mm/dd/yyyy
                            </td>
                            <td className=" px-4 py-2">
                                5098 Jacksonville Rd
                            </td>
                            <td className=" px-4 py-2">
                                Apt 1960
                            </td>
                            <td className=" px-4 py-2">
                                Houston
                            </td>
                            <td className=" px-4 py-2">
                                TX
                            </td>
                            <td className=" px-4 py-2">
                                77034
                            </td>
                            <td className=" px-4 py-2">
                                $2.80
                            </td>
                            <td className=" px-4 py-2">
                                $280.00
                            </td>
                        </tr> */