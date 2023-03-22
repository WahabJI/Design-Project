import Link from 'next/link';
import Footer from '../components/Footer'
import localFont from "next/font/local"

const barlow = localFont({
  src: "../public/fonts/Barlow-Regular.ttf",
  weight: '200'
})

export default function HomePage() {
    return (
      <div className={barlow.className}>
        {/* TOP BAR */}
        <header >
          <nav className="flex absolute w-full items-center font-bold text-4xl text-beige bg-light_blue h-14">
            <div className="ml-4">
              FUEL QUOTER
            </div>
            <ul className="ml-auto left-0 right-0 top-full inline-flex">
              <li className="flex mr-4 items-center">
                <Link href="/LoginPage"><span>LOGIN</span></Link>
              </li>
              <li className="flex mr-4 items-center">
                  <Link href="/RegisterPage"><span>REGISTER</span></Link>
              </li>
            </ul>
          </nav>
        </header>


        {/* LOGIN FORM */}
        <div className="flex flex-col py-16 justify-between h-screen bg-gray-100">
          <div className="px-8 py-6 text-left w-5/6 bg-white shadow-lg m-auto">
            <h3 className="text-2xl font-bold">WELCOME!</h3>
                <div className="mt-4">
                  <div>Click one of the <div className="text-light_blue inline-block">buttons</div> below to continue</div>
                  <div className="flex items-baseline space-x-8">
                      <Link href="/LoginPage"><button className="px-6 py-2 mt-4 text-beige bg-light_blue rounded-lg hover:bg-light_blue/75 hover:text-beige">Login</button></Link>
                      <Link href="RegisterPage"><button className="px-6 py-2 mt-4 text-beige bg-light_blue rounded-lg hover:bg-light_blue/75 hover:text-beige">Register</button></Link>
                  </div>  
                </div>  
          </div>
          <div className="px-8 py-6 text-left w-5/6 bg-white shadow-lg m-auto">
            <h3 className="text-2xl font-bold">WHAT IS THE FUEL QUOTER?</h3>
                <div className="mt-4">
                    <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do <div className="text-light_blue inline-block">eiusmod</div> tempor incididunt 
                        ut labore et dolore magna aliqua. Ut enim ad minim quis nostrud exercitation <div className="text-light_blue inline-block">ullamco</div> laboris 
                        nisi ut aliquip ex ea commodo consequat. Duis aute <div className="text-light_blue inline-block">irure</div> dolor in reprehenderit in voluptate 
                        velit <div className="text-light_blue inline-block">esse</div> dolore eu fugiat nulla pariatur. Excepteur sint occaecat <div className="text-light_blue inline-block">cupidatat</div> non 
                        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </div>
                </div>  
          </div>
        </div>


        {/* FOOTER */}
        <Footer/>

      </div>
    );
  }