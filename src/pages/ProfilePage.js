import React, {useEffect} from 'react';
import Card from "../components/UI/Card";
import styles from './LoginSignupPage.module.scss';
import Form from "../components/UI/Form";
import useInput from "../hooks/useInput";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";


import useHttp from "../hooks/use-http";
import {fetchAuth} from "../helpers/AuthHelpers";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import {useHistory} from "react-router";

import {useDispatch, useSelector} from "react-redux";
import {showNotification} from "../store/notificationSlice";
import {login} from "../store/authSlice";

const ProfilePage = (props) => {
  const password = useInput('text', 'password', 'New Password', (value) => value.trim() !== '')

  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const {sendRequest, status, data, error} = useHttp(fetchAuth);

  useEffect(() => {
    if (status === 'completed') {
      if (!error) {
        //dispatch(login(username.value, data.idToken, expirationTime.toISOString()));
        dispatch(login(auth.userName, data.idToken));
        history.push('/')
        dispatch(showNotification('Success!','Successfull Change Password','success'));
      } else {
        console.log(error)
        dispatch(showNotification('Change Password Error',error,'error'));
      }
    }
    // eslint-disable-next-line
  }, [status]);

  const submitHandler = (e) => {
    e.preventDefault();
    const userData = {
      authType: 'changepassword',
      token: auth.token,
      password: password.value
    }
    sendRequest(userData);
  }

  const cancelHandler = () => {
    history.push('/')
  }

  return (
    <Form onSubmit={submitHandler}>
      <Card>
        <div>
          <h1>{auth.userName}</h1>
          <Input inputHook={password}/>
        </div>
        <div className={styles["form-actions"]}>
          <Button styletype='btn2' type='button' onClick={cancelHandler}>Cancel</Button>
          <Button>Change Password</Button>
        </div>
        {status === 'pending' && <LoadingSpinner/>}
      </Card>
    </Form>
  );
}

export default ProfilePage;
