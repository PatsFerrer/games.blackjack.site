import Cookies from 'js-cookie';

export const fetchServer = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const token = Cookies.get('token');

  if (!token) {
    throw new Error('Token de autenticação não encontrado');
  }

  console.log('Token capturado:', token);

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  return response;
};
