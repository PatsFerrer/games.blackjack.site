import { Result } from "@/types";

export const verificarResultado = (ganhadores: string[], perdedores: string[]): Result => {
    const user = JSON.parse(sessionStorage.getItem('userId')!);
    console.log(user)
    
    if (ganhadores.includes(user)) {
      return Result.VITORIA
    } else if (perdedores.includes(user)) {
      return Result.DERROTA
    }else {
      return Result.EMPATE
    }
  }