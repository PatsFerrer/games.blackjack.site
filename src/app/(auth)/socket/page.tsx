// pages/SocketPage.js
'use client'
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketPage = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    const socket = io('http://localhost:3002', {
      transports: ['websocket'],
    });

    socket.on('connect', () => {
      console.log('Connected to socket server');
    });

    socket.on('mensagem', (message: string) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    const socket = io('http://localhost:3002', {
      transports: ['websocket'],
    });

    socket.emit('mensagem', inputMessage);
    setInputMessage('');
  };

  return (
    <div>
      <h1>Socket.io Messages</h1>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
};

export default SocketPage;
