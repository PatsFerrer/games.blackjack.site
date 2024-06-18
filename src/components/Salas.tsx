import { FC } from "react";
import { ISala } from "@/interface/ISala";

interface SalasProps {
  sala: ISala;
}

const Salas: FC<SalasProps> = ({ sala }) => {
  return (
      <div className="card max-w-72 max-h-52 bg-base-100 shadow-xl image-full" key={sala.id}>
        <figure>
          <img
            src="https://images.unsplash.com/photo-1646809014367-2c267bcba69f?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Baralho de cartas"
          />
        </figure>
        <div className="card-body justify-center">
          <h2 className="card-title h-full text-2xl">{sala.nome}</h2>
          <div className="card-actions justify-end items-end">
            <button className="btn  text-terciary border-none">Juntar-se</button>
          </div>
        </div>
    </div>
  );
}

export default Salas;