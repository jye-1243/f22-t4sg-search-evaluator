import QueryBlock from './components/QueryBlock'
import React from 'react';
import {useState} from 'react';
import { useLocation } from "react-router-dom";
import {Button} from "flowbite-react";
import {useNavigate} from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';
import { Login } from './Login';

const clientId = '1044211576984-ieq8c2m6h75hqb24dvgrtol8krfdvci4.apps.googleusercontent.com';
  
const Queries = props => {

  const {state} = useLocation();
  const {uid} = state; //uid: user ID. if queries was not navigated to from the login page, state is null, which returns an error
  const {queries} = state;

  const navigate = useNavigate();

  const navigateToThankYou = () => {
      console.log(queries);
      navigate('/thankyou');
  };

  const logOut = () => {
    // setProfile(null);
    navigate('/*');
    window.location.reload();
  };

  return (
    <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
      <div style={{display: "flex", justifyContent: "right"}}>
      <GoogleLogout
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={logOut}
                redirectUri={'http://localhost:3000/'}
            />
      </div>
      {queries.map((q) => (
      <QueryBlock query={"query: " + q.query_text} query_id={q.id} results={q.returns} email={uid}/>
      ))}
      <GoogleLogout
          clientId={clientId}
          render={(renderProps) => (
            <Button size='xl' onClick={renderProps.onClick} disabled={renderProps.disabled}>
              Submit All
            </Button>
          )}
          buttonText="Submit All"
          onLogoutSuccess={navigateToThankYou}
          redirectUri={'http://localhost:3000/thankyou'}
          />
    </div>
  )
}
export default Queries;