// need to fix sticky navbar and footer (make not sticky)
import Link from 'next/link';
import Footer from '../components/Footer'
export default function quote_history() {
    return (
        <div className="flex flex-col h-screen justify-between">
        <header>
            {/* TOP BAR */}
            <nav className="flex w-full items-center font-bold text-4xl text-beige bg-light_blue h-14">
            <div className="ml-4">
                FUEL QUOTER
            </div>
            <ul className="ml-auto left-0 right-0 top-full inline-flex">
                <li className="flex mr-4 items-center">
                    <Link href="/LoggedInHomePage"><span>HOME</span></Link>
                </li>
                <li className="flex mr-4 items-center">
                <Link href="/QuoteForm"><span>QUOTE</span></Link>
                </li>
                <li className="flex mr-4 items-center">
                <Link href="/ProfilePage"><span>PROFILE</span></Link>
                </li>
                <li className="flex mr-4 items-center">
                    <Link href="/HomePage"><span>LOGOUT</span></Link>
                </li>
            </ul>
            </nav>
        </header>


        {/* QUOTE FORM */}
        <main className="flex h-screen overflow-y-auto bg-gray-100">
            <div className="px-4 py-6 bg-white shadow-lg mx-auto my-auto sm:rounded-sm">
                <h3 className="text-2xl font-bold text-center">Fuel Quote History</h3>
                
                <div className="relative overflow-x-auto shadow-md sm:rounded-sm mt-6">
                <table className="table-auto w-full text-sm text-left">
                    <thead className="text-xs text-gray-700 uppercase bg-dark_grey">
                        <tr>
                            <th scope="col" className=" px-4 py-2">
                                Delivery Date
                            </th>
                            <th scope="col" className=" px-4 py-2">
                                Address 1
                            </th>
                            <th scope="col" className=" px-4 py-2">
                                Address 2
                            </th>
                            <th scope="col" className=" px-4 py-2">
                                City
                            </th>
                            <th scope="col" className=" px-4 py-2">
                                State
                            </th>
                            <th scope="col" className=" px-4 py-2">
                                Zip
                            </th>
                            <th scope="col" className=" px-4 py-2">
                                Price/Gal
                            </th>
                            <th scope="col" className=" px-4 py-2">
                                Total Cost
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b border-dark_grey">
                            <td scope="row" className=" px-4 py-2 whitespace-nowrap">
                               mm/dd/yyyy
                            </td>
                            <td className=" px-4 py-2">
                                5098 Jacksonville Rd
                            </td>
                            <td className=" px-4 py-2">
                                Apt 1960
                            </td>
                            <td className=" px-4 py-2">
                                Houston
                            </td>
                            <td className=" px-4 py-2">
                                TX
                            </td>
                            <td className=" px-4 py-2">
                                77034
                            </td>
                            <td className=" px-4 py-2">
                                $2.80
                            </td>
                            <td className=" px-4 py-2">
                                $280.00
                            </td>
                        </tr>
                        <tr className="bg-white border-b border-dark_grey">
                            <td scope="row" className=" px-4 py-2 whitespace-nowrap">
                               mm/dd/yyyy
                            </td>
                            <td className=" px-4 py-2">
                                5098 Jacksonville Rd
                            </td>
                            <td className=" px-4 py-2">
                                Apt 1960
                            </td>
                            <td className=" px-4 py-2">
                                Houston
                            </td>
                            <td className=" px-4 py-2">
                                TX
                            </td>
                            <td className=" px-4 py-2">
                                77034
                            </td>
                            <td className=" px-4 py-2">
                                $2.80
                            </td>
                            <td className=" px-4 py-2">
                                $280.00
                            </td>
                        </tr>
                        <tr className="bg-white border-b border-dark_grey">
                            <td scope="row" className=" px-4 py-2 whitespace-nowrap">
                               mm/dd/yyyy
                            </td>
                            <td className=" px-4 py-2">
                                5098 Jacksonville Rd
                            </td>
                            <td className=" px-4 py-2">
                                Apt 1960
                            </td>
                            <td className=" px-4 py-2">
                                Houston
                            </td>
                            <td className=" px-4 py-2">
                                TX
                            </td>
                            <td className=" px-4 py-2">
                                77034
                            </td>
                            <td className=" px-4 py-2">
                                $2.80
                            </td>
                            <td className=" px-4 py-2">
                                $280.00
                            </td>
                        </tr>
                        <tr className="bg-white border-b border-dark_grey">
                            <td scope="row" className=" px-4 py-2 whitespace-nowrap">
                               mm/dd/yyyy
                            </td>
                            <td className=" px-4 py-2">
                                5098 Jacksonville Rd
                            </td>
                            <td className=" px-4 py-2">
                                Apt 1960
                            </td>
                            <td className=" px-4 py-2">
                                Houston
                            </td>
                            <td className=" px-4 py-2">
                                TX
                            </td>
                            <td className=" px-4 py-2">
                                77034
                            </td>
                            <td className=" px-4 py-2">
                                $2.80
                            </td>
                            <td className=" px-4 py-2">
                                $280.00
                            </td>
                        </tr>
                        <tr className="bg-white border-b border-dark_grey">
                            <td scope="row" className=" px-4 py-2 whitespace-nowrap">
                               mm/dd/yyyy
                            </td>
                            <td className=" px-4 py-2">
                                5098 Jacksonville Rd
                            </td>
                            <td className=" px-4 py-2">
                                Apt 1960
                            </td>
                            <td className=" px-4 py-2">
                                Houston
                            </td>
                            <td className=" px-4 py-2">
                                TX
                            </td>
                            <td className=" px-4 py-2">
                                77034
                            </td>
                            <td className=" px-4 py-2">
                                $2.80
                            </td>
                            <td className=" px-4 py-2">
                                $280.00
                            </td>
                        </tr>
                        <tr className="bg-white">
                            <td scope="row" className=" px-4 py-2 whitespace-nowrap">
                               mm/dd/yyyy
                            </td>
                            <td className=" px-4 py-2">
                                5098 Jacksonville Rd
                            </td>
                            <td className=" px-4 py-2">
                                Apt 1960
                            </td>
                            <td className=" px-4 py-2">
                                Houston
                            </td>
                            <td className=" px-4 py-2">
                                TX
                            </td>
                            <td className=" px-4 py-2">
                                77034
                            </td>
                            <td className=" px-4 py-2">
                                $2.80
                            </td>
                            <td className=" px-4 py-2">
                                $280.00
                            </td>
                        </tr>
                    </tbody>
                </table>
                </div>

                
    
                   
          </div>
        </main>


        {/* FOOTER */}
        {/* add conditional button stuff later */}
        <Footer />

      </div>
      


    );
  }
