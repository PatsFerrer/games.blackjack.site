import Link from "next/link";
import { cookies } from "next/headers";
import LogoutButton from "./LogoutButton";
import Image from "next/image";

import { ListarPessoasButton } from "@/components";
import { redirect } from "next/navigation";
import validarImagem from "@/utils/imageUtil";
import { getUsuario } from "@/app/api/endpoints/getUsuario";

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

  const { nome, avatarUrl, fichas } = user;

  return (
    <nav className="navbar bg-[#111111] border-gray-200 gap-5 shadow-md p-4">
      <div className="flex-1">
        <Link href="/home">
          <Image
            src="/img/logo-devland-horiz.png"
            alt="Logo Devland"
            className="h-6"
            width={182}
            height={24}
          />
        </Link>
      </div>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn flex flex-col bg-devland hover:bg-devland-100">
          <div className="text-white">{nome}</div>
          <div className="badge badge-neutral">
            <span>${fichas}</span>
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
              <li>
                <Link href="/editar-cadastro" className="justify-between">
                  Editar Perfil
                </Link>
              </li>
              <li>
                <LogoutButton />
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* trofeu */}
      <ListarPessoasButton />
    </nav>
  );
}
