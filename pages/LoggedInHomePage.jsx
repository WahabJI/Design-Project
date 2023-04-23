import Link from "next/link";
import Head from "next/head";
import Footer from "../components/Footer";
import localFont from "next/font/local";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import router from "next/router";
const barlow = localFont({
  src: "../public/fonts/Barlow-Regular.ttf",
  weight: "200",
});

export default function HomePage() {
  const { data: session, status } = useSession();
  const [quoteHistory, setQuoteHistory] = useState([]);
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/api/getQuoteHistory")
      .then((res) => res.json())
      .then((data) => {
        setQuoteHistory(data[0]);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/api/getProfilePage", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
                if(data !== null)
                  setUserData(data);
      });
  }, []);

  if (typeof window !== "undefined" && status === "unauthenticated") {
    router.push("/LoginPage");
    return;
  }
  return (
    <div className={barlow.className}>
      <Head>
        <title>Fuel Quoter: Get Your Fuel Fast</title>
        <link rel="icon" href="/gasPump.ico" />
      </Head>
      <div className="flex flex-col h-screen justify-between bg-gray-100 overflow-auto">
        {/* TOP BAR */}
        <header>
          <nav className="relative flex w-full items-center font-bold text-4xl text-beige bg-light_blue shadow-md h-16">
            <div className="ml-8">
              <Link href="/"> FUEL QUOTER </Link>
            </div>
            <ul className="ml-auto left-0 right-0 top-full inline-flex">
              <li className="flex mr-8 items-center hover:underline">
                <Link href="/QuoteForm"> QUOTE </Link>
              </li>
              <li className="flex mr-8 items-center hover:underline">
                <Link href="/QuoteHistory"> HISTORY </Link>
              </li>
              <li className="flex mr-8 items-center hover:underline">
                <Link href="/ProfilePage"> PROFILE </Link>
              </li>
              <li className="flex mr-8 items-center hover:underline">
                <button onClick={signOut}> LOGOUT </button>
              </li>
            </ul>
          </nav>
        </header>


        {/* LOGIN FORM */}
        <div className="flex flex-col py-16 justify-between h-screen bg-gray-100">
          <div className="px-8 py-6 text-left w-5/6 bg-white shadow-lg m-auto">
            <h3 className="text-2xl font-bold">YOUR LAST QUOTE</h3>
            <div className="flex flex-row">
              <div>
                <div className="mt-4 flex flex-row space-x-2">
                    <div className="text-light_blue">Gallons Requested:</div>
                    <div className="text-black inline-block">{"$ " + quoteHistory.gallonsRequested || "$ "+(0).toFixed(2)}</div>
                  </div>
                  <div className="flex flex-row space-x-11">
                  <div className="text-light_blue">Price / Gallon:</div>
                  <div className="text-black inline-block">{"$ " + quoteHistory.pricePerGallon || "$ "+(0).toFixed(2)}</div>
                </div>
                  <div className="flex flex-row space-x-12">
                    <div className="text-light_blue">Amount Paid:</div>
                    <div className="text-black inline-block">{"$ " + quoteHistory.totalAmountDue || "$ "+(0).toFixed(2)}</div>
                  </div>
                  
              </div>
              <div className="pl-24 pr-10">
                <div className="mt-4 flex flex-row space-x-4">
                  <div className="text-light_blue">Date Delivered:</div>
                  <div className="text-black inline-block">{quoteHistory.deliveryDate || "N/A"}</div>
                </div>
                <div className="flex flex-row space-x-8">
                  <div className="text-light_blue">Address:</div>
                  <div className="text-black inline-block px-7">{quoteHistory.address1 || "N/A"}</div>
                </div>
                <div className="flex flex-row space-x-10">
                  <div className="text-black inline-block px-28 mx-3">{quoteHistory.address2 || ""}</div>
                </div>
                <div className="flex flex-row space-x-14">
                  <div className="text-black inline-block px-28 mx-3">{(quoteHistory.city || quoteHistory.state || quoteHistory.zipCode) ? (quoteHistory.city + ", " + quoteHistory.state + ", " + quoteHistory.zipCode) : ""}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-row">
            <div className="px-8 py-6 text-left w-1/4 bg-white shadow-lg mx-auto">
              <h3 className="text-2xl font-bold">PROFILE OVERVIEW</h3>
                <div className="mt-4 flex flex-row space-x-12">
                  <div className="text-light_blue">Name:</div>
                  <div className="text-black inline-block px-1">{userData === null ? (userData.firstName + " " + userData.lastName) : "N/A"}</div>
                </div>
                <div className="flex flex-row space-x-9">
                  <div className="text-light_blue">Address:</div>
                  <div className="text-black inline-block">{userData.address1 || "N/A"}</div>
                </div>
                <div className="flex flex-row space-x-10">
                  <div className="text-black inline-block pl-24">{userData.address2 || ""}</div>
                </div>
                <div className="flex flex-row space-x-10">
                  <div className="text-black inline-block pl-24">{userData === null ? (userData.city + ", " + userData.state + ", " + userData.zipCode) : "N/A"}</div>
                </div>

                <div className="flex-grow flex justify-center items-center">
                  <Link href="/QuoteHistory">
                    <button className="px-6 py-2 mt-4 mb-4 font-semibold text-light_blue border border-light_blue rounded-md hover:ring-1 hov er:ring-light_blue">
                      View Quote History
                    </button>
                  </Link>
                </div>
              </div>
              ) : (
                <div className="flex-grow flex justify-center items-center">
                  <span className="text-gray-400 items-center justify-center px-2 mb-4">
                    <i>You have not made any quotes</i>
                  </span>
                </div>
              )}
            </div>
          </div>
          
        </main>

        {/* FOOTER */}
        <Footer />
      </div>
    </div>
  );
}
