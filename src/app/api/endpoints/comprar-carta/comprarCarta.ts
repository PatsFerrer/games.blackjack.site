import { fetchServer } from "@/libs/fetchServer";

const URL = 'http://localhost:7071/api/jogo/comprar';

export const comprarCarta = async (sala_id: string) => {
  try {
    const response = await fetchServer(URL, {
      method: 'POST',
      body: JSON.stringify({ sala_id }),
    });

    if (response.ok) {
      return { success: true };
    } else {
      const errorData = await response.json();
      return { success: false, message: errorData.message };
    }
  } catch (error) {
    console.error('Erro ao processar compra de carta', error);
    return { success: false, message: 'Erro na comunicação com o servidor' };
  }
};
