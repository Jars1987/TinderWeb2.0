import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ModalMatch() {
  const location = useLocation();
  const navigate = useNavigate();

  const { userSwipe, loggedInProfile } = location.state.users;

  const goToChats = () => {
    navigate('/chats');
    return;
  };

  return (
    <div className='absolute top-0 bg-red-500 h-screen w-full opacity-90 z-[999]'>
      <div className='relative flex justify-center'>
        <div className='flex flex-col items-center px-10 pt-20 max-w-3xl'>
          <img
            src='https://links.papareact.com/mg9'
            alt={`It's a match`}
            className='h-400 w-full'
          />

          <p className='text-white text-center mt-5'>
            You and {userSwipe.displayName} have liked each other.
          </p>
          <div className='flex justify-evenly mt-14 w-full'>
            <img
              src={loggedInProfile.photoUrl}
              alt={loggedInProfile.displayName}
              className='h-40 w-40 rounded-full'
            />
            <img
              src={userSwipe.photoUrl}
              alt={userSwipe.displayName}
              className='h-40 w-40 rounded-full'
            />
          </div>

          <button
            className='bg-white px-20 py-8 rounded-full mt-20 text-center'
            onClick={goToChats}>
            Send a Message
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalMatch;
