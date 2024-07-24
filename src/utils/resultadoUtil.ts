import { Result } from "@/types";

export const verificarResultado = (ganhadores: string[], perdedores: string[], userId?: string): Result => {
  if(userId === undefined){
    userId = JSON.parse(sessionStorage.getItem('userId')!);
  }

    if (ganhadores.includes(userId!)) {
      return Result.VITORIA;
    }
    if (perdedores.includes(userId!)) {
      return Result.DERROTA;
    }
    return Result.EMPATE;
  }