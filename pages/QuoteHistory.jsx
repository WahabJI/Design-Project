// need to fix sticky navbar and footer (make not sticky)
import Link from "next/link";
import Head from "next/head";
import Footer from "../components/Footer";
import localFont from "next/font/local";
import { useState, useEffect } from "react";
import React from "react";
import { useSession, signOut } from "next-auth/react";
import router from "next/router";
const barlow = localFont({
  src: "../public/fonts/Barlow-Regular.ttf",
  weight: "200",
});

export default function quote_history() {
  const [quoteHistory, setQuoteHistory] = useState([]);
  const { data: session, status } = useSession();

  useEffect(() => {
    fetch("http://localhost:3000/api/getQuoteHistory")
      .then((res) => res.json())
      .then((data) => {
        setQuoteHistory(data);
      });
  }, []);
  if (typeof window !== "undefined" && status === "unauthenticated") {
    router.push("/LoginPage");
    return;
  }
  return (
    <div className={barlow.className}>
      <Head>
        <title>Fuel Quoter: Quote History</title>
        <link rel="icon" href="/history.ico" />
      </Head>
      <div className="flex flex-col min-h-screen h-screen justify-between bg-gray-100 overflow-auto">
        <header>
          {/* TOP BAR */}
          <nav className="relative flex w-full items-center font-bold text-4xl text-beige bg-light_blue shadow-md h-16">
            <div className="ml-8">
              <Link href="/"> FUEL QUOTER </Link>
            </div>
            <ul className="ml-auto left-0 right-0 top-full inline-flex">
              <li className="flex mr-8 items-center hover:underline">
                <Link href="/"> HOME </Link>
              </li>
              <li className="flex mr-8 items-center hover:underline">
                <Link href="/QuoteForm"> QUOTE </Link>
              </li>
              <li className="flex mr-8 items-center hover:underline">
                <Link href="/ProfilePage"> PROFILE </Link>
              </li>
              <li className="flex mr-8 items-center hover:underline">
                <button onClick={signOut}>LOGOUT</button>
              </li>
            </ul>
          </nav>
        </header>

        {/* QUOTE FORM */}
        <main className="flex-grow flex justify-center py-10 bg-gray-100">
          <div className="px-4 py-6 bg-white max-w-[90%] shadow-lg mx-auto my-auto sm:rounded-sm">
            <h3 className="text-2xl font-bold text-center"> Fuel Quote History </h3>
            <div className="relative max-w-5xl overflow-x-auto mt-4 px-4">
              <table className="table-auto w-full text-center mb-4">
                <thead className="text bg-dark_grey">
                  <tr className="border border-dark_grey">
                    <th scope="col" className="px-4 py-2">
                      <div className="flex items-center">
                        Delivery Date 
                        <a href="#">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512">
                            <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/>
                          </svg>
                        </a>                      
                      </div>
                    </th>
                    <th scope="col" className=" px-4 py-2"> Address 1 </th>
                    <th scope="col" className=" px-4 py-2"> Address 2 </th>
                    <th scope="col" className=" px-4 py-2"> City </th>
                    <th scope="col" className=" px-4 py-2"> State </th>
                    <th scope="col" className=" px-4 py-2"> Zip </th>
                    <th scope="col" className=" px-4 py-2"> 
                      <div className="flex items-center">
                        Gallons 
                        <a href="#">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512">
                            <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/>
                          </svg>
                        </a>
                      </div>
                    </th>
                    <th scope="col" className=" px-4 py-2"> 
                      <div className="flex items-center">
                        Price/Gal
                        <a href="#">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512">
                            <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/>
                          </svg>
                        </a> 
                      </div>
                    </th>
                    <th scope="col" className="px-4 py-2"> 
                      <div className="flex justify-center items-center">
                        Total Cost 
                        <a href="#">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512">
                            <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/>
                          </svg>
                        </a> 
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                {quoteHistory.length != 0 ? (  
                  <>              
                 {quoteHistory.map((quote) => (
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
                  </>
                ) : (
                  <tr className="flex-grow bg-white">
                    <td className="border px-4 py-2 h-20 text-gray-400" colSpan={9}><i>No Quotes Found</i></td>
                  </tr>
                )}

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
