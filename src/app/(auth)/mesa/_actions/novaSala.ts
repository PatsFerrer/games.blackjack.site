'use server';

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function cadastro(FormData: FormData) {
  const nome = FormData.get('nome');
  const senha = FormData.get('senha');

  if (!nome || !senha ) {
    throw new Error('Preencha todos os campos');
  }

  const token = cookies().get('token')?.value;

  if (!token) {
    throw new Error('Usuário não autenticado');
  }

  const response = await fetch(`${process.env.API_URL}/criar-sala`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      nome,
      senha
    })
  })

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erro ao criar sala');
  }

  redirect('/home');

}
