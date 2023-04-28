// need to fix sticky navbar and footer (make not sticky)
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

export default function fuel_quote_form() {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState([]);
  const [profileSet, setProfileSet] = useState(false);
  const [gallonsRequested, setGallonsRequested] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");

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
  
  // disables button if profile is not set
  if(!profileSet && typeof window !== "undefined"){
    const button1 = document.getElementById("getQuoteButton");
    if (button1) {
      button1.disabled = true;
    }

  const button2 = document.getElementById("quotePriceButton");
    if (button2) {
      button2.disabled = true;
    }

    // document.getElementById("getQuoteButton").addEventListener("click", function(){
    //   alert("Please fill out your profile before getting a quote");
    // });
    // document.getElementById("quotePriceButton").addEventListener("click", function(){
    //   alert("Please fill out your profile before getting a quote");
    // });
  }
  else if(profileSet && typeof window !== "undefined"){
    const button2 = document.getElementById("getQuoteButton").disabled = false;
  }
  const handleSubmitQuote = async (e) => {
    e.preventDefault();
    const currentDate = new Date();
    const deliveryDateConverted = new Date(deliveryDate);
    deliveryDateConverted.setDate(deliveryDateConverted.getDate() + 1);
    deliveryDateConverted.setHours(0, 0, 0, 0);

    //make sure to remove any old borders and error messages
    const errorMsg = document.getElementById("errorMiddle");
    const deliveryDateBox = document.getElementById("deliveryDate");
    errorMsg.innerHTML = "";
    deliveryDateBox.style.border = "";

    //VALIDATIONS
    if (deliveryDate.length != 0) {
      if (deliveryDateConverted < currentDate) {
        const errorMsg = document.getElementById("errorMiddle");
        const deliveryDateBox = document.getElementById("deliveryDate");
        errorMsg.innerHTML = "Please enter a valid date";
        deliveryDateBox.style.border = "2px solid red";
        return;
      }
    } else {
      const errorMsg = document.getElementById("errorMiddle");
      const deliveryDateBox = document.getElementById("deliveryDate");
      errorMsg.innerHTML = "Date cannot be empty";
      deliveryDateBox.style.border = "2px solid red";
      return;
    }

    if (gallonsRequested.length == 0) {
      const errorMsg = document.getElementById("errorMiddle");
      const gallonsRequestedBox = document.getElementById("gallonsRequested");
      errorMsg.innerHTML = "Gallons requested cannot be empty";
      gallonsRequestedBox.style.border = "2px solid red";
      return;
    }

    console.log("calculating quote");

    //the above should be replaced with the following
    //send data to backend using a get request and query parameters
    const response = await fetch(
      `http://localhost:3000/api/PricingModule?gallonsRequested=${gallonsRequested}&deliveryDate=${deliveryDate}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    console.log(data);
    //set the pricePerGallon and totalAmountDue to the data that was returned from the backend
    document.getElementById("pricePerGallon").value =
      data.pricePerGallon;
    document.getElementById("totalPrice").value =
      data.totalAmountDue;

    //remove the disabled attribute from the order now button
    document.getElementById("quotePriceButton").disabled = false;
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    console.log("submitting order");
    //use POST to send data to the backend to store as a quote in the database (within quote history)
    const response = await fetch(`http://localhost:3000/api/PricingModule`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: session.user.email,
        gallonsRequested: gallonsRequested,
        deliveryDate: deliveryDate,
        pricePerGallon: document.getElementById("pricePerGallon").value,
        totalAmountDue: document.getElementById("totalPrice").value,
      }),
    });
    const data = await response.json();
    console.log(data);
    //redirect to home page
    router.push("/");
  };

  return (
    <div className={barlow.className}>
      <Head>
        <title>Fuel Quoter: Get a Quote</title>
        <link rel="icon" href="/quote.ico" />
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
                <Link href="/"> HOME </Link>
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

        <main className="flex-grow flex items-center justify-center">
          {/* QUOTE FORM */}
          <div className="flex justify-center items-center">
            <div className="flex bg-white shadow-lg overflow-hidden mx-auto py-4 px-4 w-[90%] flex-col">
              {/* Title */}
              <div className="flex-col flex w-full py-2.5 px-4 justify-center items-center">
                <div>
                  <h1 className="font-bold text-2xl mt-4 mb-2 text-center"> Get a Fuel Quote! </h1>
                </div>
                <div className="items-center justify-center">
                  <p className="text-center"> To get a quote, review your info, complete the rest of the form, then click
                    <span className="text-light_blue text-center"> Get Quote </span> below to see your suggested quote on the right.{" "}
                  </p>
                  <p className="text-sm text-center mt-1">
                    *Our Location Policy: Clients in the state of Texas have a 2% location factor, while those outside of Texas have a location factor of 4%.
                  </p>
                </div>
              </div>
              <hr className="border-black mt-2 mx-16"></hr>

              <div className="flex w-full justify-center px-4 py-6">
                {/* left */}
                <div className="w-full px-6 lg:w-1/2 border-r border-dark_grey">
                  {profileSet ? (
                    <>
                  <div>
                    <label className="block font-bold">Address 1</label>
                    <input 
                      disabled type="text" value={userData.address1} placeholder="Address 1" 
                      className="w-full px-5 py-2 mt-1 border rounded-md" 
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block font-bold mt-4">Address 2</label>
                    <input
                      disabled type="text" value={userData.address2} placeholder="Address 2 (optional)"
                      className="w-full px-5 py-2 mt-1 border rounded-md" 
                    />
                  </div>
                  <div className="mt-4">
                    <div className="flex flex-col sm:flex-row">
                      <div className="relative flex-initial sm:w-1/2">
                        <label className="block font-bold">City</label>
                        <input
                          disabled type="text" value={userData.city} placeholder="City" name="billing-address"
                          className="w-full px-5 py-2 mt-1 border rounded-md" 
                        />
                      </div>
                      <div className="relative flex-initial sm:w-1/4 mx-2">
                        <label className="block font-bold">State</label>
                        <input
                          disabled type="text" value={userData.state} placeholder="State" name="billing-state"
                          className="w-full px-5 py-2 mt-1 border rounded-md" 
                        />
                      </div>
                      <div className="relative flex-initial sm:w-1/4">
                        <label className="block font-bold ">Zip</label>
                        <input
                          disabled type="text" value={userData.zipCode} placeholder="ZIP" name="billing-zip"
                          className="w-full px-5 py-2 mt-1 border rounded-md" 
                        />
                      </div>
                    </div>
                    <span className="text-sm mt-2 justify-center">
                      Not the right address? Change it on your profile{" "}
                      <Link href="/ProfilePage" className="text-light_blue underline hover:font-bold" > here</Link>!
                    </span>
                  </div>
                  </>
                  ) : 
                  (
                    <div className="flex-grow flex justify-center items-center h-full">
                      <span className="text-gray-400 items-center justify-center px-4 text-center">
                        <i>You must finish setting up your profile before making a quote!</i><br></br>
                        Click <Link href="/ProfilePage" className="text-light_blue underline hover:font-bold" > here</Link>
                        &nbsp;to finish setting up your profile.
                      </span>
                    </div>
                  )}
                </div>

                {/* middle */}
                <div className="w-full pl-6 pr-3 lg:w-1/4 justify-center">
                  <form onSubmit={handleSubmitQuote}>
                    <div className="mb-4">
                      <label className='"block font-bold'>Delivery Date</label>
                      <input
                        required type="date" id="deliveryDate"
                        value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)}
                        className="w-full px-5 py-2 mt-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                      />
                      <label className="mt-4 block font-bold"> Gallons Requesting </label>
                      <input
                        required type="number" id="gallonsRequested"
                        step="0.01" placeholder="0.00"
                        value={gallonsRequested} onChange={(e) => setGallonsRequested(e.target.value)}
                        className="w-full px-5 py-2 mt-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                      />
                    </div>
                    <div>
                      <span id="errorMiddle" className="text-red"></span>
                    </div>
                    <button id="getQuoteButton" type="submit"
                      className="block w-1/2 py-2 mt-4 mx-auto text-center text-light_blue border border-light_blue rounded-md hover:ring-1 hover:ring-light_blue" 
                    >
                      Get Quote
                    </button>
                  </form>
                </div>

                {/* right */}
                <div className="w-full pl-3 pr-6 lg:w-1/4 justify-center">
                  {/* will enable this text box once user has requested a quote */}
                  <form onSubmit={handleSubmitOrder}>
                    <div className="mb-4">
                      <label className="block font-bold"> Price Per Gallon </label>
                      <div className="flex">
                        <span className="inline-flex items-center px-4 py-2 mt-1 border-r-none border rounded-l-md"> $ </span>
                        <input 
                          disabled type="number" id="pricePerGallon" placeholder="0.00"
                          className="w-full px-5 py-2 mt-1 border border-l-none rounded-r-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block mt-4 font-bold">Total Cost</label>
                      <div className="flex">
                        <span className="inline-flex items-center px-4 py-2 mt-1 border-r-none border rounded-l-md">  $ </span>
                        <input 
                          disabled type="number" id="totalPrice" placeholder="0.00"
                          className="w-full px-5 py-2 mt-1 border border-l-none rounded-r-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                        />
                      </div>
                    </div>
                    <button
                      disabled id="quotePriceButton"
                      className="block w-1/2 py-2 mt-4 mb-4 mx-auto bg-light_blue rounded-md text-center text-beige hover:bg-light_blue/75 hover:text-beige"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* FOOTER */}
        <Footer />
      </div>
    </div>
  );
}
