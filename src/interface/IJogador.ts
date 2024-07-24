export type Jogador = {
  avatarUrl?: string;
  cartas?: Carta[];
  ehVez?: boolean;
  fichas?: number;
  fichasApostadas?: number;
  nome?: string;
  usuarioId?: string;
}

export type Carta = {
  alt: string;
};

export interface IJogador {
  jogador: Jogador;
  index: number;
  ganhadores: string[],
  perdedores: string[]
}