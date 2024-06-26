'use client';
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

import Loading from "./Loading";

export default function FormLogin() {

  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  async function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data = {
      login: formData.get('login'),
      senha: formData.get('senha')
    }

    signIn('credentials', {
      ...data,
      callbackUrl: '/home',
    })
  }

  return (
    <form className="mt-8 space-y-6" onSubmit={login}>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-900">
          Username
        </label>
        <input
          id="email"
          name="login"
          type="text"
          autoComplete="email"
          required
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"

        />
      </div>

      <div className="mt-4">
        <div className="flex justify-between">
          <label htmlFor="senha" className="block text-sm font-medium text-gray-900">
            Senha
          </label>
          <Link href="#" className="text-sm font-semibold text-devland hover:text-devland-200">
            Esqueceu a senha?
          </Link>
        </div>
        <input
          id="senha"
          name="senha"
          type="password"
          autoComplete="current-password"
          required
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
        />
      </div>

      <div className="mt-6">
        <button
          onClick={() => setLoading(true)}
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-devland hover:bg-devland-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {loading ? <Loading /> : "Entrar"}
        </button>
        {error === 'CredentialsSignin' && <div className="text-red-600 text-center pt-2">Credenciais inválidas. Por favor, verifique seu username e senha e tente novamente.
        </div>}

      </div>
    </form>
  )
}
