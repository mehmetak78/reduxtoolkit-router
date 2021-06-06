import React, {Fragment} from 'react';
import {Route, Redirect} from 'react-router-dom';

import {useSelector} from "react-redux";

// An old way of doing this. with components

const PrivateRoute = ({component: Component, ...rest}) => {
  const auth = useSelector(state => state.auth);
  const {isLoggedIn} = auth;

  console.log(isLoggedIn)

  return (
    <Fragment>
      {isLoggedIn &&
        <Route
          {...rest}
          render={props =>
            <Component {...props} />
          }
        />
      }
      {!isLoggedIn &&
      <Redirect to='/login'/>
      }
    </Fragment>
  )
};

export default PrivateRoute
