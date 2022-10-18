import QueryBlock from './components/QueryBlock'
import React from 'react';
import {useState} from 'react';
import { useLocation } from "react-router-dom";
import {Button} from "flowbite-react";
import {useNavigate} from 'react-router-dom';
import {
  Navigate
} from "react-router-dom";

const Queries = props => {

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

  return (
    <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
      {queries.map((q) => (
      <QueryBlock key={q.id} query={"query: " + q.query_text} query_id={q.id} results={q.returns} email={uid}/>
      ))}

      <Button size="xl"  onClick={navigateToThankYou}>
        Finish responses
      </Button>
    </div>

  )
}
export default Queries;