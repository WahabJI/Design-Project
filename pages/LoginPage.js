import React from 'react';
import Link from 'next/link';
import Footer from '../components/Footer'
import { useSession, signIn, signOut } from 'next-auth/react'
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/router';
import {useFormik} from 'formik';
import localFont from "next/font/local"

const barlow = localFont({
  src: "../public/fonts/Barlow-Regular.ttf",
  weight: '200'
})

export default function login_page() {
    const formik = useFormik({
      initialValues:{
        email: '',
        password: ''
      },
      onSubmit: onSubmit
      })
    const router = useRouter();

    async function HandleGoogleSignIn() {
        signIn('google', { callbackUrl: 'http://localhost:3000' })
    }
    
    async function onSubmit(values){
      const status = await signIn('credentials', {
        email: values.email,
        password: values.password,
        callbackUrl: '/'
      })

      if(status.ok){
        router.push(status.url)
      }
      else{
        alert("Invalid email or password")
      }
    }

    return (
      <div className={barlow.className}>
        <div className="flex flex-col min-h-screen bg-gray-100">
        {/* TOP BAR */}
        <nav className="flex absolute w-full items-center font-bold text-4xl text-beige bg-light_blue h-14">
          <div className="ml-4">
            FUEL QUOTER
          </div>
          <ul className="ml-auto left-0 right-0 top-full inline-flex">
            <li className="flex mr-4 items-center">
              <Link href="/LoggedInHomePage"><span>HOME</span></Link>
            </li>
            <li className="flex mr-4 items-center">
              <Link href="/RegisterPage"><span>REGISTER</span></Link>
            </li>
          </ul>
        </nav>


        {/* LOGIN FORM */}
        <div className="flex min-h-screen">
          <div className="px-8 py-6 text-left bg-white shadow-lg m-auto">
            <h3 className="text-2xl font-bold text-center">Login to your account</h3>
            <form action="" onSubmit={formik.handleSubmit}>
                <div className="mt-4">

                  <div>
                    <label className="block" htmlFor="email">Email</label>
                    <input id="email" name="email" type="text" placeholder="Email Address" className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" {...formik.getFieldProps('email')}/>
                  </div>

                  <div className="mt-4">
                      <label className="block" htmlFor="password">Password</label>
                      <input id="password" name="password" type="password" placeholder="Password" className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" {...formik.getFieldProps('password')}/>
                  </div>

                  <div className="flex items-baseline justify-between">
                      <button type="submit" className="px-6 py-2 mt-4 text-beige bg-light_blue rounded-lg hover:bg-light_blue/75 hover:text-beige">Login</button>
                      <a href="#" className="text-sm text-black hover:underline">Forgot password?</a>
                  </div>
                        
                </div>
              </form>

              <div className="flex justify-center items-center mt-4">
                <hr className="border-gray-400 border-t-2 flex-grow" />
                <span className="mx-4 text-gray-500 font-medium">Or</span>
                <hr className="border-gray-400 border-t-2 flex-grow" />
              </div>   

              <div className="flex justify-center items-center mt-4">
                <button onClick={HandleGoogleSignIn} type="button" className="w-full px-4 py-2 mt-2 text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
                  <svg className="w-4 h-4 mr-2 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                    <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                  </svg>
                  Sign in with Google
                </button>
              </div> 

            </div>
          </div>
        </div>

        {/* FOOTER */}
        <Footer/>

      </div>
    );
  }