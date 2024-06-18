"use client";
import { SalaForm, Salas } from "@/components";
import {ISala} from "@/interface/ISala";
import { useState } from "react";

export default function SalasDisponiveis() {

  const [salas, setSalas] = useState<ISala[]>([
    {
      id: 1,
      nome: "primeira sala",
      senha: "123",
    },
    {
      id: 2,
      nome: "segunda sala",
      senha: "123",
    },
    {
      id: 3,
      nome: "terceira sala",
      senha: "123",
    },
    {
      id: 4,
      nome: "quarta sala",
      senha: "123",
    },
    {
      id: 5,
      nome: "quinta sala",
      senha: "123",
    },
    {
      id: 6,
      nome: "sexta sala",
      senha: "123",
    },
  ]);

  const [search, setSearch] = useState("");

  return (
    <div className="p-14 flex flex-col min-h-screen bg-primary">
      <div className="flex justify-center ">
        <input
          type="text"
          placeholder="Pesquisar sala..."
          className="input input-bordered w-full max-w-md ml-auto mr-auto mb-5"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="p-4 flex gap-2.5 flex-wrap justify-center min-h-[450px]">
        {salas
          .filter((sala) =>
            sala.nome.toLowerCase().includes(search.toLowerCase())
          )
          .map((sala) => (
            <Salas sala={sala} />
          ))}
      </div>

      <div className="flex justify-center items-end m-3">
        <button
          className="btn btn-wide bg-jackWhite"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          Criar nova sala
        </button>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg mb-5 text-center">Criar Sala</h3>
            <SalaForm/>
          </div>
        </dialog>
      </div>
    </div>
  );
}
