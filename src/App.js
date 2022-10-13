import QueryBlock from './components/QueryBlock'
import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import {useNavigate} from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Queries from "./Queries";
import Login from "./Login";



const App = () => {
  return (

    <Routes> 
          {/* <HomeLayoutRoute path="/" element={<App />} /> */}
          {/* <PrivateRoute path="/" element={<PrivateScreen/>} /> */}
          <Route path="/*" element={<Login />} />
          <Route path="/Queries" element={<Queries/>} />
        </Routes>

  )
}
export default App;




// function PrivateRoute({ children, ...rest }) {
//   let auth = useAuth();
//   return (
//     <Route
//       {...rest}
//       render={({ location }) =>
//         auth.user ? (
//           children
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/",
//               state: { from: location }
//             }}
//           />
//         )
//       }
//     />
//   );
// }