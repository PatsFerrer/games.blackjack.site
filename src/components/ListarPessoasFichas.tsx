import { FC } from "react";
import { ITopJogador } from "@/interface/ITopJogador";

interface ITopJogadores {
  topJogador: ITopJogador;
}

const ListarPessoasFichas: FC<ITopJogadores> = ({ topJogador }) => {
  return (
    <div className="overflow-x-auto mb-3">
      <div className="card flex-row bg-[#F2EFF0] mr-4 rounded-sm justify-around p-3 h-24">
        <div className="flex items-center gap-3">
          <div className="avatar mask mask-squircle h-12 w-12 mr-4">
            <img src={topJogador.avatar} alt="Avatar Jogador" />
          </div>
          <div>{topJogador.nome}</div>
        </div>

        <div className="flex justify-center items-center">${topJogador.fichas}</div>
      </div>
    </div>
  );
};

export default ListarPessoasFichas;
