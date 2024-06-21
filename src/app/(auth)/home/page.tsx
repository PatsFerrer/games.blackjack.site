import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { LogoutButton } from "@/components";
import ServerFunction from "@/components/ServerFunction";
import { cookies } from "next/headers";

export default async function PaginaInicial() {

  const session = await getServerSession();

  const user = JSON.parse(cookies().get('user')!.value)

  const { login, avatar, email } = user;

  if (!session) {
    redirect('/')
  }

  return (
    <div className="">Página inicial
      <h1 className="text-2xl">Todas as mesas</h1>
      <h1>Olá, {login} </h1>
      <h1>email: {email} </h1>

      <div className="w-10 rounded-full ">
        <img src={avatar} alt={`avatar de ${login}`} />
      </div>

      <div>
        <LogoutButton />
      </div>
      <div>
        {/* acessando o Function1 */}
        <ServerFunction />
      </div>
    </div>
  )
}
