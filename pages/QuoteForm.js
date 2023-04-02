// need to fix sticky navbar and footer (make not sticky)
import Link from "next/link";
import Footer from "../components/Footer";
import localFont from "next/font/local";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import router from "next/router";
const barlow = localFont({
  src: "../public/fonts/Barlow-Regular.ttf",
  weight: "200",
});

export default function fuel_quote_form() {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState([]);
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
  if (typeof window !== "undefined" && status === "unauthenticated") {
    router.push("/LoginPage");
    return;
  }

  const handleSubmitQuote = async (e) => {
    e.preventDefault();
    const currentDate = new Date();
    const deliveryDateConverted = new Date(deliveryDate);

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
      data.pricePerGallon.toFixed(2);
    document.getElementById("totalPrice").value =
      data.totalAmountDue.toFixed(2);

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
      <div className="flex flex-col min-h-screen bg-gray-100">
        <header>
          {/* TOP BAR */}
          <nav className="relative flex w-full items-center font-bold text-4xl text-beige bg-light_blue shadow-md h-14">
            <div className="ml-6">FUEL QUOTER</div>
            <ul className="ml-auto left-0 right-0 top-full inline-flex">
              <li className="flex mr-6 items-center">
                <Link href="/"> <span>HOME</span> </Link>
              </li>
              <li className="flex mr-6 items-center">
                <Link href="/QuoteHistory"> <span>HISTORY</span> </Link>
              </li>
              <li className="flex mr-6 items-center">
                <Link href="/ProfilePage"> <span>PROFILE</span> </Link>
              </li>
              <li className="flex mr-6 items-center">
                <Link href="/HomePage"> <span>LOGOUT</span> </Link>
              </li>
            </ul>
          </nav>
        </header>

        <main className="flex-grow flex items-center justify-center">
          {/* QUOTE FORM */}
          <div className="flex justify-center items-center">
            <div className="flex bg-white shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-[80%] flex-col">
              {/* Title */}
              <div className="flex-col flex w-full py-2.5 px-4 justify-center items-center">
                <div>
                  <h1 className="font-bold text-2xl mt-4 mb-2 text-center"> Get a Fuel Quote! </h1>
                </div>
                <div>
                  <span className="text-center"> Get a quote by checking your info, filling out the rest of the form, and click
                    <span className="text-light_blue text-center"> Get Quote </span> below to see your suggested quote on the right.{" "}
                  </span>
                </div>
              </div>
              <hr className="border-black mt-2 mx-16"></hr>

              <div className="flex w-full justify-center px-4 py-6">
                {/* left */}
                <div className="w-full px-6 lg:w-1/2 border-r border-dark_grey">
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
                    <button type="submit"
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
                      Order Now
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
