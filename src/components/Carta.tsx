interface Carta {
  imagemUrl: string;
}

export default function Carta({ imagemUrl }: Carta) {
  return (
    <div className="absolute bg-white w-16 h-20 shadow-md rounded-md">
      <img
        src={imagemUrl}
        alt="Carta"
        className="w-full h-full object-contain rounded-md"
      />
    </div>
  )
}
