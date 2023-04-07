import Link from "next/link";
import Head from "next/head";
import Footer from "../components/Footer";
import localFont from "next/font/local";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";

const barlow = localFont({
  src: "../public/fonts/Barlow-Regular.ttf",
  weight: "200",
});

export default function register_page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    //make sure to remove any old borders and error messages
    const emailBox = document.getElementById("email");
    const passwordBox = document.getElementById("password");
    const confirmPasswordBox = document.getElementById("confirmPassword");
    const msg = document.getElementById("errorMessage");
    emailBox.style.border = "";
    passwordBox.style.border = "";
    confirmPasswordBox.style.border = "";
    msg.textContent = "";

    //VALIDATIONS
    // if email, password, and conform password are all empty
    if (email.length == 0 && password.length == 0 && confirmPassword.length == 0) {
      const emailBox = document.getElementById("email");
      const passwordBox = document.getElementById("password");
      const confirmPasswordBox = document.getElementById("confirmPassword");
      const msg = document.getElementById("errorMessage");
      emailBox.style.border = "2px solid red";
      passwordBox.style.border = "2px solid red";
      confirmPasswordBox.style.border = "2px solid red";
      msg.textContent = "Fields cannot be empty";
      return;
    }

    if (email.length != 0) {
      if (/^\S+@\S+$/i.test(email) == false) {
        const emailBox = document.getElementById("email");
        const msg = document.getElementById("errorMessage");
        emailBox.style.border = "2px solid red";
        msg.textContent = "Invalid email";
        return;
      }
    } else {
      const emailBox = document.getElementById("email");
      const msg = document.getElementById("errorMessage");
      emailBox.style.border = "2px solid red";
      msg.textContent = "Email cannot be empty";
      return;
    }

    if (password.length != 0) {
      if (password != confirmPassword) {
        const passwordBox = document.getElementById("password");
        const confirmPasswordBox = document.getElementById("confirmPassword");
        const msg = document.getElementById("errorMessage");
        passwordBox.style.border = "2px solid red";
        confirmPasswordBox.style.border = "2px solid red";
        msg.textContent = "Passwords do not match";
        return;
      }
    } else {
      const passwordBox = document.getElementById("password");
      const confirmPasswordBox = document.getElementById("confirmPassword");
      const msg = document.getElementById("errorMessage");
      passwordBox.style.border = "2px solid red";
      confirmPasswordBox.style.border = "2px solid red";
      msg.textContent = "Password cannot be empty";
      return;
    }

    console.log("submitting");
    const data = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      }),
    });

    if (data.status == 422) {
      const emailBox = document.getElementById("email");
      const msg = document.getElementById("errorMessage");
      emailBox.style.border = "2px solid red";
      msg.textContent = "User already exists";
      return;
    } else if (data.status == 404) {
      const msg = document.getElementById("errorMessage");
      msg.textContent = "Fields cannot be empty";
      return;
    }

    const res = await data.json();
    const status1 = await signIn("credentials", {
      email: email,
      password: password,
      callbackUrl: "/ProfilePage",
    });

  };

  return (
    <div className={barlow.className}>
      <Head>
        <title>Fuel Quoter: Create an Account</title>
        <link rel="icon" href="/register.ico" />
      </Head>
      <div className="flex flex-col min-h-screen bg-gray-100">
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
              <Link href="/LoginPage"> LOGIN </Link>
            </li>
          </ul>
        </nav>

        {/* LOGIN FORM */}
        <div className=" flex flex-col px-8 py-6 text-left bg-white shadow-lg m-auto w-1/4 justify-center">
          <h3 className="text-2xl font-bold text-center"> Create an Account </h3>
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <div>
                <label className="block" htmlFor="email"> Email </label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} id="email" type="text" placeholder="Email" className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
              </div>

              <div className="mt-4">
                <label className="block" htmlFor="password"> Password </label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} id="password" type="password" placeholder="Password" className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
              </div>

              <div className="mt-4">
                <label className="block" htmlFor="confirmPassword"> Confirm Password </label>
                <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} id="confirmPassword" type="password" placeholder="Confirm Password" className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
              </div>

              <div>
                <span className="text-red mb-4" id="errorMessage"></span>
              </div>

              <button type="submit" className="block px-6 py-2 mt-6 mx-auto text-beige bg-light_blue rounded-md hover:bg-light_blue/75 hover:text-beige"> Register </button>
            
            </div>
          </form>
        </div>

        {/* FOOTER */}
        <Footer />
      </div>
    </div>
  );
}
