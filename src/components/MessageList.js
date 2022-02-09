import { useEffect, useRef } from 'react';
import ReceiverMessage from './ReceiverMessage';
import SenderMessage from './SenderMessage';

function MessageList({ messages, user }) {
  const messageRef = useRef(null);
  // Add a ref and add scroll to bottom on useEfect

  useEffect(() => {
    messageRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className='flex flex-col h-full overflow-scroll p-2'>
      {messages.map(message =>
        message.userId === user.uid ? (
          <SenderMessage key={message.id} message={message} />
        ) : (
          <ReceiverMessage key={message.id} message={message} />
        )
      )}
      <div ref={messageRef} className='w-full'></div>
    </div>
  );
}

export default MessageList;
