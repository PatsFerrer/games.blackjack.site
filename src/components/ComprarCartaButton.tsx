'use client'

import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GiCardPickup } from 'react-icons/gi';
import { useParams } from 'next/navigation';
import io from 'socket.io-client';
import comprarCarta from '@/app/(auth)/mesa/_actions/comprarCarta';

interface ComprarCartaButtonProps {
  onCartaComprada: () => void; // Função para chamar após comprar a carta
}

const socket = io("https://blackjack-socket.azurewebsites.net", {
  transports: ['websocket'],
});

const ComprarCartaButton: React.FC<ComprarCartaButtonProps> = ({ onCartaComprada }) => {
  const { salaId } = useParams<{ salaId: string }>();

  const handleCompraCarta = async () => {
    try {
      const result = await comprarCarta(salaId);
      if (result.success) {
        console.log('Compra de carta realizada com sucesso');
        onCartaComprada();
      } else {
        toast.error(result.message || 'Erro ao comprar carta');
      }
    } catch (error) {
      console.error('Erro ao processar compra de carta', error);
      toast.error('Erro ao comprar carta');
    }
  };

  return (
    <div>
      {/* Botões para compra de carta */}
      <button onClick={handleCompraCarta} className="md:hidden btn bg-blue-950 text-white hover:bg-blue-900">
        <GiCardPickup />
      </button>
      <button onClick={handleCompraCarta} className="hidden md:flex btn bg-blue-950 text-white hover:bg-blue-900">
        <GiCardPickup />
        Comprar
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

export default ComprarCartaButton;