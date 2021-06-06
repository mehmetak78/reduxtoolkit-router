import classes from './QuoteItem.module.css';
import {NavLink} from "react-router-dom";


const QuoteItem = (props) => {
  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          <p>{props.text}</p>
        </blockquote>
        <figcaption>{props.author}</figcaption>
      </figure>
      <NavLink to={`/quotes/${props.id}`}>View Fullscreen</NavLink>
    </li>
  );
};

export default QuoteItem;
