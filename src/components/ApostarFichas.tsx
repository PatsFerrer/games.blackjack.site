"use client";
import { apostarFichas } from "@/app/(auth)/mesa/_actions";
import { FC } from "react";
import React from "react";
import { useEffect } from "react";

interface FichasProps {
  close: any;
  idSala: string;
}


const ApostarFichas: FC<FichasProps> =({ close, idSala }) => {

  const handleSubmit = () => {
    const modal = document.getElementById("my_modal_3") as HTMLDialogElement | null;
    if (modal) {
      modal.close();
    }
  };

  useEffect(() => {
    const modal = document.getElementById("my_modal_3") as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    }
  }, []);

  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form action={apostarFichas} onSubmit={handleSubmit}>
            <h3 className="font-bold text-lg">Aposte suas fichas!</h3>
            <label className="input input-bordered flex items-center gap-2 mt-3">
              <input
                type="number"
                className="grow"
                placeholder="Quantidade de fichas"
                id="fichas"
                name="fichas"
                required
              />
            </label>
            <label hidden>
              <input type="text" id="salaId" name="salaId" value={idSala} />
            </label>

            <button
              type="submit"
              className="btn btn-success mt-5"
            >
              Apostar
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default ApostarFichas;