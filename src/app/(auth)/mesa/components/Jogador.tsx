'use client';

import { IJogador } from "@/interface";
import { Result } from "@/types";
import { formatarFichas, validarImagem, verificarResultado } from "@/utils";
import { useEffect, useState } from "react";

export default function Jogador({ jogador, index, ganhadores, perdedores, empates }: IJogador) {
  const [status, setStatus] = useState<Result>()
  const { usuarioId, ehVez } = jogador;

  let statusClass = status === Result.VITORIA
    ? 'border-emerald-500'
    : status === Result.DERROTA
      ? 'border-red-800'
      : 'border-yellow-600';

  useEffect(() => {
    setStatus(verificarResultado(ganhadores, perdedores, empates, usuarioId!))
  }, [usuarioId, ganhadores, perdedores, empates]);

  let { avatarUrl, nome, fichas, fichasApostadas, cartas } = jogador;

  function posicionarCartasX(index: number, cartaIndex: number) {
    if (index === 2 || index === 3) {
      return 155 + -30 * Math.cos((cartaIndex * 2 * Math.PI) / 5);
    }

    return -55 + -30 * Math.cos((cartaIndex * 2 * Math.PI) / 5);
  }

  return (
    <div
      key={jogador.usuarioId}
      className={` absolute `}
      style={{
        left: `${46 + 55 * Math.cos((index * 2 * Math.PI) / 5)}%`, // Posição X
        top: `${42 + 53 * Math.sin((index * 2 * Math.PI) / 5)}%`, // Posição Y
        transform: `translate(-50%, -43%)`,
      }}
    >
      <h3 className={`text-lg text-center font-semibold mb-1 ${ehVez ? 'text-yellow-300' : "text-white"}`}>{nome}</h3>
      <div className={`flex flex-col items-center text-center w-20 h-20 relative rounded-full border-4 ${statusClass} ${ehVez ? 'transform scale-105 transition-transform duration-300' : ''}`}>
        {cartas!.map((carta, cartaIndex) => (
          <div
            key={cartaIndex}
            className="absolute w-16 shadow-md rounded-md z-40"
            style={{
              left: `${posicionarCartasX(index, cartaIndex)}%`,
              top: `${65 + 50 * Math.sin((cartaIndex * 2 * Math.PI) / 30)}%`,
              transform: `translate(-10%, -50%)`,
            }}
          >
            <img src={`./../assets/cartas/${carta.alt}.png`} alt={`Carta ${cartaIndex + 1}`} className="rounded-md shadow-md" />
          </div>
        ))}

        <div className="flex flex-col gap-1">
          <img
            className={`object-cover aspect-square rounded-full mb-2 ${ehVez ? 'border-2 border-yellow-300 animate-pulse' : ''}`}
            src={validarImagem(avatarUrl || "")}
            alt={`Foto de ${nome}`}
          />
          <p className="text-sm text-white">Fichas: ${formatarFichas(fichas)}</p>
          <p className="text-sm text-white">Apostadas: ${formatarFichas(fichasApostadas)}</p>
        </div>
      </div>
    </div>
  )
}
