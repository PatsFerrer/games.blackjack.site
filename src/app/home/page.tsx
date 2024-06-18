"use client";
import { SalaForm, Salas } from "@/components";
import { ISala } from "@/interface/ISala";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [salas, setSalas] = useState<ISala[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const modalRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await fetch("", {method: 'GET',}) 
        const sala = await res.json()
        setSalas(sala);
        console.log(salas)
        
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCreateSala = async (novaSala : ISala) => {
    try{
      const req = await fetch("", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novaSala),
      })

      if(req.ok){
        const listaSalas = await req.json();
        setSalas([...salas, listaSalas])
      }else {
        console.error('Erro ao criar sala:', req.status, req.statusText);
        modalRef.current.close();
      }

    }catch (error){
      console.log('Erro ao criar sala: ', error)
    }
  }

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
        {isLoading && (
          <span className="loading loading-spinner loading-lg text-jackWhite"></span>
        )}
        {!salas.length && !isLoading && <p className="text-jackWhite">Nenhuma sala foi criada ainda.</p>}
        {salas &&
          salas
            .filter((sala) =>
              sala.nome.toLowerCase().includes(search.toLowerCase())
            )
            .map((sala) => <Salas sala={sala} />)}
      </div>

      <div className="flex justify-center items-end m-3">
        <button
          className="btn btn-wide bg-jackWhite"
          onClick={() => document.getElementById("my_modal_3").showModal()}
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
            <SalaForm onCreate={handleCreateSala} closeModal={() => modalRef.current.close()}/>
          </div>
        </dialog>
      </div>
    </div>
  );
}
