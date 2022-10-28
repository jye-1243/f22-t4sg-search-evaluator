import QueryBlock from './components/QueryBlock'
import React from 'react';
import {useState} from 'react';
import { useLocation } from "react-router-dom";
import {Button} from "flowbite-react";
import {useNavigate} from 'react-router-dom';
import {
  Navigate
} from "react-router-dom";


import db from "./firebase";

import { GoogleLogout } from 'react-google-login';

const clientId = '1044211576984-ieq8c2m6h75hqb24dvgrtol8krfdvci4.apps.googleusercontent.com';
  
const Queries = props => {

  const [allRelData, setAllRelData] = useState([
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1],
  ]);


  const navigate = useNavigate();
  const {state} = useLocation();
  if (!state) {
    return (
      <Navigate to="/" />
    )
  }

  const {uid} = state; //uid: user ID. if queries was not navigated to from the login page, state is null, which returns an error
  const {queries} = state;

  const navigateToThankYou = () => {
    if(uid.length != 0){
      navigate('/thankyou');
    }
  };

  const logOut = () => {
    // setProfile(null);
    navigate('/*');
    window.location.reload();
  };

  const setRelevance = (query, entry, relevance) => {
    let tmp = allRelData;
    tmp[query][entry] = relevance;

    setAllRelData(tmp);
  }

  const onSubmitAll = () => {
    for (let i = 0; i < allRelData.length; i++) {
      let tmp = allRelData[i];
      let q = queries[i];

      db.collection("responses").add({
        user_id: uid,
        query_id: q.id,
        rankings: tmp
      });
    }

    navigate('/thankyou');
    
  }

  return (
    <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
      <div style={{display: "flex", justifyContent: "right"}}>
      <GoogleLogout
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={logOut}
                redirectUri={'/'}
            />
      </div>
      {queries.map((q, index) => (
      <QueryBlock key={q.id} query={"query: " + q.query_text} query_id={q.id} results={q.returns} email={uid} setRel={setRelevance} index={index}/>
      ))}
      <GoogleLogout
          clientId={clientId}
          render={(renderProps) => (
            <Button size='xl' onClick={onSubmitAll} disabled={renderProps.disabled}>
              Submit All
            </Button>
          )}
          buttonText="Submit All"
          onLogoutSuccess={navigateToThankYou}
          redirectUri={'/thankyou'}
          />
    </div>
  )
}
export default Queries;