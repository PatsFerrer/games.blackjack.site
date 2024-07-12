"use client";
import { useEventosContext } from "@/context/EventosContext";
import Link from "next/link";
import { FaArrowLeft, FaShareAlt } from "react-icons/fa";
import Dealer from "./Dealer";
import Jogador from "./Jogador";
import ComprarCartaButton from "./ComprarCartaButton";
import { getStatusJogo, jogadorConectado, jogadorDesconectado } from "@/app/api/servicos/jogoServico";
import { useEffect, useState } from "react";
import ConvidarAmigoModal from "./ConvidarAmigoModal";
import io from "socket.io-client";
import PararJogadaButton from "./PararButton";
import { Result } from "@/types";
import SnackbarGanhador from "./SnackbarGanhador";

interface IProps {
  salaId: string;
  [key: string]: any;
}

const Mesa: React.FC<IProps> = ({ salaId, ...props }) => {
  const { eventos } = useEventosContext();

  const [jogo, setJogo] = useState(); //verificar tipo para objeto
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [resultado, setResultado] = useState<Result>(Result.EMPATE);
  const [ganhadores, setGanhadores] = useState<string[]>([]);
  const [perdedores, setPerdedores] = useState<string[]>([]);
  const [win, setWin] = useState<boolean>(false)
  const [dealerWin, setDealerWin] = useState<boolean>(false)

  useEffect(() => {
    const socket = io("http://localhost:3002", {
      transports: ["websocket"],
    });

    socket.on("connect", async () => {
      console.log("Connected to socket server");
      await jogadorConectado(salaId);
      fetchStatus(true);
    });

    socket.on("disconnect", async () => {
      await jogadorDesconectado(salaId);
    });

    socket.on("mensagem", async (message: string) => {
      const evento = JSON.parse(message);
      let userId;

      if (evento.Tipo == 6) {
        console.log('entrei no tipo 6')

      } else if (evento.Tipo == 8) {
        setShowSnackbar(true);

        try {
          const valorObj: Resultado = JSON.parse(evento.Valor);

          setGanhadores(valorObj.Ganhadores)
          setPerdedores(valorObj.Perdedores)

        } catch (error) {
          console.error('Erro ao parsear o JSON de Valor:', error);
        }
      } else if (evento.Tipo == 0) {
        sessionStorage.setItem('userId', JSON.stringify(evento.UserId));

      } else if (evento.Tipo == 1) {
        console.log("evento tipo 1: desconectado")
      }
      console.log(message);
      fetchStatus(false);
    });

    fetchStatus(true);

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('userId')!);
    console.log(user)

    if (ganhadores.includes(user)) {
      setResultado(Result.VITORIA)
    } else if (perdedores.includes(user)) {
      setResultado(Result.DERROTA)
    } else {
      setResultado(Result.EMPATE)
    }
  }, [ganhadores, perdedores]);

  const fetchStatus = async (hasLoading: boolean) => {
    try {
      if (hasLoading) {
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
  };

  const handleCartaComprada = () => {
    // Função para atualizar o estado do jogo após comprar a carta
    fetchStatus(false); // Atualiza o estado do jogo
  };

  return (
    <main className="flex justify-center items-center min-h-screen bg-green-800">
      {isError ? (
        <div>Deu ruim: Erro</div>
      ) : isLoading ? (
        <span className="loading loading-dots loading-lg text-white"></span>
      ) : (
        <>
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
            className="md:hidden btn bg-blue-950 text-white hover:bg-blue-900 absolute top-10 right-5"
          >
            <FaShareAlt />
          </button>
          <button
            onClick={() => setIsOpen(true)}
            className="hidden md:flex btn bg-blue-950 text-white hover:bg-blue-900 absolute top-10 right-5"
          >
            Convidar amigos
            <FaShareAlt />
          </button>
          {isOpen && <ConvidarAmigoModal onClose={() => setIsOpen(false)} />}

          {/* Mesa */}
          <div className="relative w-4/5 h-96 border border-indigo-100 rounded-3xl md:max-w-[950px] bg-blue-950 shadow-sm shadow-slate-900 hover:shadow-lg">
            {/* cadeiras dos jogadores */}
            <div className="absolute inset-0 flex justify-center items-center">
              {/* Dealer */}
              <Dealer
                className={`absolute rounded-full border-4 border-yellow-600 w-24 h-24`}
                cartas={jogo.dealer.cartas}
              />

              {/* Jogadores ao redor da mesa */}
              {jogo.jogadores.map((jogador, index) => (

                <Jogador
                  index={index}
                  ganhadores={ganhadores}
                  perdedores={perdedores}
                  jogador={jogador}
                />

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
          <SnackbarGanhador
            resultado={resultado}
            show={showSnackbar}
            onClose={() => setShowSnackbar(false)}
          />


          {/* chama funçao comprar carta */}
          <ComprarCartaButton onCartaComprada={handleCartaComprada} />

          {/* chama a função Parar */}
          <PararJogadaButton />
        </>
      )}
    </main>
  );
};

export default Mesa;
