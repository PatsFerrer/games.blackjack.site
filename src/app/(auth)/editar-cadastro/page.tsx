import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function EditarCadastro() {
  
  const session = await getServerSession();

  if (!session) {
    redirect('/')
  }
  return (
    <div>Editar Cadastro</div>
  )
}
