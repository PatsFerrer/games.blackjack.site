"use server";

import { cookies } from "next/headers";

export default async function getStatusJogo(salaId:string) {

  const token = cookies().get("token")?.value;

  if (!token) {
    return { success: false, message: "Usuário não autenticado" };
  }

  const response = await fetch(`${process.env.API_URL}/jogo/status/${salaId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  });

  if (response.status === 200) {
    return response.json();
  } else if (response.status === 401 || response.status === 404) {
    return { success: false, message: "Senha inválida. Por favor, verifique a senha e tente novamente." };
  } else {
    return { success: false, message: "Ocorreu um erro. Por favor, tente novamente mais tarde." };
  }
}