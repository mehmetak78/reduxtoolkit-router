import React, {useEffect} from 'react';
import Card from "../components/UI/Card";
import styles from './Login.module.scss'
import Form from "../components/UI/Form";
import useInput from "../hooks/useInput";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";


import useHttp from "../hooks/use-http";
import {fetchAuth} from "../helpers/AuthHelpers";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import {useHistory} from "react-router";
import {login} from "../store/authSlice";

import {useDispatch} from "react-redux";
import {showNotification} from "../store/notificationSlice";


const LoginPage = (props) => {
  const username = useInput('text', 'name', 'User Name', (value) => value.trim() !== '')
  const password = useInput('text', 'password', 'Password', (value) => value.trim() !== '')

  const history = useHistory();
  const dispatch = useDispatch();

  const {sendRequest, status, data, error} = useHttp(fetchAuth);

  useEffect(() => {
    console.log('login.js / Use Effect')
    if (status === 'completed') {
      if (!error) {
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );

        dispatch(login(username.value, data.idToken, expirationTime.toISOString()));
        history.push('/')
        dispatch(showNotification('Success!','Successfull Login','success'));
      } else {
        dispatch(showNotification('Login Error',error,'error'));
      }
    }
    // eslint-disable-next-line
  }, [status], error);

  const submitHandler = (e) => {
    e.preventDefault();
    const userData = {
      authType: 'login',
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
          <Button>Login</Button>
        </div>
        {status === 'pending' && <LoadingSpinner/>}
      </Card>
    </Form>
  );
}

export default LoginPage;
