import { useParams } from "next/navigation";
import { TbHandStop } from "react-icons/tb";
import novaPartida from "../_actions/novaPartida";
import { toast } from "react-toastify";

interface NovaPartidaProps{
  className: string
  // setVisibilidade: (visibilidade: boolean) => void;
  // atualizarJogo: () => void;
}

export default function NovaPartida({className}: NovaPartidaProps) {
  const { salaId } = useParams<{ salaId: string }>();

  const handleNovaPartida = async () => {
    try {
      const result = await novaPartida(salaId);
      if (result.success) {
        console.log("Compra de carta realizada com sucesso");
        // setVisibilidade(false);
        // atualizarJogo();
      } else {
        toast.error(result.message || "Erro ao comprar carta");
      }
    } catch (error) {
      console.error("Erro ao processar compra de carta", error);
      toast.error("Erro ao comprar carta");
    }
  };
  
  return (
    <div className={className}>
      {/* botão deixar a mesa */}
      <button onClick={handleNovaPartida} className="md:hidden btn bg-blue-950 text-white hover:bg-blue-900">
        <TbHandStop />
      </button>
      <button onClick={handleNovaPartida} className="hidden md:flex btn bg-blue-950 text-white hover:bg-blue-900">
        <TbHandStop />
        Iniciar nova partida
      </button>
    </div>
  );
}
