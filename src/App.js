import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Queries from "./Queries";
import Login from "./Login";
import ThankYou from "./ThankYou";

const App = () => {
  return (
    <Routes> 
          <Route path="/queries" element={<Queries/>} />
          <Route path="/thankyou" element={<ThankYou/>} />
          <Route path="/f22-t4sg-search-evaluator" element={<Login />} />
          <Route path="/*" element={<Login />} />
          
    </Routes>
  )
}
export default App;

