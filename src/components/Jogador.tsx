'use client'
import { IJogador } from "@/interface/IJogador"
import { Result } from "@/types";
import validarImagem from "@/utils/imageUtil";
import { verificarResultado } from "@/utils/resultadoUtil";
import { useEffect, useState } from "react";

export default function Jogador({ jogador, index, ganhadores, perdedores }: IJogador) {
  const [status, setStatus] = useState<Result>(Result.EMPATE)
  const { usuarioId } = jogador

  let statusClass = status === Result.VITORIA
    ? 'border-emerald-500'
    : status === Result.DERROTA
      ? 'border-red-800'
      : 'border-yellow-600';

  useEffect(() => {
    setStatus(verificarResultado(ganhadores, perdedores, usuarioId!))
  }, [usuarioId, ganhadores, perdedores])

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
      <h3 className="text-lg text-white text-center font-semibold mb-1">{nome}</h3>
      <div className={`flex flex-col items-center text-center w-20 h-20 relative rounded-full border-4 ${statusClass}`}>
        {/* Cartas */}
        {cartas!.map((carta, cartaIndex) => (
          <div
            key={cartaIndex}
            className="absolute w-16 shadow-md rounded-md"
            style={{
              left: `${posicionarCartasX(index, cartaIndex)}%`,
              top: `${65 + 50 * Math.sin((cartaIndex * 2 * Math.PI) / 30)}%`,
              transform: `translate(-10%, -50%)`,
            }}
          >
            <img src={`./../cartas/${carta.alt}.png`} alt={`Carta ${cartaIndex + 1}`} className="rounded-md shadow-md" />
          </div>
        ))}

        <img
          className="object-cover aspect-square rounded-full mb-2"
          src={validarImagem(avatarUrl)}
          alt={`Foto de ${nome}`}
        />

        <div className="flex gap-2">
          <p className="text-sm text-white">Fichas: ${fichas}</p>
          <p className="text-sm text-white">Fichas Apostadas: ${fichasApostadas}</p>
        </div>
      </div>
    </div>

  )
}
