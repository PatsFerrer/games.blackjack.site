'use client'
import { useEffect, useState, useContext } from 'react';
import io from 'socket.io-client';
import { EventosContext } from '@/context/EventosContext';

export default async function ConexaoMesa() {
  const context = useContext(EventosContext);
  if (!context) {
    throw new Error('ConexaoMesa must be used within a MessagesProvider');
  }

  const { setEventos } = context;

  useEffect(() => {
    // console.log(process.env.API_URL);
    const socket = io("https://blackjack-socket.azurewebsites.net", {
      transports: ['websocket'],
    });

    socket.on('connect', () => {
      console.log('Connected to socket server');
    });

    socket.on('mensagem', (evento: string) => {
      console.log(`mensagem recebida ${evento}`);
      setEventos((prevEventos) => [...prevEventos, evento]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div></div>
  )
}
