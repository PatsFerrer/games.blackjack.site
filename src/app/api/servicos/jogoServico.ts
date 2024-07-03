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