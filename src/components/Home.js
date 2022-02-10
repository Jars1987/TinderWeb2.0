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
import filterPeopleArr from '../lib/filterPeopleArr';

function Home() {
  const [checkProfile, setCheckProfile] = useState(true);
  const [people, setPeople] = useState([]);
  const [filteredPeople, setFilteredPeople] = useState([]);
  const navigate = useNavigate('/');
  const location = useLocation();

  console.log(filteredPeople);

  useEffect(() => {
    if (auth.currentUser.photoURL === null) {
      navigate('/updateprofile');
    }
    setTimeout(() => setCheckProfile(() => false), 1500);
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

  useEffect(() => {
    if (!location.state || !location.state.searchPreferences) {
      setFilteredPeople(filterPeopleArr(people, 'both', [18, 100]));
      console.log('Filtered function called no location');
    } else {
      const { gender, ageRange } = location.state.searchPreferences;
      setFilteredPeople(filterPeopleArr(people, gender, ageRange));
      console.log('Filtered function called with location');
    }
  }, [people, location]);

  return (
    <div>
      {checkProfile && people.length === 0 ? (
        <LoadingScreen />
      ) : (
        <>
          <Header />
          <div className='bg-gray-200'>
            <TinderCards people={filteredPeople} />
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
