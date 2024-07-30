"use client"
import { useSearchParams, useRouter } from "next/navigation";
import { FC, useState } from "react";
import Loading from "./Loading";
import entrarSala from "@/app/(auth)/home/_actions/entrarSala";

interface VerificarSenhaProps {
  sala: any;
}

const VerificarSenhaSala: FC<VerificarSenhaProps> = ({ sala }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.target as HTMLFormElement);
    const result = await entrarSala(formData);

    if (result.success) {
      router.push(`/mesa/${sala.id}`);
    } else {
      setError(result.message || "Erro desconhecido");
    }
    setLoading(false);
  };

  return (
    <form className="space-y-6 " onSubmit={handleSubmit}>
      <div className="flex items-center flex-col gap-2">
        <h3 className="text-2xl text-center font-bold text-gray-900">
          Insira a senha de {sala.nome}
        </h3>
        <label hidden>
          <input type="text" name="nome" value={sala.nome} readOnly />
        </label>
        <label hidden>
          <input type="text" name="salaId" value={sala.id} readOnly />
        </label>
        <div className="flex justify-between"></div>
        <input
          id="senhaSala"
          name="senha"
          placeholder="Senha..."
          type="password"
          required
          className="block w-80 rounded-md border text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 p-2  border-black"
        />
        <button
          type="submit"
          className="w-28 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-devland hover:bg-devland-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {loading ? <Loading /> : "Entrar"}
        </button>
        {error && (
          <div className="text-red-600 text-center pt-2">
            {error}
          </div>
        )}
      </div>
    </form>
  );
}

export default VerificarSenhaSala;