"use client";
import { useEventosContext } from "@/context/EventosContext";
import Link from "next/link";
import { FaArrowLeft, FaShareAlt } from "react-icons/fa";
import Dealer from "./Dealer";
import Jogador from "./Jogador";
import ComprarCartaButton from "./ComprarCartaButton";
import { useEffect, useRef, useState } from "react";
import ConvidarAmigoModal from "./ConvidarAmigoModal";
import io from "socket.io-client";
import PararJogadaButton from "./PararButton";
import SnackbarGanhador from "./SnackbarGanhador";
import { jogadorConectado, jogadorDesconectado, getStatusJogo } from "@/app/(auth)/mesa/_actions";
import ApostarFichas from "./ApostarFichas";
import getUser from "@/app/(auth)/mesa/_actions/getUser";

interface IProps {
  salaId: string;
  [key: string]: any;
  className?: string
}

const Mesa: React.FC<IProps> = ({ salaId, ...props }) => {
  const [jogo, setJogo] = useState<any>({ dealer: { cartas: [] }, jogadores: [] });
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const modalRef = useRef<HTMLDialogElement>(null);

  const [messages, setMessages] = useState<string[]>([]);
  const [ganhadores, setGanhadores] = useState<string[]>([]);
  const [perdedores, setPerdedores] = useState<string[]>([]);
  const [empates, setEmpates] = useState<string[]>([]);
  const [userId, setUserId] = useState<string>("");
  const [userLogin, setUserLogin] = useState<string>("");

  useEffect(() => {
    const socket = io("https://blackjack-socket.azurewebsites.net", {
      transports: ["websocket"],
    });

    const handleBeforeUnload = async () => {
      await jogadorDesconectado(salaId);
    };

    socket.on("connect", async () => {
      console.log("Connected to socket server");
      await jogadorConectado(salaId);
      let usuario = await getUser();
      setUserId(usuario.id);
      setUserLogin(usuario.login);
      fetchStatus(true);
    });

    socket.on("disconnect", async () => {
      await jogadorDesconectado(salaId);
    });

    socket.on("mensagem", async (message: string) => {
      const evento = JSON.parse(message);

      if (evento.Tipo == 8) {
        setShowSnackbar(true);
        const valorObj = JSON.parse(evento.Valor);
        try {
          setGanhadores(valorObj.Ganhadores)
          setPerdedores(valorObj.Perdedores)   
          setEmpates(valorObj.Empates)    
        } catch (error) {
          console.error('Erro ao parsear o JSON de Valor:', error);
        }
      } 

      fetchStatus(false);
    });

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      socket.disconnect();
    };
  }, [salaId]);

  const handleSairMesa = () => {
    sessionStorage.removeItem('userId')
  }

  const fetchStatus = async (hasLoading: boolean) => {
    try {
      if (hasLoading) {
        setLoading(true);
      }
      const data = await getStatusJogo(salaId);
      const jogo = await data;
      setJogo(jogo);
    } catch (error) {
      setError(true);
      console.error("Deu ruim", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCartaComprada = () => {
    fetchStatus(false);
  };

  return (
    <main className="flex flex-col justify-center items-center h-full bg-green-800 gap-12">
      {isError ? (
        <div>Deu ruim: Erro</div>
      ) : isLoading ? (
        <span className="loading loading-dots loading-lg text-white"></span>
      ) : (
        <>
          <div className="flex justify-between w-full px-5 2xl:w-4/5">
            {/* botão deixar a mesa */}
            <Link
              href="/home"
              className="md:hidden btn bg-blue-950 text-white hover:bg-blue-900"
            >
              <FaArrowLeft />
            </Link>
            <Link
              href="/home"
              className="hidden md:flex btn bg-blue-950 text-white hover:bg-blue-900"
              onClick={() => handleSairMesa()}
            >
              <FaArrowLeft />
              Deixar a mesa
            </Link>

            {/*  botao convidar amigos */}
            <button
              onClick={() => setIsOpen(true)}
              className="md:hidden btn bg-blue-950 text-white hover:bg-blue-900"
            >
              <FaShareAlt />
            </button>
            <button
              onClick={() => setIsOpen(true)}
              className="hidden md:flex btn bg-blue-950 text-white hover:bg-blue-900"
            >
              Convidar amigos
              <FaShareAlt />
            </button>
          </div>

          {isOpen && <ConvidarAmigoModal onClose={() => setIsOpen(false)} />}

          {/* Mesa */}
          <div className="relative w-4/5 h-96 border border-indigo-100 rounded-3xl md:max-w-[950px] bg-blue-950 shadow-sm shadow-slate-900 hover:shadow-lg">
            {/* cadeiras dos jogadores */}
            <div className="absolute inset-0 flex justify-center items-center">
              {/* Dealer */}
              {jogo.dealer && jogo.dealer.cartas ? (
                <Dealer
                  className={`absolute rounded-full border-4 border-yellow-600 w-24 h-24`}
                  cartas={jogo.dealer.cartas}
                />
              ) : (
                <div className="text-white">Carregando dealer...</div>
              )}

              {/* Jogadores ao redor da mesa */}
              {jogo.jogadores ? (
                jogo.jogadores.map((jogador: any, index: number) => (
                  <Jogador
                    key={index}
                    index={index}
                    ganhadores={ganhadores}
                    perdedores={perdedores}
                    empates={empates}
                    jogador={jogador}
                  />
                ))
              ) : (
                <div className="text-white">Carregando jogadores...</div>
              )}
            </div>
          </div>

          {/*  snackbar informa ganhador */}
          {showSnackbar && (
            <SnackbarGanhador
              ganhadores={ganhadores}
              perdedores={perdedores}
              empates={empates}
              show={showSnackbar}
              onClose={() => setShowSnackbar(false)} 
              userId={userId}
              userLogin={userLogin}
            />
          )}
          <ApostarFichas close={() => modalRef.current?.close()} idSala={salaId}/>

          <div className="flex w-full px-5 justify-end gap-2 2xl:w-4/5">
            {/* chama função comprar carta */}
            <ComprarCartaButton onCartaComprada={handleCartaComprada} />
            {/* chama a função Parar */}
            <PararJogadaButton />
          </div>
        </>
      )}
    </main>
  );
};

export default Mesa;
