import { createRef, useMemo, useRef, useState } from 'react';
import TinderCard from 'react-tinder-card';
import { XIcon } from '@heroicons/react/solid';
import { HeartIcon } from '@heroicons/react/solid';
import Button from '@material-tailwind/react/Button';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import generateId from '../lib/generateId';
import { Link, useLocation } from 'react-router-dom';

function TinderCards({ people }) {
  /* The reason I am using currentIndex starting in 0 and not on people.length
    is because when we start the people state is undfinned and when we
    use the useEffect to update people is not going to update the currentIndex
    because the default value has already been updated so we do everything the other way
    by the time we need people on the swipe action people is an array of values.
*/
  const modalRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zIndex, setZIndex] = useState('-z-50');
  const [matchedUsers, setMatchedUsers] = useState({});
  let location = useLocation();

  const swipeLeft = index => {
    if (!people[index]) return;
    const userSwipe = people[index];
    console.log(`You swiped Pass on ${userSwipe.displayName}`);
    setDoc(
      doc(db, 'users', auth.currentUser.uid, 'passes', userSwipe.id),
      userSwipe
    );
  };

  const swipeRight = async index => {
    if (!people[index]) return;
    const userSwipe = people[index];

    const loggedInProfile = await (
      await getDoc(doc(db, 'users', auth.currentUser.uid))
    ).data();

    setDoc(
      doc(db, 'users', auth.currentUser.uid, 'swipes', userSwipe.id),
      userSwipe
    );

    //check if a user has swipped on you this should be done on server side but this app is just front endpoint
    //in production this could be a data breach
    await getDoc(
      doc(db, 'users', userSwipe.id, 'swipes', auth.currentUser.uid)
    ).then(docSnap => {
      if (docSnap.exists()) {
        //then user has matched with you before you matched with them
        //Create Match
        console.log(`You matched with ${userSwipe.displayName}`);

        setDoc(
          doc(db, 'matches', generateId(auth.currentUser.uid, userSwipe.id)),
          {
            users: {
              [auth.currentUser.uid]: loggedInProfile,
              [userSwipe.id]: userSwipe,
            },
            usersMatched: [auth.currentUser.uid, userSwipe.id],
            timestamp: serverTimestamp(),
          }
        );

        setMatchedUsers({
          loggedInProfile,
          userSwipe,
        });

        modalRef.current.click();
      } else {
        console.log(`You swiped on ${userSwipe.displayName}`);
      }
    });
  };

  const swipe = async dir => {
    const delteIndex = people.length - 1 - currentIndex;
    if (currentIndex <= people.length - 1) {
      await childRefs[delteIndex].current.swipe(dir); // Swipe the card!
    }
  };

  const onSwipe = direction => {
    const swipeIndex = people.length - 1 - currentIndex;

    if (currentIndex === people.length - 1 || people.length === 0) {
      setZIndex('z-1');
    }

    if (direction === 'left') swipeLeft(swipeIndex);
    if (direction === 'right') swipeRight(swipeIndex);

    setCurrentIndex(currentIndex + 1);
  };

  const childRefs = useMemo(
    () =>
      Array(people.length)
        .fill(0)
        .map(i => createRef()),
    [people]
  );

  return (
    <div className=''>
      <div className='flex justify-center items-end h-[80vh] mt-[5vh] bg-white'>
        <div className={`absolute bottom-72 ${zIndex}`}>
          <Link
            to={'/'}
            state={{ backgroundLocation: location, users: matchedUsers }}>
            <button ref={modalRef} className='hidden'></button>
          </Link>

          <p className='font-bold p-5'>No more profiles</p>
          <img
            src='https://links.papareact.com/6gb'
            className='h-48 w-full'
            alt=''
          />
        </div>
        {people &&
          people.map((person, index) => (
            <TinderCard
              key={person.id}
              ref={childRefs[index]}
              onSwipe={dir => onSwipe(dir)}
              className='swipe absolute mb-24'
              preventSwipe={['up', 'down']}>
              <div
                style={{
                  backgroundImage: `url(${person.photoUrl})`,
                }}
                className='relative max-w-[85vh] w-[600px] h-[55vh] rounded-t-2xl bg-cover bg-center p-5 bg-no-repeat'></div>
              <div className='bg-white shadow-md rounded-b-2xl h-[12vh] p-5'>
                <div className='flex justify-between w-10/12 mx-auto'>
                  <div>
                    <p className='text-xl font-bold'>{person.displayName}</p>
                    <p>{person.job}</p>
                  </div>
                  <p className='text-xl font-bold'>{person.age}</p>
                </div>
              </div>
            </TinderCard>
          ))}
        {people && (
          <div className='flex justify-center w-3/6 p-2'>
            <div className='flex justify-between items-center w-3/6'>
              <div className='flex justify-center items-center bg-red-100 rounded-full bg-opacity-30 w-14 h-14 cursor-pointer '>
                <Button
                  onClick={() => swipe('left')}
                  color='darkgray'
                  buttonType='link'
                  size='lg'
                  rounded={true}
                  block={false}
                  iconOnly={true}
                  ripple='dark'>
                  <XIcon className='w-6 h-6 text-red-700' />
                </Button>
              </div>
              <div className='flex justify-center items-center rounded-full w-14 h-14 bg-green-100 bg-opacity-30 cursor-pointer'>
                <Button
                  onClick={() => swipe('right')}
                  color='darkgray'
                  buttonType='link'
                  size='lg'
                  rounded={true}
                  block={false}
                  iconOnly={true}
                  ripple='dark'>
                  <HeartIcon className='w-6 h-6 text-green-700' />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TinderCards;
