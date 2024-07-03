import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import ConexaoMesa from "@/components/ConexaoMesa";
// import { IJogador } from "@/interface/IJogador";
import { EventosProvider } from "@/context/EventosContext";
import { Mesa } from "@/components";

export default async function Sala({ params }: { params: { salaId: string } }) {
  const session = await getServerSession();

  if (!session) {
    redirect("/");
  }
  //  console.log(params);
  

  // TODO: Implementar jogadores vindo da API
  // const [jogadores2, setJogadores2] = useState<IJogador[]>([]);
  // const [isLoading, setLoading] = useState(true);

  // jogadores mock

  return (
      <Mesa salaId={params.salaId}/>
  );
}
