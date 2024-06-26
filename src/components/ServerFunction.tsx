//teste pra bater no endpoint Function1
import { fetchServer } from '../libs/fetchServer/index';

export default async function ServerFunction() {

  async function fetchFunctions() {

    'use server';
    const URL = 'http://localhost:7071/api/salas'
    const response = await fetchServer(URL);

    if (response.status === 200) return { error: response.statusText }
    return response.json();
  }

  const funcao = await fetchFunctions();

  return (
    <div>
      Welcome to Azure Functions! Server side!
    </div>
  )
}
