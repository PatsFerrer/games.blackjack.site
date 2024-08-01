'use client';
import { Result } from "@/types";
import { verificarResultado } from "@/utils/resultadoUtil";
import { useEffect, useState } from "react";

interface SnackbarGanhadorProps {
  show: boolean;
  ganhadores: string[];
  perdedores: string[];
  empates: string[];
  onClose: () => void;
  userId: string;
  userLogin: string;
}

export default function SnackbarGanhador({
  show,
  onClose,
  ganhadores,
  perdedores,
  empates,
  userId,
  userLogin,
}: SnackbarGanhadorProps) {
  const [status, setStatus] = useState<Result>();


  useEffect(() => {
      setStatus(verificarResultado(ganhadores, perdedores, empates, userId));
      const timeout = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timeout);
  }, [ganhadores, perdedores, empates]);

  let mensagem = status === Result.VITORIA
    ? `Parabéns ${userLogin}, você venceu!!!`
    : status === Result.DERROTA
      ? `Infelizmente ${userLogin}, você perdeu`
      : status === Result.EMPATE 
        ? `${userLogin} você empatou.` : "";

  return (
    <div
      className={`fixed top-1/2  px-4 py-2 animate-bounce bg-gray-800 text-white rounded-lg shadow-md transition-all duration-300 ${
        show ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {mensagem}
      <button className="ml-4 text-sm" onClick={onClose}>
        Fechar
      </button>
    </div>
  );
}
