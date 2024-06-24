import Link from "next/link";
import { cookies } from "next/headers";
import ListPathPages from "./ListPathPages";
import LogoutButton from "./LogoutButton";
import ListarPessoasButton from "./ListarPessoasButton";

export default async function Navbar() {
  const user = JSON.parse(cookies().get("user")!.value);

  const { login, avatar, email } = user;

  return (
    <nav className="navbar bg-[#111111] border-gray-200 gap-5 shadow-md ">
      <div className="flex-1">
        <Link href="/home">
          <img
            src="./img/logo-devland-horiz.png"
            alt="Logo ESX"
            className="h-6"
          />
        </Link>
      </div>

      <ListPathPages />

      {/* dropdown do perfil */}
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn flex flex-col">
          <div>{login}</div>
          <div className="badge badge-neutral ">
            <span>$30000</span> {/* colocar qtd de fichas */}
          </div>

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt={`Foto de ${login}`} src={avatar} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li className="md:hidden">
                <Link href="/home" className="justify-between">
                  Início
                </Link>
              </li>
              <li className="md:hidden">
                <Link href="/criar-sala" className="justify-between">
                  Criar Sala
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
      <ListarPessoasButton/>
    </nav>
  );
}
