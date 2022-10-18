import QueryBlock from './components/QueryBlock'
import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import {useNavigate} from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Queries from "./Queries";
import Login from "./Login";
import ThankYou from "./ThankYou";




const App = () => {
  return (

    <Routes> 
          <Route path="/*" element={<Login />} />
          <Route path="/queries" element={<Queries/>} />
          <Route path="/thankyou" element={<ThankYou/>} />
        </Routes>

  )
}
export default App;




