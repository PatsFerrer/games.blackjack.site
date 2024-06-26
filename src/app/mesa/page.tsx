'use client';
import Link from "next/link";
import { FaArrowLeft, FaShareAlt } from "react-icons/fa";
import { GiCardPickup } from "react-icons/gi";
import { TbHandStop } from "react-icons/tb";
// import { useState, useEffect } from "react";

import { Jogador, Dealer } from "@/components";
// import { IJogador } from "@/interface/IJogador";

export default function Mesa() {

  // TODO: Implementar jogadores vindo da API
  // const [jogadores2, setJogadores2] = useState<IJogador[]>([]);
  // const [isLoading, setLoading] = useState(true);

  // jogadores mock
  const jogadores = [
    { id: 1, imagemUrl: "https://github.com/patsferrer.png", nome: "Pats", fichas: 100, cartas: ["./cartas/2-H.png", "./cartas/7-C.png"] },
    { id: 2, imagemUrl: "https://github.com/airaarima.png", nome: "Aira", fichas: 150, cartas: ["./cartas/4-S.png", "./cartas/5-H.png"] },
    { id: 3, imagemUrl: "https://github.com/patsferreresx.png", nome: "Irineu", fichas: 75, cartas: ["./cartas/8-C.png", "./cartas/J-C.png"] },
    { id: 4, imagemUrl: "https://github.com/karinasantana-esx.png", nome: "Bertolazzo", fichas: 200, cartas: ["./cartas/3-D.png", "./cartas/2-C.png"] },
    { id: 5, imagemUrl: "https://images.futebolinterior.com.br/2022/12/MESSI-2.jpg", nome: "Messi", fichas: 50, cartas: ["./cartas/Q-H.png", "./cartas/2-C.png"] },
  ];

  return (

    <main className="flex justify-center items-center min-h-screen bg-green-800">

      <Link href="/home" className="md:hidden btn bg-blue-950 text-white hover:bg-blue-900 absolute top-10 left-5"><FaArrowLeft /></Link>
      <Link href="/home" className="hidden md:flex btn bg-blue-950 text-white hover:bg-blue-900 absolute top-10 left-5"><FaArrowLeft />Deixar a mesa</Link>

      <button className="md:hidden btn bg-blue-950 text-white hover:bg-blue-900 absolute top-10 right-5"><FaShareAlt /></button>
      <button className="hidden md:flex btn bg-blue-950 text-white hover:bg-blue-900 absolute top-10 right-5">Convidar amigos<FaShareAlt /></button>

      {/* Mesa */}
      <div className="relative w-4/5 h-96 border border-indigo-100 rounded-3xl md:max-w-[950px] bg-blue-950 shadow-sm shadow-slate-900 hover:shadow-lg">

        {/* cadeiras dos jogadores */}
        <div className="absolute inset-0 flex justify-center items-center">

          {/* Dealer */}
          <Dealer />

          {/* Jogadores ao redor da mesa */}
          {jogadores.map((jogador, index) => (
            <div
              key={jogador.id}
              className={`absolute rounded-full border-4 border-yellow-600`}
              style={{
                left: `${46 + 55 * Math.cos((index * 2 * Math.PI) / 5)}%`, // Posição X
                top: `${52 + 53 * Math.sin((index * 2 * Math.PI) / 5)}%`, // Posição Y
                transform: `translate(-50%, -43%)`,
              }}
            >

              {/* componente jogador */}
              <Jogador jogador={jogador} index={index} />
            </div>
          ))}

        </div>

        {/* deck */}
        <div className="relative bg-red-400 w-14 h-18 shadow-md rounded-md left-[65.33%] top-[-31.66%] ">
          <img src="./cartas/BACK.png" alt="Cartas" className="w-14 h-18 rounded-md shadow-md" />
        </div>

      </div>
      {/* Mesa fim */}

      {/* chama funçao comprar carta */}
      <button className="md:hidden btn bg-blue-950 text-white hover:bg-blue-900 absolute bottom-10 right-20"><GiCardPickup /></button>
      <button className="hidden md:flex btn bg-blue-950 text-white hover:bg-blue-900 absolute bottom-10 right-32"><GiCardPickup />Comprar</button>

      {/* chama a função Parar */}
      <button className="md:hidden btn bg-blue-950 text-white hover:bg-blue-900 absolute bottom-10 right-5"><TbHandStop /></button>
      <button className="hidden md:flex btn bg-blue-950 text-white hover:bg-blue-900 absolute bottom-10 right-5"><TbHandStop />Parar</button>

    </main>
  )
}
