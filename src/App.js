import {Suspense, useEffect, useState} from "react";
import Header from "./components/layout/Header";
import {BrowserRouter} from 'react-router-dom';
import LoadingSpinner from "./components/UI/LoadingSpinner";
import {Redirect, Route, Switch} from "react-router";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import styles from './App.module.scss';


import useHttp from "./hooks/use-http";
import {fetchAuth, retrieveStoredToken} from "./helpers/AuthHelpers";
import Notification from "./components/layout/Notification";

import {useDispatch, useSelector} from "react-redux";
import {showNotification} from "./store/notificationSlice";
import {login} from "./store/authSlice";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import PrivateRoute from "./components/routing/PrivateRoute";
import Messages from "./components/messages/Messages";
import QuotesPage from "./components/quotes/Quotes";
import QuoteDetailPage from "./pages/QuoteDetailPage";
import AddQuotePage from "./pages/AddQuotePage";
import ProfilePage from "./pages/ProfilePage";
import MeetupsPage from "./pages/MeetupsPage";
import MeetupDetailsPage from "./pages/MeetupDetailsPage";
import NewMeetupPage from "./pages/NewMeetupPage";

function App() {
  const dispatch = useDispatch();
  const notification = useSelector( state => state.notification);

  const {sendRequest, status, data, error} = useHttp(fetchAuth, true);

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
    // eslint-disable-next-line
  }, [status]);


  const [isMessagesOpen, setIsMessagesOpen] = useState(false);

  const hideMessagesHandler = () => {
    setIsMessagesOpen(false);
  }

  const showMessagesHandler = () => {
    setIsMessagesOpen(true);
  }

  return (
    <BrowserRouter>
      <Header onShowCart={showMessagesHandler}/>
      {isMessagesOpen && <Messages onClose={hideMessagesHandler}/>}
      <div className={styles.container}>
        <Suspense fallback={<div className={styles.centered}><LoadingSpinner/></div>}>
          <Switch>
            <Route exact path='/'> <Redirect to='/home'/> </Route>
            <Route exact path='/login'> <LoginPage/></Route>
            <Route exact path='/signup'> <SignupPage/> </Route>
            <PrivateRoute exact path='/home'> <HomePage/> </PrivateRoute>
            <PrivateRoute exact path='/profile'> <ProfilePage/> </PrivateRoute>
            <PrivateRoute exact path='/quotes'> <QuotesPage/> </PrivateRoute>
            <PrivateRoute exact path='/addQuote'> <AddQuotePage/></PrivateRoute>
            <PrivateRoute exact path='/quotes/:quoteId'> <QuoteDetailPage/></PrivateRoute>
            <PrivateRoute exact path='/meetups'> <MeetupsPage/></PrivateRoute>
            <PrivateRoute exact path='/meetups/:meetupId'><MeetupDetailsPage/></PrivateRoute>
            <PrivateRoute exact path='/newMeetup'><NewMeetupPage/></PrivateRoute>
            <Route path='*'> <Redirect to='/home'/>  </Route>
          </Switch>
        </Suspense>
      </div>
      {notification.content.title && (
        <Notification
          title={notification.content.title}
          message={notification.content.message}
          status={notification.content.status}
        />
      )}
      <Footer />
    </BrowserRouter>
  );
}

export default App;
