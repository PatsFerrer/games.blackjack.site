"use server"
import Link from "next/link";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

import LogoutButton from "./LogoutButton";
import { ListarPessoasButton } from "@/components";
import { getUsuario } from "@/app/api/endpoints/getUsuario";
import usuariosTopFichas from "@/app/(auth)/home/_actions/usuariosTopFichas";
import { ITopJogador } from "@/interface";
import { formatarFichas, validarImagem } from "@/utils";

export default async function Navbar() {

  let usuarioLogado;
  let user;
  try {
    usuarioLogado = JSON.parse(cookies().get("user")!.value);
    user = await getUsuario(usuarioLogado.id)

  } catch (error) {
    console.error(error, "user perdeu seu cookie!");
    redirect('/');
  }

  let jogadores: ITopJogador[] = [];
  try{
    const response = await usuariosTopFichas();
    jogadores = await response;
  } catch (error) {
    console.log(error);
  }
  
  const { nome, avatarUrl, fichas } = user;

  return (
    <nav className="navbar bg-[#111111] border-gray-200 gap-5 shadow-md p-4">
      <div className="flex-1">
        <Link href="/home">
          <Image
            src="/assets/img/logo-devland-horiz.png"
            alt="Logo Devland"
            className="hidden sm:block"
            width={182}
            height={24}
          />
          <Image
            src="/assets/img/logo-icon_black_05x.png"
            alt="Logo Devland"
            className="sm:hidden h-10"
            width={35}
            height={10}
          />
        </Link>
      </div>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn flex bg-devland hover:bg-devland-100 content-center">
          <div className="flex flex-col gap-1 items-center">
            <div className="text-white truncate max-w-20 h-4">{nome}</div>
            <div className="badge badge-neutral">
              <span>${formatarFichas(fichas)}</span>
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <Image
                  alt={`Foto de ${nome}`}
                  src={validarImagem(avatarUrl)}
                  width={500}
                  height={500}
                  quality={100}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li className="">
                <Link href="/home" className="justify-between">
                  Início
                </Link>
              </li>
              {/* <li>
                <Link href="" className="justify-between">
                  Editar Perfil
                </Link>
              </li> */}
              <li>
                <LogoutButton />
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* trofeu */}
      <ListarPessoasButton topJogadores = {jogadores}/>
    </nav>
  );
}
