import React, { useRef, useState } from 'react';
import { CameraIcon } from '@heroicons/react/solid';
import { auth, db, storage } from '../firebase';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { signOut, updateProfile } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

/*
Todo: 
    1- update card inputs to have job and age
    2- make refs and make validations for the job and age input
    3- Upload info to firestore
*/

function UpdateProfile() {
  const inputRef = useRef(null);
  const [photoErrorMessage, setPhotoErrorMessage] = useState('');
  const [genderErrorMessage, setGenderErrorMessage] = useState('');
  const [gender, setGender] = useState('');
  const [photo64, setPhoto64] = useState('');
  const [fileName, setFileName] = useState('');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const selectGender = e => {
    setGender(e.target.value);
    setGenderErrorMessage('');
  };

  const convertPhoto = e => {
    setPhotoErrorMessage('');

    setFileName(e.target.files[0].name);

    const reader = new FileReader();

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = readerEvent => {
      setPhoto64(readerEvent.target.result);
    };
  };

  const submitPhoto = async data => {
    if (!inputRef.current.value && gender.length < 1) {
      setPhotoErrorMessage('A profile Picture is required');
      setGenderErrorMessage('Gender is required');
      return;
    }
    if (!inputRef.current.value) {
      setPhotoErrorMessage('A profile Picture is required');
      return;
    }

    if (gender.length < 1) {
      setGenderErrorMessage('Gender is required');
      return;
    }

    const storageRef = ref(storage, `users/${auth.currentUser.uid}`);

    const uploadTask = await uploadString(storageRef, photo64, 'data_url');

    const url = await getDownloadURL(uploadTask.ref);

    try {
      await setDoc(doc(db, 'users', auth.currentUser.uid), {
        id: auth.currentUser.uid,
        displayName: auth.currentUser.displayName,
        photoUrl: url,
        gender: gender,
        age: data.age,
        timestamp: serverTimestamp(),
      });

      console.log('added to firestore');
    } catch (e) {
      console.log(e.message);
      return;
    }

    try {
      await updateProfile(auth.currentUser, {
        photoURL: url,
      });
      console.log('added to user ID');
    } catch (e) {
      console.log(e.message);
    }

    navigate('/');
  };

  const outScreen = () => {
    if (auth.currentUser.photoURL === null) {
      signOut(auth);
    } else {
      navigate('/');
    }
  };

  return (
    <div className='h-screen bg-cover flex flex-col items-center justify-center'>
      <div className='flex flex-col space-y-5'>
        <img
          className='w-3/12 mx-auto'
          loading='lazy'
          src='https://logosmarcas.net/wp-content/uploads/2020/09/Tinder-Logo.png'
          alt=''
        />

        <div className='max-w-xl mx-auto'>
          <p className='text-2xl text-gray-500 px-2 pb-2 font-bold'>
            Welcome {auth.currentUser.displayName}
          </p>
          <form
            onSubmit={handleSubmit(submitPhoto)}
            className='flex flex-col space-y-3'>
            <p className='text-center text-red-500 p-4 font-bold'>
              Step 1: Add a Profile Picture{' '}
            </p>
            <div
              onClick={() => {
                inputRef.current.click();
              }}
              className='mt-1 w-full rounded border outline-none px-3 bg-white flex space-x-1 justify-center cursor-pointer shadow shadow-white'>
              <CameraIcon className='h-5 w-5' />
              <span>{fileName ? fileName : 'Select Photo'}</span>
              <input
                onChange={convertPhoto}
                className='hidden outline-none'
                id='fileUpload'
                placeholder='Select Photo'
                type='file'
                accept='image/*'
                ref={inputRef}
              />
            </div>
            <p className='text-sm text-yellow-500 text-center'>
              {photoErrorMessage ? `* ${photoErrorMessage} *` : ''}
            </p>
            <div className='flex flex-col items-center pb-2 px-3'>
              <p className='text-center text-red-500 p-4 font-bold'>
                Step 2: Add the Age
              </p>
              <input
                className='bg-white outline-none placeholder:text-gray-400 text-black text-center text-xl pb-2'
                type='number'
                placeholder='Enter your Age'
                {...register('age', { required: true })}
              />
              <p className='text-sm text-yellow-500'>
                {errors.age && '* Age is required *'}
              </p>
            </div>
            <div className='flex flex-col items-center pb-2 px-3'>
              <p className='text-center text-red-500 p-4 font-bold'>
                Step 3: Select Gender
              </p>

              <div className='w-full'>
                <div className='flex justify-around items-center'>
                  <label className='flex flex-col items-center'>
                    <img
                      src='https://cdn-icons-png.flaticon.com/512/145/145843.png'
                      alt='Men'
                      className='w-18 h-20 pb-2 opacity-90'
                    />
                    <input
                      type='radio'
                      name='gender'
                      value='male'
                      onChange={selectGender}
                    />
                  </label>

                  <label className='flex flex-col items-center'>
                    <img
                      src='https://cdn-icons-png.flaticon.com/512/219/219969.png'
                      alt='Women'
                      className='w-18 h-20 rounded-full pb-2 opacity-90'
                    />
                    <input
                      type='radio'
                      name='gender'
                      value='female'
                      onChange={selectGender}
                    />
                  </label>
                </div>
              </div>
              <p className='text-sm text-yellow-500'>
                {genderErrorMessage ? `* ${genderErrorMessage} *` : ''}
              </p>
            </div>

            <button
              className='bg-red-400 text-white opacity-50 mt-1 rounded shadow py-3 px-3 hover:opacity-100 outline-none text-xl
            '>
              {auth.currentUser.photoURL === null
                ? 'Create Profile'
                : 'Update Profile'}
            </button>
          </form>
          <p
            className='text-sm text-blue-300 hover:text-blue-600 text-center cursor-pointer mt-2'
            onClick={outScreen}>
            {auth.currentUser.photoURL === null ? 'SignOut' : 'Back'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
