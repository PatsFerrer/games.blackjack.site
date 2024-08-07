import { TJogador } from "@/types";

export interface IJogador {
  jogador: TJogador;
  index: number;
  ganhadores: string[];
  perdedores: string[];
  empates: string[];
}

export interface ISala {
  id: number;
  nome: string;
  senha: string;
}

export interface ITopJogador {
  id: number;
  avatar: string;
  login: string;
  totalFichas: number;
}

export interface ICarta {
  imagemUrl: string;
}


// export interface IResultado {
//   Empates: string[];
//   Ganhadores: string[];
//   Perdedores: string[];
// }
