import Image from "next/image";
import Link from "next/link";

export default function FormCadastro() {
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-sm bg-white p-6 shadow-md rounded-lg mt-16 mb-16">
      <div className="avatar flex flex-col gap-2 items-center  justify-center">
        <div className="w-24 rounded-full">
          <Image src="/img/logo-circ_black_05x.png" width={150} height={150} alt="Logo da Devland" />
        </div>
        {/* <input type="file" className="file-input file-input-xs" /> */}
      </div>

      <h3 className="mt-2 text-xl text-center font-bold text-gray-900">
        Realize seu cadastro
      </h3>
      <form className="mt-2 space-y-6" action="#" method="POST">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-900">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="name"
            required
            minLength={3}
            maxLength={10}
            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-devland-200 sm:text-sm sm:leading-6"
            placeholder="SeuNomeDeUsuario"
          />
        </div>

        <div className="mt-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-900">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-devland-200 sm:text-sm sm:leading-6"
            placeholder="email@exemplo.com"
          />
        </div>

        <div className="mt-4">
          <div className="flex justify-between">
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
              Senha
            </label>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-devland-200 sm:text-sm sm:leading-6"
            placeholder="Digite sua senha"
          />
        </div>

        <div className="mt-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900">
            Confirmar Senha
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-devland-200 sm:text-sm sm:leading-6"
            placeholder="Confirme sua senha"
          />
        </div>

        <div className="mt-4">
          <label htmlFor="avatar" className="block text-sm font-medium text-gray-900">
            Imagem URL
          </label>
          <input
            id="avatar"
            name="avatar"
            type="text"
            // required
            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-devland-200 sm:text-sm sm:leading-6"
            placeholder="https://minhafoto.jpg"
          />
        </div>

        <div className="mt-4">
          <label htmlFor="dataNasc" className="block text-sm font-medium text-gray-900">
            Data de Nascimento
          </label>
          <input
            id="dataNasc"
            name="dataNasc"
            type="date"
            required
            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-devland-200 sm:text-sm sm:leading-6"

          />
        </div>


        <div className="mt-6">
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-devland hover:bg-devland-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cadastrar
          </button>
        </div>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Já possui cadastro?{' '}
        <Link href="/" className="font-medium text-devland hover:text-devland-200">
          Faça login
        </Link>
      </p>
    </div>
  )
}
