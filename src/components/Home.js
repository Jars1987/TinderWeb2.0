import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import Header from './Header';
import LoadingScreen from './LoadingScreen';
import TinderCards from './TinderCards';

function Home() {
  const [checkProfile, setCheckProfile] = useState(true);
  const [people, setPeople] = useState([]);
  const navigate = useNavigate('/');

  let location = useLocation();

  useEffect(() => {
    if (auth.currentUser.photoURL === null) {
      navigate('/updateprofile');
    }
    setTimeout(() => setCheckProfile(false), 500);
  }, [navigate]);

  useEffect(() => {
    let unsub;
    const fetchCards = async () => {
      const passes = await getDocs(
        collection(db, 'users', auth.currentUser.uid, 'passes')
      ).then(snap => snap.docs.map(doc => doc.id));

      const swipes = await getDocs(
        collection(db, 'users', auth.currentUser.uid, 'swipes')
      ).then(snap => snap.docs.map(doc => doc.id));

      //Firebase querys do not accept empty querys so we pass a string
      const passedUserIds = passes.length > 0 ? passes : ['EmptyArray'];
      const swipedUserIds = swipes.length > 0 ? swipes : ['EmptyArray'];

      unsub = onSnapshot(
        query(
          collection(db, 'users'),
          where('id', 'not-in', [...passedUserIds, ...swipedUserIds])
        ),
        snapshot => {
          setPeople(
            snapshot.docs
              .filter(doc => doc.id !== auth.currentUser.uid)
              .map(doc => ({
                id: doc.id,
                ...doc.data(),
              }))
          );
        }
      );
    };

    fetchCards();
    return unsub;
  }, []);

  return (
    <div>
      {checkProfile && people.length === 0 ? (
        <LoadingScreen />
      ) : (
        <>
          <Header />
          <div className='bg-gray-200'>
            <TinderCards people={people} />
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
