import React from 'react';

function ReceiverMessage({ message }) {
  console.log(message);
  return (
    <div className=' flex items-center space-x-1 ml-14 self-start'>
      <img src={message.photoUrl} alt='' className='h-10 w-10 rounded-full' />
      <div className='bg-red-400 rounded-b-lg rounded-tr-lg px-5 py-3 my-2'>
        <p className='text-white'>{message.message}</p>
      </div>
    </div>
  );
}

export default ReceiverMessage;
