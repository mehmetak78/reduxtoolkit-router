import React, {Fragment} from 'react';
import {Redirect, Route} from 'react-router-dom';
import {useSelector} from "react-redux";

const PrivateRoute = (props) => {
  const auth = useSelector(state=> state.auth);
  const {isLoggedIn} = auth;

  return (
    <Fragment>
      {isLoggedIn &&
        <Route {...props}>
          {props.children}
        </Route>
      }
      {!isLoggedIn &&
        <Redirect to='/login'/>
      }
    </Fragment>
  );
};

export default PrivateRoute;
