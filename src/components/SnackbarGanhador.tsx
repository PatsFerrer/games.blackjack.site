'use client'
import { Result } from "@/types";
import { useState } from 'react';

interface SnackbarGanhadorProps {
  resultado: Result;
  show: boolean;
  onClose: () => void;
}

export default function SnackbarGanhador({ resultado, show, onClose }: SnackbarGanhadorProps) {
  const [showSnackbar, setShowSnackbar] = useState(true);

  const handleShowSnackbar = () => {
    setShowSnackbar(true);
    setTimeout(() => {
      setShowSnackbar(false);
    }, 5000);
  };

  let mensagem = '';

  switch (resultado) {
    case Result.VITORIA:
      mensagem = 'Vitória!'
      break
    case Result.DERROTA:
      mensagem = 'DERROTA!'
      break
    case Result.EMPATE:
      mensagem = 'EMPATE!'
      break
  }

  return (
    <div
      className={`fixed top-1/2  px-4 py-2 animate-bounce bg-gray-800 text-white rounded-lg shadow-md transition-all duration-300 ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      {mensagem}
      <button className="ml-4 text-sm" onClick={onClose}>Fechar</button>
    </div>
  )
}
