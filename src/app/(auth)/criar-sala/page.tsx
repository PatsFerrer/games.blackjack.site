import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function CriarSala() {

  const session = await getServerSession();

  if (!session) {
    redirect('/')
  }

  return (
    <div>Criar Sala</div>
  )
}
