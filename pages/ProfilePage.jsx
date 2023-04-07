import Link from 'next/link';
import Head from 'next/head';
import Footer from '../components/Footer'
import localFont from "next/font/local"
import {useSession, signOut} from 'next-auth/react'
import router from 'next/router'
import { useState, useEffect } from 'react'
import React from 'react';

var UsaStates = require('usa-states').UsaStates;
var usStates = new UsaStates();
var states = usStates.arrayOf('names');
var statesAbbrev = usStates.arrayOf('abbreviations');

const barlow = localFont({
    src: "../public/fonts/Barlow-Regular.ttf",
    weight: '200'
})

export default function profile_page() {
    const { data : session, status } = useSession();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZip] = useState('');
    useEffect(() => {
        fetch('http://localhost:3000/api/getProfilePage', {
            method: "GET"
        })
            .then(res => res.json())
            .then(data => {
                if(data !== null){
                    setFirstName(data.firstName);
                    setLastName(data.lastName);
                    setAddress1(data.address1);
                    setAddress2(data.address2);
                    setCity(data.city);
                    setState(data.state);
                    setZip(data.zipCode);
                }
            })
    }, [])
    if(typeof window !== "undefined" && status === "unauthenticated") {
        router.push("/LoginPage")
        return;
      }
    const handleSubmit = async (e) => {
        //ADD VALIDATION
        console.log("submitting")
        e.preventDefault();
        if (!state) {
          console.log('Please select a state');
          return;
        }
        const data = await fetch('http://localhost:3000/api/getProfilePage', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                address1: address1,
                address2: address2,
                city: city,
                state: state,
                zipCode: zipCode
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data.message);
                router.push("/")
            })    
    }

    return (
        <div className={barlow.className}>
          <Head>
            <title>Fuel Quoter: Profile</title>
            <link rel="icon" href="/profile.ico" />
          </Head>
          <div className="flex flex-col min-h-screen h-screen justify-between bg-gray-100 overflow-auto">
              <header>
                  {/* TOP BAR */}
                  <nav className="relative flex w-full items-center font-bold text-4xl text-beige bg-light_blue shadow-md h-16">
                      <div className="ml-8">
                        <Link href="/">FUEL QUOTER</Link>
                      </div>
                      <ul className="ml-auto left-0 right-0 top-full inline-flex">
                          <li className="flex mr-8 items-center hover:underline">
                              <Link href="/">HOME</Link>
                          </li>
                          <li className="flex mr-8 items-center hover:underline">
                              <Link href="/QuoteForm">QUOTE</Link>
                          </li>
                          <li className="flex mr-8 items-center hover:underline">
                              <Link href="/QuoteHistory">HISTORY</Link>
                          </li>
                          <li className="flex mr-8 items-center hover:underline">
                            <button onClick={signOut}>LOGOUT</button>
                          </li>
                      </ul>
                  </nav>
              </header>
              
              {/* QUOTE FORM */}
              <main className="flex-grow flex items-center justify-center">
                  <div className="flex bg-white shadow-lg overflow-hidden mx-auto px-6 py-8 w-2/5 flex-col">
                      <h3 className="text-2xl font-bold text-center mb-2">Your Profile</h3>
                      <span className='mx-auto px-6 text-center text-sm'>You <b>must</b> create a profile first to get a quote and view other pages. Need to change your address? You can always edit it later.</span>
                      <hr className="justify center items-center border-black mt-2 w-4/5 mx-auto"></hr>
                      <form onSubmit={handleSubmit}>
                          <div className="mt-4">
                              <div className="mt-4 flex flex-row px-4">
                                <div className='pr-3 w-1/2'>
                                    <label className="block font-bold" htmlFor="First Name">First Name</label>
                                    <input type="text" value={firstName} placeholder="First Name" maxLength="50" 
                                    className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" onChange={(e) => setFirstName(e.target.value)} required />
                                </div>
                                <div className="pl-3 w-1/2">
                                    <label className="block font-bold">Last Name</label>
                                    <input type="text" value={lastName} placeholder="Last Name" maxLength="50" 
                                    className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" onChange={(e) => setLastName(e.target.value)} required />
                                </div>
                              </div>

                              <div className="mt-4 mx-4">
                                  <label className="block font-bold">Address 1</label>
                                  <input type="text" value={address1} placeholder="Address 1" maxLength="100" 
                                  className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" onChange={(e) => setAddress1(e.target.value)} required />
                              </div>
                              <div className="mt-4 mx-4">
                                  <label className="block font-bold">Address 2 <span className='font-normal'>- <i>(optional)</i></span></label>
                                  <input type="text" value={address2} placeholder="Address 2" maxLength="100" 
                                  className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" onChange={(e) => setAddress2(e.target.value)}/>
                              </div>

                              <div className="mt-4 flex flex-row mx-4">
                                <div className="w-2/5 pr-4">
                                    <label className="block font-bold">City</label>
                                    <input type="text" value={city} placeholder="City" maxLength="100" 
                                    className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" onChange={(e) => setCity(e.target.value)} required />
                                </div>
                                {/* add state in database portion to include dropdown with 2 STATE code that is stored in database */}
                                <div className="w-2/5 pr-4">
                                    <label className="block font-bold">State</label>
                                    <select required value={state} className="w-full pl-4 pr-2 py-2.5 mt-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" 
                                      onChange={(e) => setState(e.target.value)}>
                                      <option value="" disabled selected>Select a State</option>
                                      {states.map((state, index) => 
                                        // show both state and abbreviation
                                        <option key={index} value={statesAbbrev[index]}>{statesAbbrev[index]} - {state} </option>
                                      )}
                                    </select>
                                </div>
                                <div className="w-1/4">
                                    <label className="block font-bold">Zip Code</label>
                                    <input type="text" placeholder="Zip Code" minLength="5" maxLength="9" value={zipCode} className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" onChange={(e) => setZip(e.target.value)} required />
                                </div>
                              </div>

                              <div className="md:flex items-center justify-center mt-4 mx-auto">
                                  <button type="submit" data-testid="update-button" className="block w-1/3 py-2 mt-4 mx-auto text-beige bg-light_blue rounded-lg hover:bg-light_blue/75 hover:text-beige">Submit</button>
                              </div>
                          </div>
                      </form>
                  </div>
              </main>

              {/* FOOTER */}
              <Footer />

          </div>
        </div>


    );
}

//   export default fuel_quote_form;