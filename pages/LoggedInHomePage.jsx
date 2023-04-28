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
  const [profileSet, setProfileSet] = useState(false);

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
        setUserData(data);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/api/UserCredentials", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setProfileSet(data.profileSet);
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


        <main className="flex flex-row justify-between items-center mx-6 my-6 bg-gray-100">
          {/* left */}
          <div className="flex justify-center items-center w-3/5 my-6 h-full">
            <div className="flex flex-col w-full justify-center items-center bg-white px-16 py-6 mx-6 my-6 h-full shadow-lg">
              <h1 className="text-2xl font-bold"> What is the Fuel Quoter?</h1>
              <hr className="border-gray-400 my-4 w-4/5 text-center"></hr>
              <p className="text-justify leading-6"> 
              Fuel Quoter is a user-friendly software application designed to provide clients with reliable, accurate, and timely predictions of fuel rates.
              Using a client's location, the amount of fuel they are requesting, and company profit margin, we generate a personalized quote for each client.
              </p>
              <p className="text-left leading-6 mt-2">
              Whether you are a new customer looking to establish a relationship or an existing customer seeking competitive pricing, Fuel Quoter is an essential tool for all your fuel rate prediction needs.
              </p>
              <div className="w-1/2">
                  <Link href="/QuoteForm">
                    <button className="w-full py-4 mt-8 text-2xl font-bold text-beige bg-light_blue rounded-md hover:bg-light_blue/75 hover:text-beige">
                     Make a Quote!
                    </button>
                  </Link>
                </div>
            </div>
          </div>
          {/* right half */}
          <div className="flex flex-col justify-between items-center w-2/5 mx-6 h-full">
            {/* top right */}
            <div className="flex flex-col w-full justify-center items-center bg-white h-60 px-6 py-4 mb-4 mx-6 space-x-2 shadow-lg">
              <h1 className="text-xl font-bold mt-4 text-center"> Profile Overview</h1>
              <hr className="border-gray-400 my-2.5 w-4/5 text-center"></hr>
              {profileSet ? (
              <div className="w-full text-left">
                <div className="flex flex-row w-full">
                  <div className="w-1/5"></div>
                  <div className="text-light_blue w-1/5">Name:</div>
                  <div className="text-black items-center justify-center px-2 w-3/5"> {userData.firstName + " " + userData.lastName} </div>
                </div>
                <div className="flex flex-row w-full">
                  <div className="w-1/5"></div>
                  <div className="text-light_blue w-1/5">Address:</div>
                  <div className=" flex-col flex w-3/5">
                    <div className="text-black items-center justify-center px-2"> {userData.address1} </div>
                    <div className="text-black items-center justify-center px-2"> {userData.address2} </div>
                    <div className="text-black items-center justify-center px-2">
                      {userData.city + ", " + userData.state + ", " + userData.zipCode}
                    </div>
                  </div>
                </div>
                <div className="flex-grow flex justify-center items-center">
                  <Link href="/ProfilePage">
                    <button className="px-6 py-2 mt-4 mb-4 font-semibold text-light_blue border border-light_blue rounded-md hover:ring-1 hover:ring-light_blue">
                      View / Edit Profile
                    </button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex-grow flex justify-center items-center">
                <span className="text-gray-400 text-center items-center justify-center px-2 mb-4">
                  <i>You have not finished setting up your profile!</i><br></br>
                  Click <Link href="/ProfilePage" className="text-light_blue underline hover:font-bold" > here</Link>
                  &nbsp;to finish setting up your profile.
                </span>
              </div>
            )}
            </div>

            {/* bottom right */}
            <div className="flex-grow flex flex-col w-full justify-center items-center bg-white h-72 px-6 py-4 mt-4 mx-6 space-x-2 shadow-lg">
              <h1 className="text-xl font-bold mt-4 text-center"> Your Last Quote </h1>
              <hr className="border-gray-400 my-2.5 w-4/5 text-center"></hr>
              {quoteHistory.length != 0 ? (
              <div className="w-full text-left">
                <div className="flex flex-row w-full items-center justify-center">
                  <div className="w-[5%]"></div>
                  <span className="text-light_blue w-[35%] px-2">Delivery Date:</span>
                  <span className="text-black items-center justify-center px-2 w-[60%]"> {quoteHistory.deliveryDate} </span>
                </div>
                <div className="flex flex-row w-full items-center justify-center">
                  <div className="w-[5%]"></div>
                  <span className="text-light_blue w-[35%] px-2"> Address:</span>
                  <span className="text-black items-center justify-center px-2 w-[60%]">
                      {quoteHistory.city + ", " + quoteHistory.state + ", " + quoteHistory.zipCode}
                  </span>
                </div>
                <div className="flex flex-row w-full items-center justify-center">
                  <div className="w-[5%]"></div>
                  <span className="text-light_blue w-[35%] px-2"> Gallons Requested:</span>
                  <div className="text-black items-center justify-center px-2 w-[60%]"> {quoteHistory.gallonsRequested} </div>
                </div>
                <div className="flex flex-row w-full items-center justify-center">
                  <div className="w-[5%]"></div>
                  <span className="text-light_blue w-[35%] px-2"> Price / Gallon:</span>
                  <div className="text-black items-center justify-center px-2 w-[60%]"> ${quoteHistory.pricePerGallon} </div>
                </div>
                <div className="flex flex-row w-full items-center justify-center">
                  <div className="w-[5%]"></div>
                  <span className="text-light_blue w-[35%] px-2"> Total Cost: </span>
                  <div className="text-black items-center justify-center px-2 w-[60%]"> ${quoteHistory.totalAmountDue} </div>
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
                    <i>You have not made any quotes!</i>
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