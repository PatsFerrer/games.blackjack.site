'use server';

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function apostarFichas(FormData: FormData) {
  const fichas = FormData.get('fichas');
  const salaId = FormData.get('salaId');

  const token = cookies().get('token')?.value;

  if (!token) {
    throw new Error('Usuário não autenticado');
  }

  const response = await fetch(`${process.env.API_URL}/jogo/apostar`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      salaId,
      fichas
    })
  })

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erro ao apostar');
  }

  redirect(`/mesa/${salaId}`);

}
