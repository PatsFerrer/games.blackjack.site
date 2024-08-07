import { FC } from "react";
import { ITopJogador } from "@/interface";
import { formatarFichas, validarImagem } from '@/utils';

interface ITopJogadores {
  topJogador: ITopJogador;
}

const ListarPessoasFichas: FC<ITopJogadores> = ({ topJogador }) => {

  return (
    <div className="overflow-x-auto mb-3">
      <div className="card flex-row bg-[#F2EFF0] rounded-sm justify-between p-3 h-24 items-center">
        <div className="flex items-center gap-3">
          <div className="avatar mask mask-squircle h-12 w-12 mr-4">
            <img src={validarImagem(topJogador.avatar)} alt="Avatar Jogador" />
          </div>
          <div className="truncate max-w-32">{topJogador.login}</div>
        </div>

        <div className="flex justify-center items-center">${formatarFichas(topJogador.totalFichas)}</div>
      </div>
    </div>

  );
};

export default ListarPessoasFichas;
