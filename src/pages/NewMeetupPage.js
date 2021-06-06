import React from 'react';
import NewMeetupForm from "../components/meetups/NewMeetupForm";
//import {useHistory} from "react-router-dom";


const NewMeetup = (props) => {

  //const history = useHistory();

  const addMeetupHandler = async (enteredMeetupData) => {
/*    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(enteredMeetupData),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
    history.push('/');*/
    console.log('Will go to Mongo to add')
  }

  return (
    <NewMeetupForm onAddMeetup={addMeetupHandler}/>
  );
};

export default NewMeetup;
