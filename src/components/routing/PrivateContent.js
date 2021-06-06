import React, {Fragment, useEffect, useState} from 'react';


import {useSelector} from "react-redux";
import {useHistory} from "react-router";

// if you use it inside the component.
// But use PrivateRoute instead for routing.

const PrivateContent = (props) => {
  const auth = useSelector(state=> state.auth);
  const {isLoggedIn} = auth;

  const [isLoaded, setisLoaded] = useState(false);

  useEffect(() => {
    setisLoaded(true)
  }, [isLoggedIn]);


  const history = useHistory();

  if (isLoaded && !isLoggedIn) {
    history.push('/login')
  }

  return (
    <Fragment>
      {isLoggedIn && props.children}
    </Fragment>
  );
}

export default PrivateContent;
