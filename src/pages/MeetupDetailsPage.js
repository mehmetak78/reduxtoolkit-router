//import {MongoClient, ObjectId} from 'mongodb';
import MeetupDetail from '../components/meetups/MeetupDetail';

const DUMMY_MEETUP =
  {
    id: 'm1',
    title: 'A First Meetup',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
    address: 'Some address 5, 12345 Some City',
    description: 'This is a first meetup!'
  };


function MeetupDetails(props) {
  return (
    <MeetupDetail
      image={DUMMY_MEETUP.image}
      title={DUMMY_MEETUP.title}
      address={DUMMY_MEETUP.address}
      description={DUMMY_MEETUP.description}
    />
  );
}

/*

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    'mongodb+srv://mehmet:mustafa@cluster0.h2qfr.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find({}, {_id: 1}).toArray();

  client.close();

  return {
    fallback: 'blocking',
    paths: meetups.map((meetup) => ({
      params: {meetupId: meetup._id.toString()},
    })),
  };
}

export async function getStaticProps(context) {
  // fetch data for a single meetup

  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    'mongodb+srv://mehmet:mustafa@cluster0.h2qfr.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const selectedMeetup = await meetupsCollection.findOne({
                                                           _id: ObjectId(meetupId),
                                                         });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}
*/

export default MeetupDetails;
