"use client";
import { useEventosContext } from "@/context/EventosContext";
import Link from "next/link";
import { FaArrowLeft, FaShareAlt } from "react-icons/fa";
import Dealer from "./Dealer";
import Jogador from "./Jogador";
import ComprarCartaButton from "./ComprarCartaButton";
import { getStatusJogo } from "@/app/api/servicos/jogoServico"
import { useEffect, useState } from "react";
import ConvidarAmigoModal from "./ConvidarAmigoModal";
import io from 'socket.io-client';
import PararJogadaButton from "./PararButton";
import SnackbarInformaGanhador from "./SnackbarInformaGanhador";

interface IProps {
  salaId: string;
  [key: string]: any
}

const Mesa: React.FC<IProps> = ({salaId, ...props}) => {
  const { eventos } = useEventosContext();

  const [jogo, setJogo] = useState();
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [showSnackbar, setShowSnackbar] = useState(true); //snackbar informa ganhador 

  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const socket = io('http://localhost:3002', {
      transports: ['websocket'],
    });

    socket.on('connect', () => {
      console.log('Connected to socket server');
    });

    socket.on('mensagem', (message: string) => {
      const evento = JSON.parse(message);
      if(evento.Tipo == 8){
        //O que fazer patricia?
        //R: Verifica se o array que está dentro do Valor contem o ID do usuario que está jogando, se tiver mostra o snackbar de ganhador, se não de perdedor;
        console.log("Patricia");
      }
      console.log(message);
      fetchStatus(false);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    fetchStatus(true);
  }, []);

  const fetchStatus = async (hasLoading: boolean) => {
    try {
      if(hasLoading){
        setLoading(true);
      }
      const data = await getStatusJogo(salaId);
      const jogo = await data.json();
      setJogo(jogo);
    } catch (error) {
      setError(true);
      console.error("Deu ruim", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex justify-center items-center min-h-screen bg-green-800">
      {isError ? <div>Deu ruim: Erro</div>: isLoading ? (<span className="loading loading-dots loading-lg text-white"></span>) : (<>
        <Link
          href="/home"
          className="md:hidden btn bg-blue-950 text-white hover:bg-blue-900 absolute top-10 left-5"
        >
          <FaArrowLeft />
        </Link>
        <Link
          href="/home"
          className="hidden md:flex btn bg-blue-950 text-white hover:bg-blue-900 absolute top-10 left-5"
        >
          <FaArrowLeft />
          Deixar a mesa
        </Link>

        {/*  botao convidar amigos */}
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden btn bg-blue-950 text-white hover:bg-blue-900 absolute top-10 right-5">
          <FaShareAlt />
        </button>
        <button
          onClick={() => setIsOpen(true)}
          className="hidden md:flex btn bg-blue-950 text-white hover:bg-blue-900 absolute top-10 right-5">
          Convidar amigos
          <FaShareAlt />
        </button>
        {isOpen && (
          <ConvidarAmigoModal
            onClose={() => setIsOpen(false)} />
        )}

        {/* Mesa */}
        <div className="relative w-4/5 h-96 border border-indigo-100 rounded-3xl md:max-w-[950px] bg-blue-950 shadow-sm shadow-slate-900 hover:shadow-lg">
          {/* cadeiras dos jogadores */}
          <div className="absolute inset-0 flex justify-center items-center">
            {/* Dealer */}
            <Dealer cartas={jogo.dealer.cartas}/>

            {/* Jogadores ao redor da mesa */}
            {jogo.jogadores.map((jogador, index) => (
              <div
                key={jogador.usuarioId}
                className={`absolute rounded-full border-4 border-yellow-600`}
                style={{
                  left: `${46 + 55 * Math.cos((index * 2 * Math.PI) / 5)}%`, // Posição X
                  top: `${52 + 53 * Math.sin((index * 2 * Math.PI) / 5)}%`, // Posição Y
                  transform: `translate(-50%, -43%)`,
                }}
              >
                {/* componente jogador */}
                <Jogador jogador={jogador} index={index} />
              </div>
            ))}
          </div>

          {/* deck */}
          <div className="relative bg-red-400 w-14 h-18 shadow-md rounded-md left-[65.33%] top-[-31.66%] ">
            <img
              src=" ./../cartas/BACK.png"
              alt="Cartas"
              className="w-14 h-18 rounded-md shadow-md"
            />
          </div>
        </div>
        {/* Mesa fim */}

        {/*  snackbar informa ganhador */}
        <SnackbarInformaGanhador
          message="Parabéns! Você é o ganhador! (teste, clique em fechar)"
          show={showSnackbar}
          onClose={() => setShowSnackbar(false)}
        />


        {/* chama funçao comprar carta */}
        <ComprarCartaButton />

        {/* chama a função Parar */}
        <PararJogadaButton />
      </>
      )
      }

    </main>
  );
};

export default Mesa;
