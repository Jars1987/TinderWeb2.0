import { useState } from 'react';
import TinderCard from 'react-tinder-card';

function TinderCards() {
  const [people, setPeople] = useState([
    {
      name: 'Steve Jobs',
      url: 'https://p7z2w8n8.rocketcdn.me/wp-content/uploads/2020/09/steve-jobs-vida-e-carreira-do-empresario-a-frente-da-apple-1024x576.jpg',
      job: 'Master Mind',
      age: '52',
    },
    {
      name: 'Britney Spears',
      url: 'https://exame.com/wp-content/uploads/2021/09/2021-07-06T150958Z_1_LYNXNPEH650WG_RTROPTP_4_PEOPLE-BRITNEY-SPEARS-1.jpg',
      job: 'Singer',
      age: '40',
    },
    {
      name: 'Sandra Bullock',
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Sandra_Bullock_%289192365016%29.jpg/800px-Sandra_Bullock_%289192365016%29.jpg',
      job: 'Actress',
      age: '49',
    },
  ]);

  return (
    <div className=''>
      <div className='flex justify-center mt-[5vh]'>
        {people &&
          people.map(person => (
            <TinderCard
              className='swipe absolute'
              key={person.name}
              preventSwipe={['up', 'down']}>
              <div
                style={{
                  backgroundImage: `url(${person.url})`,
                }}
                className='relative max-w-[85vh] w-[600px] h-[55vh] rounded-t-2xl bg-cover bg-center p-5 bg-no-repeat'></div>
              <div className='bg-white shadow-md rounded-b-2xl h-[12vh] p-5'>
                <div className='flex justify-between w-10/12 mx-auto'>
                  <div>
                    <p className='text-xl font-bold'>{person.name}</p>
                    <p>{person.job}</p>
                  </div>
                  <p className='text-xl font-bold'>{person.age}</p>
                </div>
              </div>
            </TinderCard>
          ))}
      </div>
    </div>
  );
}

export default TinderCards;
