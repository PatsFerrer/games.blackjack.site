"use client";

import { useState, useRef } from "react";
import { ISala } from "@/interface/ISala";
import Salas from "@/components/Salas";
import SalaForm from "@/components/SalaForm";

interface HomeClientProps {
  salas: ISala[];
}

export default function HomeClient({ salas }: HomeClientProps) {
  const [clientSalas, setClientSalas] = useState<ISala[]>(salas);
  const [search, setSearch] = useState("");
  const [isLoading, setLoading] = useState(false);
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleCreateSala = async (novaSala: ISala) => {
    setLoading(true);
    try {
      const req = await fetch("https://66718da9e083e62ee43c1800.mockapi.io/salas-disponiveis/salas", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novaSala),
      });

      if (req.ok) {
        const newSala = await req.json();
        setClientSalas([...clientSalas, newSala]);
        setLoading(false);
        modalRef.current?.close();
      } else {
        console.error('Erro ao criar sala:', req.status, req.statusText);
        setLoading(false);
        modalRef.current?.close();
      }
    } catch (error) {
      console.log('Erro ao criar sala:', error);
      setLoading(false);
      modalRef.current?.close();
    }
  };

  return (
    <>
      <div className="justify-center items-center sm:flex">
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Pesquisar sala..."
            className="input input-bordered min-w-80 ml-auto mr-auto"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex justify-center items-end m-3">
          <button
            className="btn bg-jackWhite"
            onClick={() => modalRef.current?.showModal()}
          >
            Criar nova sala
          </button>
          <dialog id="my_modal_3" className="modal" ref={modalRef}>
            <div className="modal-box">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <SalaForm onCreate={handleCreateSala} closeModal={() => modalRef.current?.close()} />
            </div>
          </dialog>
        </div>
      </div>

      <div className="p-4 flex gap-2.5 flex-wrap justify-center min-h-[450px]">
        {isLoading && (
          <span className="loading loading-spinner loading-lg text-jackWhite"></span>
        )}
        {!clientSalas.length && !isLoading && (
          <p className="text-jackWhite">Nenhuma sala foi criada ainda.</p>
        )}
        {clientSalas &&
          clientSalas
            .filter((sala) =>
              sala.nome.toLowerCase().includes(search.toLowerCase())
            )
            .map((sala) => <Salas key={sala.id} sala={sala} />)}
      </div>
    </>
  );
}
