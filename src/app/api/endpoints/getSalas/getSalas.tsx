//teste pra bater no endpoint das salas, exemplo antigo
import { fetchServer } from '@/libs/fetchServer';

export default async function GetSalas() {

  async function fetchSalas() {

    'use server';
    const URL = 'http://localhost:7071/api/salas'
    const response = await fetchServer(URL);

    if (response.status === 200) return { error: response.statusText }
    return response.json();
  }

  const funcao = await fetchSalas();

  return (
    <div>
      Welcome to Azure Functions! Server side!
    </div>
  )
}
