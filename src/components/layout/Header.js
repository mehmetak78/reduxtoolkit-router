import React from 'react';
import LogoMak from "./LogoMAK";
import styles from './Header.module.scss'

import {NavLink} from "react-router-dom";

import {logout} from "../../store/authSlice";

import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {showNotification} from "../../store/notificationSlice";
import HeaderMessagesButton from "../messages/HeaderMessagesButton";

const Header = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(showNotification('Success!', 'Successfull Logout', 'success'));
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <LogoMak/>
        <p>Redux Toolkit & Router</p>
      </div>
      <nav className={styles.nav}>
        {!auth.isLoggedIn &&
        <ul>
          <li>
            <NavLink to='/login' activeClassName={styles.active}>
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to='/signup' activeClassName={styles.active}>
              Signup
            </NavLink>
          </li>
        </ul>
        }
        {auth.isLoggedIn &&
        <ul>
          <li>
            <NavLink to='/' activeClassName={styles.active}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/quotes' activeClassName={styles.active}>
              Quotes
            </NavLink>
          </li>
          <li>
            <NavLink to='/addQuote' activeClassName={styles.active}>
              Add Quote
            </NavLink>
          </li>
          <li>
            <NavLink to='/meetups' activeClassName={styles.active}>
              Meetups
            </NavLink>
          </li>
          <li>
            <NavLink to='/newMeetup' activeClassName={styles.active}>
              New Meetup
            </NavLink>
          </li>
          <li>
            <NavLink to='/profile' activeClassName={styles.active}>
              Profile
            </NavLink>
          </li>
          <li>
            <button className={styles.button} onClick={logoutHandler}>Logout</button>
          </li>
        </ul>
        }
      </nav>
      <HeaderMessagesButton onClick={props.onShowCart}/>
    </header>
  );
};

export default Header;
