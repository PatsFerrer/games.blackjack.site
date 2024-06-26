import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Image from "next/image";

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

      <Image
        alt={`Foto de ${login}`}
        src={avatar ? avatar : "/img/logo-circ_black_05x.png"}
        width={200}
        height={200}
        quality={100}
      />

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
