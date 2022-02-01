import { UserIcon } from '@heroicons/react/solid';
import { ChatAlt2Icon } from '@heroicons/react/solid';
import Button from '@material-tailwind/react/Button';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

function Header() {
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
        <UserIcon className='w-8 h-8 text-gray-700' />
      </Button>

      <img
        className='w-8 h-8 object-contain'
        src='https://www.citypng.com/public/uploads/preview/-11595270396ei6vchptvb.png'
        loading='lazy'
        alt='Tinder Logo'
      />
      <Button
        color='lightgray'
        buttonType='link'
        size='regular'
        rounded={true}
        block={false}
        iconOnly={true}
        ripple='dark'>
        <ChatAlt2Icon className='w-8 h-8 text-gray-700' />
      </Button>
    </div>
  );
}

export default Header;

// logo URL https://w7.pngwing.com/pngs/399/756/png-transparent-tinder-logo-computer-icons-tinder-angle-logo-magenta.png
// tinder
