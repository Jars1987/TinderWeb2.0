import { Button } from '@material-tailwind/react';
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useLocation } from 'react-router-dom';
import { auth, db } from '../firebase';
import getMatchedUserInfo from '../lib/getMatchedUserInfo';
import HeaderChats from './HeaderChats';
import MessageList from './MessageList';

function MessageScreen() {
  const location = useLocation();
  const [input, setInput] = useState();
  const matchDetails = location.state.matchDetails;
  const [user] = useAuthState(auth);

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      query(
        collection(db, 'matches', matchDetails.id, 'messages'),
        orderBy('timestamp', 'asc')
      ),
      snapshot =>
        setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    );
    return unsub;
  }, [matchDetails]);

  const sendMessage = e => {
    e.preventDefault();

    addDoc(collection(db, 'matches', matchDetails.id, 'messages'), {
      timestamp: serverTimestamp(),
      userId: user.uid,
      displayName: user.displayName,
      photoUrl: matchDetails.users[user.uid].photoUrl,
      message: input,
    });

    setInput('');
  };

  return (
    <div className='max-w-4xl mx-auto h-screen'>
      <HeaderChats
        title={getMatchedUserInfo(matchDetails.users, user.uid).displayName}
        callEnabled
      />
      <div className='flex-1 h-5/6 max-h-[75%]'>
        <MessageList messages={messages} user={user} />

        <div className='flex items-center border-t border-gray-200 px-5 py-2 mx-2'>
          <form className='flex w-full h-10' onSubmit={sendMessage}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              className='text-lg h-10 w-full outline-none'
              type='text'
              placeholder='Send Message...'
            />

            <Button
              onClick={sendMessage}
              className='mx-2 px-5'
              onClick={sendMessage}
              color='pink'
              buttonType='link'
              size='lg'
              rounded={true}
              block={false}
              iconOnly={true}
              ripple='dark'>
              <p className='text-pink-300 text-lg p-2 font-medium'>Send</p>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MessageScreen;
