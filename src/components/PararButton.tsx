'use client'

import React from 'react';
import { pararJogada } from '@/app/api/servicos/jogoServico';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'next/navigation';
import { TbHandStop } from "react-icons/tb";
import io from 'socket.io-client';

const socket = io(`${process.env.REACT_APP_SOCKET_URL}`, {
  transports: ['websocket'],
});

const PararJogadaButton = () => {
  const { salaId } = useParams<{ salaId: string }>();

  const handlePararJogada = async () => {
    try {
      const result = await pararJogada(salaId);
      if (result.ok) {
        console.log('Parada realizada com sucesso');
        const evento = {
          SalaId: salaId,
          Tipo: 3
        };
        socket.emit('mensagem', JSON.stringify(evento))
      } else {
        toast.error(result.statusText || 'Erro ao parar');
      }
    } catch (error) {
      console.error('Erro ao processar parada', error);
      toast.error('Erro ao parar');
    }
  };

  return (
    <div>
      {/* Botões para compra de carta */}
      <button onClick={handlePararJogada} className="md:hidden btn bg-blue-950 text-white hover:bg-blue-900">
          <TbHandStop />
        </button>
        <button onClick={handlePararJogada} className="hidden md:flex btn bg-blue-950 text-white hover:bg-blue-900">
          <TbHandStop />
          Parar
        </button>

      {/* Exibição de toast de erro */}
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default PararJogadaButton;
