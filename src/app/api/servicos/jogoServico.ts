import { fetchServer } from '@/libs/fetchServer'

export const getStatusJogo = async (salaId : string) => {
    try{
        return await fetchServer(`/jogo/status/${salaId}`, {
            method: 'get',
        });
    }catch(error){
        throw error;
    }
}

export const pararJogada = async (salaId : string) => {
    try{
        return await fetchServer('/jogo/parar', {
            method: 'post',
            body: JSON.stringify({ "sala_id": salaId })
        });
    }catch(error){
        throw error;
    }
}

export const jogadorConectado = async (salaId : string) => {
    try{
        return await fetchServer('/jogo/conectar', {
            method: 'post',
            body: JSON.stringify({ "sala_id": salaId })
        });
    }catch(error){
        throw error;
    }
}

export const jogadorDesconectado = async (salaId : string) => {
    try{
        return await fetchServer('/jogo/desconectar', {
            method: 'post',
            body: JSON.stringify({ "sala_id": salaId })
        });
    }catch(error){
        throw error;
    }
}