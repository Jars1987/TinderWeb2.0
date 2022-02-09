import React, { useEffect, useState } from 'react';
import PreferencesHeader from './PreferencesHeader';
import Switch from 'react-switch';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useNavigate } from 'react-router-dom';

function PreferencesScreen() {
  const [manChecked, setManChecked] = useState(false);
  const [womenChecked, setWomenChecked] = useState(false);
  const [ageRange, setAgeRange] = useState([18, 100]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleManChange = nextChecked => {
    setManChecked(nextChecked);
    setError('');
  };
  const handleWomenChange = nextChecked => {
    setWomenChecked(nextChecked);
    setError('');
  };

  useEffect(() => {
    setManChecked(true);
    setWomenChecked(true);
  }, []);

  const handleRange = range => {
    setAgeRange(range);
  };

  const handleSearch = () => {
    let gender;
    if (manChecked && womenChecked) gender = 'both';
    else if (manChecked) gender = 'male';
    else if (womenChecked) gender = 'female';
    else return setError('A gender must be selcted');

    navigate('/', {
      state: {
        backgroundLocation: false,
        searchPreferences: { gender, ageRange },
      },
    });
  };

  return (
    <div className='max-w-4xl h-screen mx-auto bg-gray-100'>
      <PreferencesHeader />
      <div className='w-full h-[80%] flex flex-col items-center'>
        <div className='flex flex-col min-w-[70%] max-w-[90%] items-center flex-1 my-5'>
          <h1 className='text-center text-2xl mb-10 rounded-lg font-bold text-white p-5 bg-red-400'>
            Configure Search
          </h1>
          <div className='flex flex-col w-4/6 space-y-5 mb-5 bg-white opacity-90 px-20 pt-5 pb-10 rounded-xl'>
            <p className='text-center text-red-500 font-bold'>
              Select gender to search
            </p>
            <label className='space-x-2 flex justify-between '>
              <span>Male</span>
              <Switch
                onChange={handleManChange}
                checked={manChecked}
                className='react-switch'
                onColor='#86d3ff'
              />
            </label>
            <label className='space-x-2 flex justify-between '>
              <span>Female</span>
              <Switch
                onChange={handleWomenChange}
                checked={womenChecked}
                className='react-switch'
                onColor='#ffb6c1'
              />
            </label>
          </div>
          <div className='flex flex-col w-4/6 space-y-5 mb-5 bg-white opacity-90 px-20 py-10 rounded-xl'>
            <div className='flex justify-between'>
              <p className='text-center text-red-500 font-bold'>
                Select Age Range
              </p>
              <p className='text-center text-red-500 font-bold'>
                {ageRange[0]} - {ageRange[1]}
              </p>
            </div>
            <div>
              <Range
                defaultValue={[18, 100]}
                onChange={handleRange}
                allowCross={false}
              />
            </div>
          </div>
        </div>
        <button
          onClick={handleSearch}
          className='justify-end bg-gray-500 text-white hover:bg-red-400 opacity-90 p-2 rounded-lg w-2/6 '>
          {' '}
          Search
        </button>
        {error && (
          <p className='text-red-600 text-sm text-center my-2'>* {error} *</p>
        )}
      </div>
    </div>
  );
}

export default PreferencesScreen;
