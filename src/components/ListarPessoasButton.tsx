"use client";
import { ITopJogador } from "@/interface/ITopJogador";
import React, { useEffect, useState } from "react";
import { FaTrophy } from "react-icons/fa";
import ListarPessoasFichas from "./ListarPessoasFichas";

export default function ListarPessoasButton() {
  const [jogadores, setJogadores] = useState<ITopJogador[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://66718da9e083e62ee43c1800.mockapi.io/salas-disponiveis/salas", { method: "GET" });
        const topJogadores = await res.json();
        setJogadores(topJogadores);
        const sortedJogadores = topJogadores.sort((a, b) => b.fichas - a.fichas);
        const top5Jogadores = sortedJogadores.slice(0, 5);
        setJogadores(top5Jogadores);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle mr-4">
        <div className="indicator">
          <div className="drawer-content">
            {/* Page content here */}
            <label
              htmlFor="my-drawer-4"
              className="cursor-pointer bg-black border-none"
            >
              <FaTrophy className="text-4xl text-slate-100" />
              <span className="badge badge-sm indicator-item z-0">Top</span>
            </label>
          </div>
        </div>
      </div>

      <div className="drawer drawer-end z-50 absolute">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="menu bg-[#DF0B56] text-base-content min-h-full w-80 p-4">
            {jogadores.map((jogador, i) => <ListarPessoasFichas key={i} topJogador ={jogador}/>)}
          </div>
        </div>
      </div>
    </div>
  );
}
