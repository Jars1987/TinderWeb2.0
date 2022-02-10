import { ChevronLeftIcon } from '@heroicons/react/solid';
import { Button } from '@material-tailwind/react';
import React from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function PreferencesHeader() {
  const navigate = useNavigate();

  return (
    <div className='max-w-4xl mx-auto flex justify-between p-5 items-center'>
      <div className='flex items-center'>
        <Button
          onClick={() => navigate(-1, { state: { backgroundLocation: false } })}
          color='gray'
          buttonType='link'
          size='lg'
          rounded={true}
          block={false}
          iconOnly={true}
          ripple='dark'>
          <ChevronLeftIcon className='h-14 w-14 text-red-300' />
        </Button>
        <h1 className='text-3xl pl-2 font-bold pt-2'>Back</h1>
      </div>

      <Button
        className='mt-2'
        onClick={() => {
          signOut(auth);
        }}
        color='ligthgray'
        buttonType='link'
        size='lg'
        rounded={true}
        block={false}
        iconOnly={true}
        ripple='dark'>
        <img
          className='h-10 w-10 rounded-full'
          src={auth.currentUser.photoURL}
          alt={auth.currentUser.displayName}
        />
      </Button>
    </div>
  );
}

export default PreferencesHeader;
