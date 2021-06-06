import Card from '../UI/Card';
import classes from './MeetupItem.module.css';
import {useHistory} from "react-router-dom";


const MeetupItem = (props) => {

  const history = useHistory();

  const showDetailsHandler = () => {
    history.push('/meetups/' + props.id);
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
        </div>
        <div className={classes.actions}>
          <button onClick={showDetailsHandler}>Show Details</button>  {/*can also be a Link*/}
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
