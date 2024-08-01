'use server';

import { cookies } from "next/headers";

export default async function getUser() {
  
  const user = cookies().get('user')?.value;

  if (!user) {
    throw new Error('Usuário não autenticado');
  }

  return JSON.parse(user);
}
