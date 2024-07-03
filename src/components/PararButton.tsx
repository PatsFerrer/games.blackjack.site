'use client'

import React from 'react';
import { pararJogada } from '@/app/api/servicos/jogoServico';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'next/navigation';
import { TbHandStop } from "react-icons/tb";

const PararJogadaButton = () => {
  const { salaId } = useParams<{ salaId: string }>();

  const handlePararJogada = async () => {
    try {
      const result = await pararJogada(salaId);
      if (result.ok) {
        console.log('Parada realizada com sucesso');
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
      <button onClick={handlePararJogada} className="md:hidden btn bg-blue-950 text-white hover:bg-blue-900 absolute bottom-10 right-5">
          <TbHandStop />
        </button>
        <button onClick={handlePararJogada} className="hidden md:flex btn bg-blue-950 text-white hover:bg-blue-900 absolute bottom-10 right-5">
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
