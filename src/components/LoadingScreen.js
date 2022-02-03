import React from 'react';

function LoadingScreen() {
  return (
    <div
      className={`bg-[url('https://gimlet.spotifycdn.com/hero/166bdc6f-488f-4a63-8b2b-c9d4eeeab9ad/fallback.jpg')] bg-no-repeat bg-center h-screen bg-cover flex flex-col items-center justify-center`}>
      <div className='flex flex-col space-y-5'>
        <img
          className='w-3/6 mx-auto'
          loading='lazy'
          src='https://ftr.imgix.net/1jPnPencd6cdp8vdWL7tQv/8e7f7ed6c8d0faa22596e8926d758a8d/tinder-phone.svg?auto=format%2Ccompress&cs=srgb&dpr=1&fit=max&q=60&w=156&s=3a4f0934d8241512dee09d5438e8bb5d'
          alt=''
        />

        <div className='max-w-xl mx-auto'>
          <button
            type='button'
            className=' border-[15px] border-t-gray-100 animate-spin border-b-gray-300 border-r-400 rounded-full p-10'
            disabled></button>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
