"use client";

import Link from "next/link";
import { FaArrowLeft, FaShareAlt } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

import io from "socket.io-client";
import {
  jogadorConectado,
  jogadorDesconectado,
  getStatusJogo,
} from "@/app/(auth)/mesa/_actions";
import getUser from "@/app/(auth)/mesa/_actions/getUser";
import { TCarta, TJogador } from "@/types";
import ConvidarAmigoModal from "./ConvidarAmigoModal";
import Dealer from "./Dealer";
import Jogador from "./Jogador";
import SnackbarGanhador from "./SnackbarGanhador";
import ApostarFichas from "./ApostarFichas";
import ComprarCartaButton from "./ComprarCartaButton";
import PararJogadaButton from "./PararJogadaButton";
import NovaPartidaButton from "./NovaPartidaButton";

interface IProps {
  salaId: string;
  [key: string]: any;
  className?: string;
}

const Mesa: React.FC<IProps> = ({ salaId, ...props }) => {
  const [jogo, setJogo] = useState<any>({
    dealer: { cartas: [] },
    jogadores: [],
  });
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const modalRef = useRef<HTMLDialogElement>(null);
  const [dealerCartasFinais, setDealerCartasFinais] = useState<boolean>(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [ganhadores, setGanhadores] = useState<string[]>([]);
  const [perdedores, setPerdedores] = useState<string[]>([]);
  const [empates, setEmpates] = useState<string[]>([]);
  const [userId, setUserId] = useState<string>("");
  const [userLogin, setUserLogin] = useState<string>("");

  useEffect(() => {
    const socket = io("https://blackjack-socket.azurewebsites.net/" , {
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

      socket.emit('join_room', salaId)
    });

    socket.on("disconnect", async () => {
      await jogadorDesconectado(salaId);
    });

    socket.on("mensagem", async (message: string) => {
      const evento = JSON.parse(message);

      if (evento.Tipo == 0) {
        const valorObj = evento.Valor;
        let novoJogador: TJogador = {
          avatarUrl: valorObj.AvatarUrl,
          cartas: valorObj.Cartas,
          ehVez: valorObj.EhVez,
          fichas: valorObj.Fichas,
          fichasApostadas: valorObj.FichasApostadas,
          nome: valorObj.Nome,
          usuarioId: evento.Valor.UsuarioId,
        };
        setJogo((prevJogo: any) => {
          const jogadoresAtualizados = [...prevJogo.jogadores, novoJogador];
          return { ...prevJogo, jogadores: jogadoresAtualizados };
        });
      } else if(evento.Tipo == 1){
        const valorObj = evento.Valor;
        const jogadorDesconectado = valorObj.UserId
        setJogo((prevJogo: any) => {
          const jogadoresAtualizados = prevJogo.jogadores.filter(
            (jogador: any) => jogador.usuarioId !== jogadorDesconectado
          );
          return { ...prevJogo, jogadores: jogadoresAtualizados };
        });

      } else if (evento.Tipo == 2) {
        //comprar carta
        const novaCarta: TCarta = { alt: evento.Valor };
        setJogo((prevJogo: any) => {
          const jogadoresAtualizados = prevJogo.jogadores.map(
            (jogador: any) => {
              if (jogador.usuarioId === evento.UserId) {
                return { ...jogador, cartas: [...jogador.cartas, novaCarta] };
              }
              return jogador;
            }
          );
          return { ...prevJogo, jogadores: jogadoresAtualizados };
        });
      } else if (evento.Tipo == 4) {
        //apostar
        setJogo((prevJogo: any) => {
          const apostaAtualizada = prevJogo.jogadores.map((jogador: any) => {
            if (jogador.usuarioId === evento.UserId) {
              return { ...jogador, fichasApostadas: [evento.Valor] };
            }
            return jogador;
          });
          return { ...prevJogo, jogadores: apostaAtualizada };
        });
      } else if (evento.Tipo == 6) {
        //definir ganhadores
        const cartas: TCarta[] = evento.Valor.map((alt: string) => ({ alt }));
        setJogo((prevJogo: any) => {
          return { ...prevJogo, dealer: { cartas } };
        });
        setDealerCartasFinais(true);
      } else if (evento.Tipo == 7) {
        //iniciar jogo
        fetchStatus(false);
        setDealerCartasFinais(false);
      } else if (evento.Tipo == 8) {
        //nova partida
        setShowSnackbar(true);
        const valorObj = JSON.parse(evento.Valor);
        try {
          setGanhadores(valorObj.Ganhadores);
          setPerdedores(valorObj.Perdedores);
          setEmpates(valorObj.Empates);
        } catch (error) {
          console.error("Erro ao parsear o JSON de Valor:", error);
        }
      }
    });

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      socket.disconnect();
    };
  }, [salaId]);

  const fetchStatus = async (hasLoading: boolean = true) => {
    try {
      if (hasLoading) {
        setLoading(true);
      }
      const data = await getStatusJogo(salaId);
      const jogo = await data;
      const jogoAtualizado = {
        ...jogo,
        dealer: {
          ...jogo.dealer,
          cartas: jogo.dealer.cartas.map((carta: string) => ({ alt: carta })),
        },
        jogadores: jogo.jogadores.map((jogador: any) => ({
          ...jogador,
          cartas: jogador.cartas.map((carta: string) => ({ alt: carta })),
        })),
      };
      setJogo(jogoAtualizado);
    } catch (error) {
      setError(true);
      console.error("Deu ruim", error);
    } finally {
      setLoading(false);
    }
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
            <Link
              href="/home"
              className="md:hidden btn bg-blue-950 text-white hover:bg-blue-900"
            >
              <FaArrowLeft />
            </Link>
            <Link
              href="/home"
              className="hidden md:flex btn bg-blue-950 text-white hover:bg-blue-900"
            >
              <FaArrowLeft />
              Deixar a mesa
            </Link>

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

          <div className="relative w-4/5 h-96 border border-indigo-100 rounded-3xl md:max-w-[950px] bg-blue-950 shadow-sm shadow-slate-900 hover:shadow-lg">
            <div className="absolute inset-0 flex justify-center items-center">
              {jogo.dealer && jogo.dealer.cartas ? (
                <Dealer
                  className={`absolute rounded-full border-4 border-yellow-600 w-24 h-24`}
                  cartas={
                    dealerCartasFinais
                      ? jogo.dealer.cartas
                      : jogo.dealer.cartas.slice(0, 2)
                  }
                  virarCarta={dealerCartasFinais}
                />
              ) : (
                <div className="text-white">Carregando dealer...</div>
              )}

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
          <ApostarFichas
            close={() => modalRef.current?.close()}
            idSala={salaId}
          />

          <div className="flex w-full px-5 2xl:w-4/5 justify-between">
            <div>
              <NovaPartidaButton
                // setVisibilidade={setDealerCartasFinais}
                // atualizarJogo={fetchStatus}
                className={dealerCartasFinais ? "" : "hidden"}
              />
            </div>

            <div className="flex gap-1">
              <ComprarCartaButton />
              <PararJogadaButton />
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default Mesa;
