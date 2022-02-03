import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import Header from './Header';
import LoadingScreen from './LoadingScreen';
import TinderCards from './TinderCards';

function Home() {
  const [checkProfile, setCheckProfile] = useState(true);
  const navigate = useNavigate('/');

  useEffect(() => {
    if (auth.currentUser.photoURL === null) {
      navigate('/updateprofile');
    }
    setTimeout(() => setCheckProfile(false), 500);
  }, [navigate]);

  return (
    <div>
      {checkProfile ? (
        <LoadingScreen />
      ) : (
        <>
          <Header />
          <div className='bg-gray-200'>
            <TinderCards />
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
