import Link from 'next/link';
import React from 'react';
import PropTypes from 'prop-types';
import localFont from "next/font/local";

const barlow = localFont({
  src: "../public/fonts/Barlow-Regular.ttf",
  weight: '200'
})

export default function Nav_bar(){
    return (
      <div className={barlow.className}>
        <div className="relative justify-center text-center align-center h-10 w-full bg-white border-t-2 shadow-md border-dark_grey py-2">
          <span><span className="text-light_blue">Created by </span> Mayssam Kalajo, Grace Rabano, Christian Ayala, and Wahab Javed</span>
        </div>
      </div>
    );

    

}