import Link from "next/link";
import { FaTrophy } from "react-icons/fa";
import { cookies } from "next/headers";
import ListPathPages from "./ListPathPages";
import LogoutButton from "./LogoutButton";

export default async function Navbar() {

  const user = JSON.parse(cookies().get('user')!.value)

  const { login, avatar, email } = user;

  return (

    <nav className="navbar bg-[#111111] border-gray-200 gap-5 shadow-md ">

      <div className="flex-1">
        <Link href="/home">
          <img src="./img/logo-devland-horiz.png" alt="Logo ESX" className="h-6" />
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
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt={`Foto de ${login}`} src={avatar} />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
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
      <div className="dropdown dropdown-end ">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle mr-4">
          <div className="indicator">
            <FaTrophy className="text-4xl text-slate-100" />
            <span className="badge badge-sm indicator-item">Top</span>
          </div>
        </div>

        {/* Apenas um exemplo dentro do troféu */}
        <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
          <div className="card-body">
            <span className="font-bold text-lg">8 Items</span>
            <span className="text-info">Subtotal: $999</span>
            <div className="card-actions">
              <button className="btn btn-primary btn-block">View cart</button>
            </div>
          </div>
        </div>
        
      </div>

    </nav >


  )
}
