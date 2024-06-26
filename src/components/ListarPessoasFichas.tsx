import { FC } from "react";
import { ITopJogador } from "@/interface/ITopJogador";

interface ITopJogadores {
  topJogador: ITopJogador;
}

const ListarPessoasFichas: FC<ITopJogadores> = ({ topJogador }) => {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table text-[#000201]">
            <div className="card bg-[#F2EFF0] mb-2 mr-4 rounded-sm">
                <tr className="flex justify-around">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={topJogador.avatar}
                            alt="Avatar Jogador"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font- ">{topJogador.nome}</div>
                      </div>
                    </div>
                  </td>
                  <td className="flex justify-center items-center">${topJogador.fichas}</td>
                </tr>
            </div>
        </table>
      </div>
    </div>
  );
}

export default ListarPessoasFichas;