import Link from 'next/link';
import Footer from '../components/Footer'
import localFont from "next/font/local"
import { useState, useEffect } from 'react'

const barlow = localFont({
    src: "../public/fonts/Barlow-Regular.ttf",
    weight: '200'
})

export default function register_page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        console.log("submitting")
        e.preventDefault();
        fetch('http://localhost:3000/api/auth/register', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                confirmPassword: confirmPassword
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
              <Link href="/LoginPage"><span>LOGIN</span></Link>
            </li>
          </ul>
        </nav>


        {/* LOGIN FORM */}
        <div className="flex h-screen bg-gray-100">
          <div className="px-8 py-6 text-left bg-white shadow-lg m-auto">
            <h3 className="text-2xl font-bold text-center">Login to your account</h3>
            <form onSubmit={handleSubmit}>
                <div className="mt-4">

                  <div>
                    <label className="block" htmlFor="email">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} id="email" type="text" placeholder="Email" className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"/>
                  </div>

                  <div className="mt-4">
                      <label className="block" htmlFor="password">Password</label>
                      <input value={password} onChange={(e) => setPassword(e.target.value)} id="password" type="password" placeholder="Password" className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"/>
                  </div>

                  <div className="mt-4">
                      <label className="block" htmlFor="confirmPassword">Confirm Password</label>
                      <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} id="confirmPassword" type="password" placeholder="Confirm Password" className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"/>
                  </div>

                  <div className="flex items-baseline justify-between">
                      <button type="submit" className="px-6 py-2 mt-4 text-beige bg-light_blue rounded-lg hover:bg-light_blue/75 hover:text-beige">Register</button>
                      <a href="#" className="text-sm text-black hover:underline">Forgot password?</a>
                  </div>        
                </div>
              </form>    
          </div>
        </div>


        {/* FOOTER */}
        <Footer/>

      </div>
      


    );
  }