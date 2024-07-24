'use client'
import { Result } from "@/types";
import { verificarResultado } from "@/utils/resultadoUtil";
import { getCookie } from "cookies-next";
import { useEffect, useState } from 'react';

interface SnackbarGanhadorProps {
  show: boolean;
  ganhadores: string[],
  perdedores: string[],
  onClose: () => void;

}

export default function SnackbarGanhador({ show, onClose, ganhadores, perdedores }: SnackbarGanhadorProps) {
  
  const [status, setStatus] = useState<Result>(Result.EMPATE)
  let mensagem = '';
  

  const closeSnackbar = () => {
    setTimeout(() => {
      onClose();
    }, 5000);
  };
 
useEffect(() => {
  closeSnackbar()
}, [])


  useEffect(() => {
    
    setStatus(verificarResultado(ganhadores, perdedores))
  }, [ganhadores, perdedores])

  
  const user = getCookie('user')
  const usuario = JSON.parse(user!)
  
  switch (status) {
    case Result.VITORIA:
      mensagem = `Parabéns ${usuario.login}, você venceu!!!`
      break
    case Result.DERROTA:
      mensagem = `Infelizmente ${usuario.login}, você perdeu`
      break
    case Result.EMPATE:
      mensagem = `${usuario.login} você empatou.`
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
