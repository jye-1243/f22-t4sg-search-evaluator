import React, { useEffect, useState } from 'react';
import './App.css';


function ThankYou() {


    const centerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '1.5rem',
        height: '20vh',
        flexDirection: 'column',
      };


    return (
        <div style={centerStyle} className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
            <p className="text-3xl text-gray-700 font-bold mb-5">
                Thank you!
                </p>
                Your responses have been submitted.
            </div>


    );


}


export default ThankYou;