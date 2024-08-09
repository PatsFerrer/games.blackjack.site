"use client";
import { apostarFichas } from "@/app/(auth)/mesa/_actions";
import { FC, useState, useEffect } from "react";

interface FichasProps {
  exibirModal: boolean;
  idSala: string;
}

const ApostarFichas: FC<FichasProps> = ({ exibirModal, idSala }) => {
  const [error, setError] = useState<string | null>(null);
  const MinimoFichasAposta = 10;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(event.currentTarget);
    const fichas = formData.get('fichas');
    const salaId = formData.get('salaId');

    if (!fichas || !salaId) {
      setError('Preencha todos os campos');
      return;
    }

    const valorAposta = parseInt(fichas.toString(), 10);

    if (isNaN(valorAposta)) {
      setError('Quantidade de fichas inválida');
      return;
    }

    if (valorAposta < MinimoFichasAposta) {
      setError(`O valor da aposta deve ser no mínimo ${MinimoFichasAposta} fichas.`);
      return;
    }

    try {
      await apostarFichas(formData);
      const modal = document.getElementById("my_modal_3") as HTMLDialogElement | null;
      if (modal) {
        modal.close();
      }

      form.reset();
      setError(null);
    } catch (error) {
      setError('Erro ao apostar: ' + (error instanceof Error ? error.message : 'Desconhecido'));
    }
  };

  useEffect(() => {
    const modal = document.getElementById("my_modal_3") as HTMLDialogElement | null;
    if(exibirModal==true && modal){
      modal.showModal();
      modal.addEventListener('cancel', (e) => e.preventDefault());
    }
  }, [exibirModal]);

  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form onSubmit={handleSubmit}>
            <h3 className="font-bold text-lg">Aposte suas fichas!</h3>
            {error && <p className="text-red-500">{error}</p>}
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
              <input type="text" id="salaId" name="salaId" value={idSala} readOnly />
            </label>
            <button
              type="submit"
              className="btn bg-blue-950 hover:bg-blue-900 text-white mt-5"
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
