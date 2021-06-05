import React from 'react';

import LogoMak from "./LogoMAK";
import styles from './Header.module.scss'
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";

import {logout} from "../../store/authSlice";
import {useDispatch} from "react-redux";
import {showNotification} from "../../store/notificationSlice";

const Header = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector( state => state.auth);

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(showNotification('Success!','Successfull Logout','success'));
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
            <NavLink to='/products' activeClassName={styles.active}>
              Products
            </NavLink>
          </li>
          <li>
            <NavLink to='/quotes' activeClassName={styles.active}>
              Quotes
            </NavLink>
          </li>
          <li>
            <NavLink to='/newquote' activeClassName={styles.active}>
              Add Quote
            </NavLink>
          </li>
          <li>
            <NavLink to='/meetups' activeClassName={styles.active}>
              Meetups
            </NavLink>
          </li>
          <li>
            <NavLink to='/new-meetup' activeClassName={styles.active}>
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
    </header>
  );
};

export default Header;
