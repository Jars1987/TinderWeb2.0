import React from 'react';
import { useLocation } from 'react-router-dom';

function ModalMatch() {
  const location = useLocation();

  const { userSwipe, loggedInProfile } = location.state.users;

  return (
    <div className='absolute top-0 bg-red-500 h-screen w-full opacity-70 z-[999]'>
      <div className='relative h-full w-full'>
        <h4 className=''>This the</h4>
      </div>
    </div>
  );
}

export default ModalMatch;
