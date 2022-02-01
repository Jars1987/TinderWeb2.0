import React from 'react';
import { useForm } from 'react-hook-form';

/*
Todo: 

  Validate file types to make sure is only png or jpg or jpeg a
  handle the errors
  upload to cloud storage, get URL and update user profile

*/

function AddPhoto() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitPhoto = data => {
    console.log(data);
  };

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
          <form onSubmit={handleSubmit(submitPhoto)}>
            <label>
              <span className='text-gray-100'>Select Photo</span>
              <input
                className='form-input mt-1 w-full rounded border py-2 px-3 outline-none bg-white flex justify-content'
                placeholder='Select Photo'
                type='file'
                {...register(
                  'photo',
                  {
                    required: true,
                  },
                  {
                    onChange: e => console.log(e),
                  }
                )}
              />
            </label>

            <button className='bg-white mt-1 w-full rounded border py-2 px-3 hover:opacity-75'>
              Add Photo To Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddPhoto;
