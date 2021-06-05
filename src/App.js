import {Suspense, useEffect, useState} from "react";
import Header from "./components/layout/Header";
import {BrowserRouter} from 'react-router-dom';
import LoadingSpinner from "./components/UI/LoadingSpinner";
import {Redirect, Route, Switch} from "react-router";
import Login from "./pages/login";
import Signup from "./pages/signup";
import styles from './App.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {login} from "./store/authSlice";
import useHttp from "./hooks/use-http";
import {fetchAuth, retrieveStoredToken} from "./helpers/AuthHelpers";
import Notification from "./components/layout/Notification";
import {showNotification} from "./store/notificationSlice";

function App() {
  const dispatch = useDispatch();
  const notification = useSelector( state => state.notification);


  const {sendRequest, status, data, error} = useHttp(fetchAuth);

  const [token, setToken] = useState(null);
  const [expirationTime, setExpirationTime] = useState(null);

  useEffect(() => {
    const tokenData = retrieveStoredToken();

    if (tokenData) {
      setToken(tokenData.token);
      setExpirationTime(tokenData.expirationTime);
      const userData = {
        authType: 'getuserdata',
        token: tokenData.token,
      }
      sendRequest(userData).then();
    }
  }, [sendRequest]);

  useEffect(() => {
    console.log('App.js / Use Effect, status:'+status)
    if (status === 'completed') {
      if (!error) {
        if (token && data && data.users && data.users[0])
        dispatch(login(data.users[0].email, token, expirationTime));
        dispatch(showNotification('Success!','Already Logged In','success'));
      } else {
        dispatch(showNotification('Login Error', error,'error'));
      }
    }
  }, [status, error, token, data, dispatch, expirationTime]);

  return (
    <BrowserRouter>
      <Header/>
      <div className={styles.container}>
        <Suspense fallback={<div className={styles.centered}><LoadingSpinner/></div>}>
          <Switch>
            <Route exact path='/'> <Redirect to='/home'/> </Route>
            <Route exact path='/login'> <Login/></Route>
            <Route exact path='/signup'> <Signup/> </Route>
            <Route exact path='/home'>
              <div>HOME</div>
            </Route>
          </Switch>
        </Suspense>
      </div>
      {notification.notification && (
        <Notification
          title={notification.notification.title}
          message={notification.notification.message}
          status={notification.notification.status}
        />
      )}
    </BrowserRouter>
  );
}

export default App;
