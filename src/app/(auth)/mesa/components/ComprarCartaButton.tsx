'use client'

import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GiCardPickup } from 'react-icons/gi';
import { useParams } from 'next/navigation';
import { comprarCarta } from '../_actions';

const ComprarCartaButton = () => {
  const { salaId } = useParams<{ salaId: string }>();

  const handleCompraCarta = async () => {
    try {
      const result = await comprarCarta(salaId);
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
    <>
      <button onClick={handleCompraCarta} className="md:hidden btn bg-blue-950 text-white hover:bg-blue-900">
        <GiCardPickup />
      </button>
      <button onClick={handleCompraCarta} className="hidden md:flex btn bg-blue-950 text-white hover:bg-blue-900">
        <GiCardPickup />
        Comprar
      </button>

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
    </>
  );
};

export default ComprarCartaButton;