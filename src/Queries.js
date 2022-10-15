import QueryBlock from './components/QueryBlock'
import React from 'react';
import {useState} from 'react';
import { useLocation } from "react-router-dom";
import {Button} from "flowbite-react";
import {useNavigate} from 'react-router-dom';


const Queries = props => {

  const {state} = useLocation();
  const {uid} = state; //uid: user ID. if queries was not navigated to from the login page, state is null, which returns an error


  const navigate = useNavigate();

  const navigateToThankYou = () => {
    if(uid.length != 0){
      navigate('/thankyou');
    }
  };

  return (
    <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
      <QueryBlock query="Sample Query"/>
      <br></br>
      <QueryBlock query="Another Query"/>
      <Button size="xl"  onClick={navigateToThankYou}>
    Submit
    </Button>
    </div>




  )
}
export default Queries;