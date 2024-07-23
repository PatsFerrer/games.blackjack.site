// src/components/Salas.tsx
import { FC } from "react";
import { ISala } from "@/interface/ISala";
// import Link from "next/link";
import VerificarSenhaSala from "./VerificarSenhaSala";


interface SalasProps {
  sala: ISala;
  key: number;
  onJoin: (sala: ISala) => void;
}

const Salas: FC<SalasProps> = ({ key, sala, onJoin }) => {
  return (
    <div className="card max-w-48 max-h-52 bg-base-100 shadow-xl image-full sm:max-w-72" key={key}>
      <figure>
        <img
          src="https://images.unsplash.com/photo-1646809014367-2c267bcba69f?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Baralho de cartas"
        />
      </figure>
      <div className="card-body justify-center">
        <h2 className="card-title h-full 
        text-base sm:text-2xl">{sala.nome}</h2>
        <div className="card-actions justify-end items-end">
          {/* <Link className="bg-white p-2 text-xs text-terciary border-none sm:p-4 sm:text-sm rounded-md" href={`/mesa/${sala.id}`}>Juntar-se</Link> */}
          <button
            className="bg-white p-2 text-xs text-terciary border-none sm:p-4 sm:text-sm rounded-md"
            onClick={() => onJoin(sala)}
          >
            Juntar-se
          </button>
        </div>
      </div>
    </div>
  );
}

export default Salas;
