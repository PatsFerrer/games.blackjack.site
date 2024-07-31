'use client'

import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'next/navigation';
import { TbHandStop } from "react-icons/tb";
import pararJogada from '@/app/(auth)/mesa/_actions/pararJogada';

const PararJogadaButton = () => {
  const { salaId } = useParams<{ salaId: string }>();

  const handlePararJogada = async () => {
    try {
      const result = await pararJogada(salaId);
      if (result.success) {
        console.log('Parada realizada com sucesso');
      } else {
        toast.error(result.message || 'Erro ao parar');
      }
    } catch (error) {
      console.error('Erro ao processar parada', error);
      toast.error('Erro ao parar');
    }
  };

  return (
    <div>
      <button onClick={handlePararJogada} className="md:hidden btn bg-blue-950 text-white hover:bg-blue-900">
          <TbHandStop />
        </button>
        <button onClick={handlePararJogada} className="hidden md:flex btn bg-blue-950 text-white hover:bg-blue-900">
          <TbHandStop />
          Parar
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
    </div>
  );
};

export default PararJogadaButton;
