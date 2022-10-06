import React, { useEffect, useState } from 'react';
import './App.css';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';

function App() {
  const [ profile, setProfile ] = useState([]);
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
    console.log('success:', res);
  };
  const onFailure = (err) => {
    console.log('failed:', err);
  };
  const logOut = () => {
    setProfile(null);
  };
  return (
    <div>
        <h2>Cambrdige Search Evaluator</h2>
            <GoogleLogin
                clientId={clientId}
                buttonText="Sign in with Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
    </div>
  );
}

export default App;
