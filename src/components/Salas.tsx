import { FC } from "react";
import { ISala } from "@/interface/ISala";
import Image from "next/image";

interface SalasProps {
  sala: ISala;
  onJoin: (sala: ISala) => void;
}

const Salas: FC<SalasProps> = ({ sala, onJoin }) => {
  return (
    <div className="card max-h-52 bg-base-100 shadow-xl image-full max-w-72">
      <figure>
        <Image
          src="/img/baralho.jpg"
          alt="Baralho de cartas"
          width={300}
          height={300}
          priority={false}
        />
      </figure>
      <div className="card-body justify-center">
        <h2 className="card-title h-full text-2xl">{sala.nome}</h2>
        <div className="card-actions justify-end items-end">
          <button
            className="btn bg-white p-2 text-terciary border-none text-sm rounded-md"
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
