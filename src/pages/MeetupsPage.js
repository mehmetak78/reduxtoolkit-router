import {Fragment, useEffect} from "react";
import MeetupList from "../components/meetups/MeetupList";

import {showNotification} from "../store/notificationSlice";
import {useDispatch} from "react-redux";

//import {MongoClient} from "mongodb";

//import keys from "../config/keys";

const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'A First Meetup',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
    address: 'Some address 5, 12345 Some City',
    description: 'This is a first meetup!'
  },
  {
    id: 'm2',
    title: 'A Second Meetup',
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/African_bush_elephants_%28Loxodonta_africana%29_female_with_six-week-old_baby.jpg',
    address: 'Some address 10, 12345 Some City',
    description: 'This is a second meetup!'
  }
];


const MeetupsPage = (props) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showNotification('Warning','Needs Mongo Service', 'warning'))
  }, [dispatch]);

  return (
    <Fragment>
      <MeetupList meetups={DUMMY_MEETUPS}/>
    </Fragment>
  );
};
/*

export async function getStaticProps() {
  // fetch data from an API
  const client = await MongoClient.connect(
    keys.mongoURI
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  await client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}
*/


export default MeetupsPage;
