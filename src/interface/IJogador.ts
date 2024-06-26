type Jogador = {
  imagemUrl?: string;
  nome?: string;
  fichas?: number;
  cartas?: string[];
}

export interface IJogador {
  jogador: Jogador;
  index: number;
}