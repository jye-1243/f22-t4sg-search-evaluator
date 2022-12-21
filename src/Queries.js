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

      db.collection("new_responses").add({
        user_id: uid,
        query_id: q.id,
        rankings: tmp
      });
    }

    navigate('/thankyou');
    
  }

  return (
    <div>
      <div className="mx-10 mx-auto p-8">
        <h1 className="text-4xl my-5 font-bold"> Instructions: </h1>
        <p className="text-lg"> We are testing the efficacy of the search bar on the City of Cambridge Search Bar. Below, we have five queries which a user might type into the search bar, 
          and the top results the search bar returns. For each query, please rank how useful you would think each result would be if you had typed in the given query. Once 
          you're done, hit submit all for a chance to win a 50 dollar gift card.
        </p>
      </div>
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
          className="my-5"
            clientId={clientId}
            render={(renderProps) => (
              <Button className="my-5" size='xl' onClick={onSubmitAll} disabled={renderProps.disabled}>
                Submit All
              </Button>
            )}
            buttonText="Submit All"
            onLogoutSuccess={navigateToThankYou}
            redirectUri={'/thankyou'}
            />
      </div>
    </div>
  )
}
export default Queries;