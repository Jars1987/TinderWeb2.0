import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [hasAccount, setHasAccount] = useState(true);
  const navigate = useNavigate();
  const {
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginUser = async data => {
    const { email, password } = data;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (e) {
      console.error(e.message);
    }
  };

  const createuser = async data => {
    const { name, email, password } = data;
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(userCredential.user, {
      displayName: name,
    });
    navigate('/');
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
          {hasAccount ? (
            <form className='w-full' onSubmit={handleSubmit(loginUser)}>
              <label className='mb-5 block'>
                <span className='text-gray-100'>Email</span>
                <input
                  className='form-input mt-1 w-full rounded border py-2 px-3 outline-none '
                  placeholder='Email...'
                  type='email'
                  {...register('email', { required: true })}
                />
                <div className='text-sm text-yellow-600'>
                  {errors.email && 'Email is required'}
                </div>
              </label>
              <label className='mb-5 block'>
                <span className='text-gray-100'>Password</span>
                <input
                  className='form-input mt-1 w-full rounded border py-2 px-3 outline-none '
                  placeholder='Password'
                  type='password'
                  {...register('password', {
                    required: true,
                  })}
                />
                <div className='text-sm text-yellow-600'>
                  {errors.password && 'Password is required'}
                </div>
              </label>
              <div className='flex flex-col items-center'>
                <button className='bg-white mt-1 w-full rounded border py-2 px-3 hover:opacity-75'>
                  Login
                </button>
                <p
                  className='text-sm text-gray-400 cursor-pointer p-1 hover:text-white'
                  onClick={() => setHasAccount(!hasAccount)}>
                  Don't have an Account? Create one.
                </p>
              </div>
            </form>
          ) : (
            <form className='w-full' onSubmit={handleSubmit(createuser)}>
              <label className='mb-5 block'>
                <span className='text-gray-100'>Full Name</span>
                <input
                  className='form-input mt-1 w-full rounded border py-2 px-3 outline-none'
                  placeholder='Name...'
                  type='text'
                  {...register('name', { required: true })}
                />
                <div className='text-sm text-yellow-600'>
                  {errors.name && 'Name is required'}
                </div>
              </label>
              <label className='mb-5 block'>
                <span className='text-gray-100'>Email</span>
                <input
                  className='form-input mt-1 w-full rounded border py-2 px-3 outline-none '
                  placeholder='Email...'
                  type='email'
                  {...register('email', { required: true })}
                />
                <div className='text-sm text-yellow-600'>
                  {errors.email && 'Email is required'}
                </div>
              </label>
              <label className='mb-5 block'>
                <span className='text-gray-100'>Password</span>
                <input
                  className='form-input mt-1 w-full rounded border py-2 px-3 outline-none '
                  placeholder='Password...'
                  type='password'
                  {...register('password', {
                    required: true,
                    minLength: {
                      value: 6,
                      message: 'Password must have at least 6 characters',
                    },
                  })}
                />
                <div className='text-sm text-yellow-600'>
                  {errors.password?.type === 'required' &&
                    'Password is required'}
                  {errors.password?.type === 'minLength' &&
                    errors.password.message}
                </div>
              </label>
              <label className='mb-5 block'>
                <span className='text-gray-100'>Confirm Password</span>
                <input
                  className='form-input mt-1 w-full rounded border py-2 px-3 outline-none '
                  placeholder='Password...'
                  type='password'
                  {...register('confirm_password', {
                    required: true,
                    validate: value => {
                      return value === getValues('password');
                    },
                  })}
                />
                <div className='text-sm text-yellow-600'>
                  {errors.confirm_password?.type === 'required' &&
                    'Confirming the password is required'}
                  {errors.confirm_password &&
                    errors.confirm_password.type === 'validate' &&
                    'Passwords do not match'}
                </div>
              </label>
              <div className='flex flex-col items-center'>
                <button className='bg-white mt-1 w-full rounded border py-2 px-3 hover:opacity-75'>
                  Create Account
                </button>
                <p
                  className='text-sm text-gray-400 cursor-pointer p-1 hover:text-white'
                  onClick={() => setHasAccount(!hasAccount)}>
                  Already have an Account? Log in!
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
