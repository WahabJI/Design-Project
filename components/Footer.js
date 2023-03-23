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
        <div className="justify-center text-center align-center h-10 w-full bg-white border-t-2 border-dark_grey pt-1.5">
          <span><span className="text-light_blue">Created by </span> Mayssam Kalajo, Grace Rabano, Christian Ayala, and Wahab Javed</span>
        </div>
      </div>
    );

    

}