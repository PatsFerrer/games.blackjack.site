type Dealer = {
  cartas?: string[];
};

export default function Dealer({ cartas }: Dealer) {
  const cartasMock = ["./../cartas/2-D.png", "./../cartas/BACK.png"];

  return (
    <div
      className="absolute rounded-full border-4 border-yellow-600 w-24 h-24"
      style={{
        left: `50%`,
        top: `-20%`,
        transform: `translate(-50%, -50%)`,
      }}
    >
      {/* Cartas do Dealer */}
      {cartasMock.map((cartaUrl, cartaIndex) => (
        <div
          key={cartaIndex}
          className="absolute bg-red-400 w-14 shadow-md rounded-md"
          style={{
            left: `${-55 + -30 * Math.cos((cartaIndex * 2 * Math.PI) / 5)}%`,
            top: `${50 + 50 * Math.sin((cartaIndex * 2 * Math.PI) / 30)}%`,
            transform: `translate(-10%, -50%)`,
          }}
        >
          <img
            src={cartaUrl}
            alt={`Carta ${cartaIndex + 1}`}
            className="w-14 rounded-md shadow-md"
          />
        </div>
      ))}

      <img
        className="object-cover aspect-square rounded-full"
        src="./../dealer.png"
        alt={"Foto de Dealer"}
      />
    </div>
  );
}
