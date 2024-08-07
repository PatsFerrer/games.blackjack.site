export enum Result {
  VITORIA,
  DERROTA,
  EMPATE
}

export type TJogador = {
  avatarUrl?: string;
  cartas?: TCarta[];
  ehVez?: boolean;
  fichas?: number;
  fichasApostadas?: number;
  nome?: string;
  usuarioId?: string;
}

export type TCarta = {
  alt: string;
};

export type TDealer = {
  cartas?: TCarta[],
  className?: string,
  virarCarta: boolean
};