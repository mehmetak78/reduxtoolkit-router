import React, { useEffect} from 'react';
import Card from "../components/UI/Card";
import styles from './LoginSignupPage.module.scss'
import Form from "../components/UI/Form";
import useInput from "../hooks/useInput";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";

import useHttp from "../hooks/use-http";
import {fetchAuth} from "../helpers/AuthHelpers";
import LoadingSpinner from "../components/UI/LoadingSpinner";

import {useHistory} from "react-router";

import {useDispatch} from "react-redux";
import {showNotification} from "../store/notificationSlice";
import {login} from "../store/authSlice";

const SignupPage = () => {
  const username = useInput('text', 'name', 'User Name', (value) => value.trim() !== '')
  const password = useInput('text', 'password', 'Password', (value) => value.trim() !== '')

  const history = useHistory();
  const dispatch = useDispatch();

  const {sendRequest, status, data, error} = useHttp(fetchAuth);

  useEffect(() => {
    if (status === 'completed') {
      if (!error) {
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        dispatch(login(username.value, data.idToken, expirationTime.toISOString()));
        history.push('/')
        dispatch(showNotification('Success!','Successfull Signup','success'));

      } else {
        console.log(error)
        dispatch(showNotification('Signup Error',error,'error'));
      }
    }
    // eslint-disable-next-line
  }, [status]);

  const submitHandler = (e) => {
    e.preventDefault();
    const userData = {
      authType: 'signup',
      username: username.value,
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
          <Input inputHook={username}/>
          <Input inputHook={password}/>
        </div>
        <div className={styles["form-actions"]}>
          <Button styletype='btn2' type='button' onClick={cancelHandler}>Cancel</Button>
          <Button>Sign Up</Button>
        </div>
        {status === 'pending' && <LoadingSpinner/>}
      </Card>
    </Form>
  );
}

export default SignupPage;
