import React, { useEffect, useState } from 'react';
import './App.css';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import {Button} from 'flowbite-react';
import {useNavigate} from 'react-router-dom';
import db from "./firebase";

function Login() {

  const [ profile, setProfile ] = useState([]);
  const [ id, setId] = useState([]);


  

  const clientId = '1044211576984-ieq8c2m6h75hqb24dvgrtol8krfdvci4.apps.googleusercontent.com';
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
      clientId: clientId,
      scope: '',
      });
    };
  gapi.load('client:auth2', initClient);
  });
  const onSuccess = (res) => {
    setProfile(res.profileObj.name);
    console.log('success:', res);
    setId(res.profileObj.googleId);
  };
  const onFailure = (err) => {
    console.log('failed:', err);
  };
  const logOut = () => {
    setProfile(null);
  };
  const centerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.5rem',
    height: '20vh',
    flexDirection: 'column',
  };

  const submit = (e) => {
    e.preventDefault();
    db.collection("").add({
      name: customerName,
      password: customerPassword,
    });
  
    setCustomerName("");
    setCustomerPassword("");
  };

  const navigate = useNavigate();

  const navigateToQueries = () => {
    console.log(profile);
    // 👇️ navigate to /contacts
    console.log(id);
    navigate('/queries', { state: { uid: id, name: "yyee"} });
  };
  return (
    <div style={centerStyle} className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">

        <h2 className="text-3xl text-gray-700 font-bold mb-5">City of Cambridge Search Evaluator </h2>
        {/* <div>
            {profile.length === 0 ? "Not logged in" : "User: " + profile} 
        </div> */}
        <div>
        {profile.length === 0 ? "Not logged into": <Button onClick={navigateToQueries}>Open survey</Button>} 
        </div>

        
        
            
            <GoogleLogin
                clientId={clientId}
                buttonText="Sign in with Google"
                onSuccess={onSuccess}
                redirectUri={'http://localhost:3000/Queries'}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
    </div>
  );
}

export default Login;
