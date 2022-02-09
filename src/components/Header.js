import { ChatAlt2Icon } from '@heroicons/react/solid';
import Button from '@material-tailwind/react/Button';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

function Header() {
  const navigate = useNavigate();
  return (
    <div className='max-w-4xl mx-auto flex justify-between p-5'>
      <Button
        onClick={() => signOut(auth)}
        color='lightgray'
        buttonType='link'
        size='regular'
        rounded={true}
        block={false}
        iconOnly={true}
        ripple='dark'>
        <img
          className='w-8 h-8 rounded-full'
          loading='lazy'
          src={auth.currentUser.photoURL}
          alt={auth.currentUser.displayName}
        />
      </Button>

      <img
        className='w-10 h-10 object-contain cursor-pointer'
        src='https://www.citypng.com/public/uploads/preview/-11595270396ei6vchptvb.png'
        loading='lazy'
        alt='Tinder Logo'
        onClick={() => navigate('/updateprofile')}
      />
      <Button
        onClick={() => navigate('/chats')}
        color='lightgray'
        buttonType='link'
        size='regular'
        rounded={true}
        block={false}
        iconOnly={true}
        ripple='dark'>
        <ChatAlt2Icon className='w-8 h-8 text-red-400' />
      </Button>
    </div>
  );
}

export default Header;

// logo URL https://w7.pngwing.com/pngs/399/756/png-transparent-tinder-logo-computer-icons-tinder-angle-logo-magenta.png
// tinder
