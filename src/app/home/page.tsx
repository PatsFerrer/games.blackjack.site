import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { LogoutButton } from "@/components";
import ServerFunction from "@/components/ServerFunction";

export default async function PaginaInicial() {

  const session = await getServerSession();

  if (!session) {
    redirect('/')
  }

  return (
    <div className="mt-5">Página inicial
      <h1>Olá,{session?.user?.email} </h1>
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
