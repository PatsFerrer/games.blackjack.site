'use client'

import React from 'react';
import { comprarCarta } from '@/app/api/endpoints';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GiCardPickup } from 'react-icons/gi';

const ComprarCartaButton = () => {
  const handleCompraCarta = async () => {
    try {
      const result = await comprarCarta();
      if (result.success) {
        console.log('Compra de carta realizada com sucesso');
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
      <button onClick={handleCompraCarta} className="md:hidden btn bg-blue-950 text-white hover:bg-blue-900 absolute bottom-10 right-20">
        <GiCardPickup />
      </button>
      <button onClick={handleCompraCarta} className="hidden md:flex btn bg-blue-950 text-white hover:bg-blue-900 absolute bottom-10 right-32">
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
