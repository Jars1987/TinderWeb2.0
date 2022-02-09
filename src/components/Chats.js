import ChatList from './ChatList';
import HeaderChats from './HeaderChats';

function Chats() {
  return (
    <div className='bg-gray-100 max-w-4xl mx-auto'>
      <HeaderChats title='Chat' />
      <ChatList />
    </div>
  );
}

export default Chats;
