import React, { useEffect, useState } from 'react';
import './App.css';
import { GoogleLogin, GoogleLogout, useGoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import {Button} from 'flowbite-react';
import {useNavigate} from 'react-router-dom';
import db from "./firebase";
import firebase from 'firebase/compat/app';
import { onSnapshot, collection } from "firebase/firestore";

const clientId = '1044211576984-ieq8c2m6h75hqb24dvgrtol8krfdvci4.apps.googleusercontent.com';

function Login() {

  // State
  const [ profile, setProfile ] = useState([]);
  const [ firstName, setFirstName ] = useState([]);
  const [ lastName, setLastName ] = useState([]);
  const [ email, setEmail ] = useState([]);
  const [ id, setId ] = useState([]);
  const [queries, setQueries] = useState([]);
  const [preExistingUsers, setExistingUsers] = useState([]);

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
      clientId: clientId,
      scope: '',
      });
    };
  gapi.load('client:auth2', initClient);
  });

  async function getMarker() {
    const events = await firebase.firestore().collection('queries')
    events.get().then((querySnapshot) => {
        const tempDoc = querySnapshot.docs.map((doc) => {
          return { id: doc.id }
        })
      })
  }
  

  useEffect(
    () =>
      onSnapshot(collection(db, "queries"), (snapshot) =>
        setQueries(snapshot.docs.sort(() => 0.5 - Math.random()).slice(0,4).map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    []
  );

  useEffect(
    () =>
    onSnapshot(collection(db, "user_info"), (snapshot) =>
      setExistingUsers(snapshot.docs.map((doc) => ({ ...doc.data() })))
    ),
    []
  );

  const onSuccess = (res) => {
    setProfile(res.profileObj.name);
    setId(res.profileObj.googleId);
    setEmail(res.profileObj.email);
    setFirstName(res.profileObj.givenName);
    setLastName(res.profileObj.familyName);
    var exists = false;

    for (let i = 0; i < preExistingUsers.length; i ++) {
      if (id === preExistingUsers[i]['id']) {
        exists = true;
      }
    }

    if (!exists && preExistingUsers.length > 0) {
      db.collection("user_info").add({
        email: email,
        first_name: firstName,
        id: id,
        last_name: lastName
      });
    }

  };

  const onFailure = (err) => {
  };
  const logOut = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setId('');
    setProfile([]);
    window.location.reload();
  };
  const centerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.5rem',
    height: '30vh',
    flexDirection: 'column',
  };

  const navigate = useNavigate();

  const navigateToQueries = () => {
    navigate('/queries', { state: { uid: id, queries: queries} });
  };

  return (
    <div style={centerStyle} className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">

        <h2 className="text-3xl text-gray-700 font-bold mb-5 text-center">City of Cambridge Search Evaluator {firstName} </h2>
        
        <div>
        {profile.length === 0 ? <h3 class="text-medium text-center mb-3">Please Log In</h3>: <Button onClick={navigateToQueries}>Open survey</Button>} 
        {profile.length === 0 ?
            <GoogleLogin
            clientId={clientId}
            buttonText="Sign in with Google"
            onSuccess={onSuccess}
            redirectUri={'/'}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
        />
        :
          <GoogleLogout 
            clientId={clientId}
            buttonText="Log Out"
            onLogoutSuccess={logOut}
            redirectUri={'/'}
          />
        }
        </div>
    </div>
  )
}

export default Login;

