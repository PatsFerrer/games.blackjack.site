import { TDealer } from "@/types";

export default function Dealer({ cartas = [], className, virarCarta }: TDealer) {
  return (
    <div
      className={className}
      style={{
        left: `50%`,
        top: `-20%`,
        transform: `translate(-50%, -50%)`,
      }}
    >
      {/* Cartas do Dealer */}
      {cartas.map((carta, cartaIndex) => (
        <div
          key={cartaIndex}
          className="absolute bg-red-400 w-14 shadow-md rounded-md"
          style={{
            left: `${-55 + -30 * Math.cos((cartaIndex * 2 * Math.PI) / 5)}%`,
            top: `${50 + 50 * Math.sin((cartaIndex * 2 * Math.PI) / 30)}%`,
            transform: `translate(-10%, -50%)`,
          }}
        >
          {cartaIndex === 1 && virarCarta === false ? (
            <img
              src="./../assets/cartas/BACK.png"
              alt="Carta Escondida"
              className="w-14 rounded-md shadow-md"
            />
          ) : (
            <img
              src={`./../assets/cartas/${carta.alt}.png`}
              alt={`Carta ${carta.alt}`}
              className="w-14 rounded-md shadow-md"
            />
          )}
        </div>
      ))}

      <img
        className="object-cover aspect-square rounded-full"
        src="./../assets/img/dealer.png"
        alt="Foto de Dealer"
      />
    </div>
  );
}
