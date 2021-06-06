import {useRef, Fragment, useEffect} from 'react';

import Card from '../UI/Card';
import classes from './NewMeetupForm.module.css';
import {useDispatch} from "react-redux";
import {showNotification} from "../../store/notificationSlice";

function NewMeetupForm(props) {
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const addressInputRef = useRef();
  const descriptionInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    const meetupData = {
      title: enteredTitle,
      image: enteredImage,
      address: enteredAddress,
      description: enteredDescription,
    };

    props.onAddMeetup(meetupData);
  }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showNotification('Warning','Needs Mongo Service', 'warning'))
  }, [dispatch]);

  return (
    <Fragment>
      <Card>
        <form className={classes.form} onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor='title'>Meetup Title</label>
            <input type='text' required id='title' ref={titleInputRef}/>
          </div>
          <div className={classes.control}>
            <label htmlFor='image'>Meetup Image</label>
            <input type='url' required id='image' ref={imageInputRef}/>
          </div>
          <div className={classes.control}>
            <label htmlFor='address'>Address</label>
            <input type='text' required id='address' ref={addressInputRef}/>
          </div>
          <div className={classes.control}>
            <label htmlFor='description'>Description</label>
            <textarea
              id='description'
              required
              rows='5'
              ref={descriptionInputRef}
            />
          </div>
          <div className={classes.actions}>
            <button>Add Meetup</button>
          </div>
        </form>
      </Card>
    </Fragment>
  );
}

export default NewMeetupForm;
