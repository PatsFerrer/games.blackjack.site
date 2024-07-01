'use server';

import { redirect } from "next/navigation";

export default async function cadastro(FormData: FormData) {
  const login = FormData.get('login');
  const email = FormData.get('email');
  const senha = FormData.get('senha');
  const avatar = FormData.get('avatar');
  const data_nascimento = FormData.get('data_nascimento');

  if (!login || !email || !senha || !data_nascimento) {
    throw new Error('Preencha todos os campos');
  }

  const response = await fetch(`${process.env.API_URL}/auth/cadastro`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      login,
      email,
      senha,
      avatar,
      data_nascimento
    })
  })

  redirect('/');

}
