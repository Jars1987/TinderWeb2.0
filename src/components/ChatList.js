import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import ChatRow from './ChatRow';

function ChatList() {
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, Loading] = useAuthState(auth);

  useEffect(() => {
    const unsub = onSnapshot(
      query(
        collection(db, 'matches'),
        where('usersMatched', 'array-contains', user.uid)
      ),
      snapshot =>
        setMatches(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    );

    return unsub;
  }, [user]);

  useEffect(() => {
    const time = setTimeout(() => {
      setIsLoading(() => false);
    }, 500);
    return () => clearTimeout(time);
  }, [user]);

  const flatList =
    matches.length > 0 &&
    matches.map(item => <ChatRow key={item.id} matchDetails={item} />);

  if (Loading) return <Loading />;
  else
    return matches.length > 0 ? (
      <div className='overflow-scroll h-full'>{flatList}</div>
    ) : isLoading ? (
      <div className='max-w-xl mx-auto flex justify-center'>
        <button
          type='button'
          className=' border-[15px] border-t-gray-100 animate-spin border-b-gray-300 border-r-400 rounded-full p-10'
          disabled></button>
      </div>
    ) : (
      <div className='p-5'>
        <p className='text-center text-lg'>Sorry, no Matches at the momment!</p>
      </div>
    );
}

export default ChatList;
