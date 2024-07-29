"use server";

import { cookies } from "next/headers";
import { ITopJogador } from "@/interface/ITopJogador";

export default async function usuariosTopFichas() {

  const token = cookies().get("token")?.value;

  if (!token) {
    return { success: false, message: "Usuário não autenticado" };
  }

  const response = await fetch(`${process.env.API_URL}/usuarios/topfichas`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  });

  if (response.status === 200) {
    const data = await response.json();
    return data;
  } else if (response.status === 401 || response.status === 404) {
    return { success: false, message: "Senha inválida. Por favor, verifique a senha e tente novamente." };
  } else {
    return { success: false, message: "Ocorreu um erro. Por favor, tente novamente mais tarde." };
  }
}
