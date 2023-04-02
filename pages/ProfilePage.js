import Link from 'next/link';
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
                console.log("data in the front end")
                console.log(data)
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
            <div className="flex flex-col h-screen justify-between bg-gray-100">
                <header>
                    {/* TOP BAR */}
                    <nav className="relative flex w-full items-center font-bold text-4xl text-beige bg-light_blue shadow-md h-14">
                        <div className="ml-6">
                          <Link href="/">FUEL QUOTER</Link>
                        </div>
                        <ul className="ml-auto left-0 right-0 top-full inline-flex">
                            <li className="flex mr-6 items-center hover:underline">
                                <Link href="/">HOME</Link>
                            </li>
                            <li className="flex mr-6 items-center hover:underline">
                                <Link href="/QuoteForm">QUOTE</Link>
                            </li>
                            <li className="flex mr-6 items-center hover:underline">
                                <Link href="/QuoteHistory">HISTORY</Link>
                            </li>
                            <li className="flex mr-6 items-center hover:underline">
                              <button onClick={signOut}>LOGOUT</button>
                            </li>
                        </ul>
                    </nav>
                </header>
                
                {/* QUOTE FORM */}
                <main className="flex-grow flex justify-center py-10 bg-gray-100">
                    <div className="flex-initial w-96  px-8 py-6 bg-white shadow-lg mx-auto my-auto">
                        <h3 className="text-2xl font-bold text-center">Profile</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mt-3">
                                <div>
                                    <label className="block" htmlFor="First Name">First Name</label>
                                    <input type="text" value={firstName} placeholder="First Name" maxLength="50" 
                                    className="w-full px-5 py-2 mt-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" onChange={(e) => setFirstName(e.target.value)} required />
                                </div>
                                <div className="mt-3">
                                    <label className="block">Last Name</label>
                                    <input type="text" value={lastName} placeholder="Last Name" maxLength="50" 
                                    className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" onChange={(e) => setLastName(e.target.value)} required />
                                </div>
                                <div className="mt-3">
                                    <label className="block">Address 1</label>
                                    <input type="text" value={address1} placeholder="Address 1" maxLength="100" 
                                    className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" onChange={(e) => setAddress1(e.target.value)} required />
                                </div>
                                <div className="mt-3">
                                    <label className="block">Address 2 (optional)</label>
                                    <input type="text" value={address2} placeholder="Address 2" maxLength="100" 
                                    className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" onChange={(e) => setAddress2(e.target.value)}/>
                                </div>
                                <div className="mt-3">
                                    <label className="block">City</label>
                                    <input type="text" value={city} placeholder="City" maxLength="100" 
                                    className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" onChange={(e) => setCity(e.target.value)} required />
                                </div>
                                {/* add state in database portion to include dropdown with 2 STATE code that is stored in database */}
                                <div className="mt-3">
                                    <label className="block">State</label>
                                    <select required placeholder="State" value={state} className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" 
                                      onChange={(e) => setState(e.target.value)}>
                                      {states.map((state, index) => 
                                        // show both state and abbreviation
                                        <option key={index} value={statesAbbrev[index]}>{statesAbbrev[index]} - {state} </option>
                                      )}
                                    </select>
                                </div>
                                <div className="mt-3">
                                    <label className="block">Zip Code</label>
                                    <input type="text" placeholder="Zip Code" minLength="5" maxLength="9" value={zipCode} className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" onChange={(e) => setZip(e.target.value)} required />
                                </div>

                                <div className="md:flex items-center justify-center mt-6 mx-auto">
                                    <button type="submit" data-testid="update-button" className="block w-1/2 py-2 mt-4 mx-auto text-beige bg-light_blue rounded-lg hover:bg-light_blue/75 hover:text-beige">Update</button>
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