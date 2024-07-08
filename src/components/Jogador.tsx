import { IJogador } from "@/interface/IJogador"
import validarImagem from "@/utils/imageUtil";

export default function Jogador({ jogador, index }: IJogador) {

  //  console.log(jogador)
  let { avatarUrl, nome, fichas, fichasApostadas, cartas } = jogador;

  function posicionarCartasX(index: number, cartaIndex: number) {
    if (index === 2 || index === 3) {
      return 155 + -30 * Math.cos((cartaIndex * 2 * Math.PI) / 5);
    }

    return -55 + -30 * Math.cos((cartaIndex * 2 * Math.PI) / 5);
  }

  return (

    <div className="flex flex-col items-center text-center w-20 h-20 relative">
      {/* Cartas */}
      {cartas!.map((carta, cartaIndex) => (
        <div
          key={cartaIndex}
          className="absolute bg-red-400 w-16 shadow-md rounded-md"
          style={{
            left: `${posicionarCartasX(index, cartaIndex)}%`,
            top: `${65 + 50 * Math.sin((cartaIndex * 2 * Math.PI) / 30)}%`,
            transform: `translate(-10%, -50%)`,
          }}
        >
          <img src={`./../cartas/${carta.alt}.png`} alt={`Carta ${cartaIndex + 1}`} className="rounded-md shadow-md" />
        </div>
      ))}

      <img
        className="object-cover aspect-square rounded-full mb-2"
        src={validarImagem(avatarUrl)}
        alt={`Foto de ${nome}`}
      />

      <h3 className="text-lg text-white font-semibold mb-1">{nome}</h3>
      <p className="text-sm text-white">Fichas: ${fichas}</p>
      <p className="text-sm text-white">Fichas Apostadas: ${fichasApostadas}</p>
    </div>
  )
}
