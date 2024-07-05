type Jogador = {
  avatarUrl?: string;
  cartas?: string[];
  ehVez?: boolean;
  fichas?: number;
  fichasApostadas?: number;
  nome?: string;
  usuarioId?: string;
}

export interface IJogador {
  jogador: Jogador;
  index: number;
}