'use client'
import { useParams } from "next/navigation";
import novaPartida from "../_actions/novaPartida";
import { toast } from "react-toastify";
import { VscDebugRestart } from "react-icons/vsc";

interface NovaPartidaProps{
  className: string
  // setVisibilidade: (visibilidade: boolean) => void;
  // atualizarJogo: () => void;
}

export default function NovaPartidaButton({className}: NovaPartidaProps) {
  const { salaId } = useParams<{ salaId: string }>();

  const handleNovaPartida = async () => {
    try {
      const result = await novaPartida(salaId);
      if (result.success) {
        console.log("Nova partida realizada com sucesso");
        // setVisibilidade(false);
        // atualizarJogo();
      } else {
        toast.error(result.message || "Erro ao comprar carta");
      }
    } catch (error) {
      console.error("Erro ao processar nova partida", error);
      toast.error("Erro ao iniciar nova partida");
    }
  };
  
  return (
    <div className={className}>
      {/* botão deixar a mesa */}
      <button onClick={handleNovaPartida} className="md:hidden btn bg-blue-950 text-white hover:bg-blue-900">
        <VscDebugRestart />
      </button>
      <button onClick={handleNovaPartida} className="hidden md:flex btn bg-blue-950 text-white hover:bg-blue-900">
        <VscDebugRestart />
        Nova partida
      </button>
    </div>
  );
}
