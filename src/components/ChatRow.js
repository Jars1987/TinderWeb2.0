import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import getMatchedUserInfo from '../lib/getMatchedUserInfo';

function ChatRow({ matchDetails }) {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [matchedUserInfo, setMatchedUserInfo] = useState(null);
  const [lastMessage, setLastMessage] = useState(null);

  useEffect(() => {
    setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user.uid));
  }, [matchDetails, user]);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, 'matches', matchDetails.id, 'messages'),
          orderBy('timestamp', 'desc')
        ),
        snapshot => setLastMessage(snapshot.docs[0]?.data()?.message)
      ),
    [matchDetails]
  );

  return (
    <div
      onClick={() => navigate('/message', { state: { matchDetails } })}
      className='flex items-center shadow py-3 px-4 bg-white mx-3 my-1 rounded-lg cursor-pointer hover:opacity-70'>
      <img
        className=' h-16 w-16 rounded-full mr-4 '
        src={matchedUserInfo?.photoUrl}
        alt={matchedUserInfo?.displayName}
      />
      <div>
        <p className='text-lg font-semibold'>{matchedUserInfo?.displayName}</p>
        <p>{lastMessage || 'Say Hi!'}</p>
      </div>
    </div>
  );
}

export default ChatRow;
