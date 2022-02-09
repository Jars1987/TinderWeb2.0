import { ChevronLeftIcon } from '@heroicons/react/solid';
import { PhoneIcon } from '@heroicons/react/outline';
import { Button } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';

function HeaderChats({ title, callEnabled }) {
  const navigate = useNavigate();

  return (
    <div className='max-w-4xl mx-auto flex justify-between p-5 items-center'>
      <div className='flex items-center'>
        <Button
          onClick={() => {
            if (callEnabled) {
              navigate(-1);
            } else {
              navigate('/', { state: { backgroundLocation: false } });
            }
          }}
          color='gray'
          buttonType='link'
          size='lg'
          rounded={true}
          block={false}
          iconOnly={true}
          ripple='dark'>
          <ChevronLeftIcon className='h-14 w-14 text-red-300' />
        </Button>
        <h1 className='text-3xl pl-2 font-bold pt-2'>{title}</h1>
      </div>
      {callEnabled && (
        <Button
          className='mt-2'
          color='ligthgray'
          buttonType='link'
          size='lg'
          rounded={true}
          block={false}
          iconOnly={true}
          ripple='dark'>
          <div className='rounded-full mr-4 p-2 bg-red-200 opacity-80'>
            <PhoneIcon className='h-8 w-8 text-red-500 ' />
          </div>
        </Button>
      )}
    </div>
  );
}

export default HeaderChats;
