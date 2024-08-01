import { Result } from "@/types";

export const verificarResultado = (ganhadores: string[], perdedores: string[], empates: string[], userId: string) => {


    if (ganhadores.includes(userId)) {
      return Result.VITORIA;
    }
    else if (perdedores.includes(userId)) {
      return Result.DERROTA;
    }
    else if (empates.includes(userId)){
      return Result.EMPATE;
    }
    
  }