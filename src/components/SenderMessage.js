import React from 'react';

function SenderMessage({ message }) {
  return (
    <div className='bg-purple-600 rounded-b-lg rounded-tl-lg px-5 py-3 my-2 self-start ml-auto'>
      <p className='text-white'>{message.message}</p>
    </div>
  );
}

export default SenderMessage;
