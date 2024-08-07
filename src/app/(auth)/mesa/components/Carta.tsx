import { ICarta } from "@/interface"

export default function Carta({ imagemUrl }: ICarta) {
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
