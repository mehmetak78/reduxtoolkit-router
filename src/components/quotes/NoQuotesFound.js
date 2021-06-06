import classes from './NoQuotesFound.module.css';
import {NavLink} from "react-router-dom";

const NoQuotesFound = () => {
  return (
    <div className={classes.noquotes}>
      <p>No quotes found!</p>
      <NavLink to='/newquote'>Add a Quote</NavLink>
    </div>
  );
};

export default NoQuotesFound;
