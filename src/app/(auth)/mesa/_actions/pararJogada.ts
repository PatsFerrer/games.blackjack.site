"use server";

import { cookies } from "next/headers";

export default async function pararJogada(salaId:string) {

  const token = cookies().get("token")?.value;

  if (!token) {
    return { success: false, message: "Usuário não autenticado" };
  }

  const response = await fetch(`${process.env.API_URL}/jogo/parar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ "sala_id": salaId })
  });

  if (response.status === 200) {
    return { success: true };
  } else if (response.status === 401 || response.status === 404) {
    return { success: false, message: "Senha inválida. Por favor, verifique a senha e tente novamente." };
  } else {
    return { success: false, message: "Não foi possível Parar Jogada! Aguarde sua vez!" };
  }
}
