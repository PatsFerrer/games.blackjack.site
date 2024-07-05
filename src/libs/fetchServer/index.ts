import Cookies from 'js-cookie';

const baseURL = process.env.API_URL;

export const fetchServer = async (
  path: string,
  options: RequestInit = {}
): Promise<Response> => {
  const token = Cookies.get('token');

  if (!token) {
    throw new Error('Token de autenticação não encontrado');
  }

  console.log('Token capturado:', baseURL);

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const response = await fetch("http://localhost:7071/api" + path, {
    ...options,
    headers,
  });

  return response;
};
