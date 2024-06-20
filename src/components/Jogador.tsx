import { IJogador } from "@/interface/IJogador"
// type Jogador = {
//   imagemUrl?: string;
//   nome?: string;
//   fichas?: number;
//   cartas?: string[];
// }

// interface PropsJogador {
//   jogador: Jogador;
//   index: number;
// }

export default function Jogador({ jogador, index }: IJogador) {

  let { imagemUrl, nome, fichas, cartas } = jogador;

  const cartasMockadas = [
    "https://via.placeholder.com/150x200?text=Carta+1",
    "https://via.placeholder.com/150x200?text=Carta+2",
  ];

  if (cartas!.length === 0) {
    cartas = cartasMockadas;
  }

  function posicionarCartasX(index: number, cartaIndex: number) {
    if (index === 2 || index === 3) {
      return 155 + -30 * Math.cos((cartaIndex * 2 * Math.PI) / 5);
    }

    return -55 + -30 * Math.cos((cartaIndex * 2 * Math.PI) / 5);
  }

  return (

    <div className="flex flex-col items-center text-center w-20 h-20 relative">
      {/* Cartas */}
      {cartas!.map((cartaUrl, cartaIndex) => (

        <div
          key={cartaIndex}
          className="absolute bg-red-400 w-16 shadow-md rounded-md"
          style={{
            left: `${posicionarCartasX(index, cartaIndex)}%`,
            top: `${65 + 50 * Math.sin((cartaIndex * 2 * Math.PI) / 30)}%`,
            transform: `translate(-10%, -50%)`,
          }}
        >
          <img src={cartaUrl} alt={`Carta ${cartaIndex + 1}`} className="rounded-md shadow-md" />
        </div>
      ))}

      <img
        className="object-cover aspect-square rounded-full mb-2"
        src={imagemUrl}
        alt={`Foto de ${nome}`}
      />

      <h3 className="text-lg text-white font-semibold mb-1">{nome}</h3>
      <p className="text-sm text-white">Fichas: ${fichas}</p>
    </div>
  )
}
