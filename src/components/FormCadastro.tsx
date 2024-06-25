'use client';
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function FormCadastro() {

  const [formData, setFormData] = useState({
    login: "",
    senha: "",
    email: "",
    data_nascimento: "",
    avatar: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:7071/api/auth/cadastro', {
        method: 'POST',
        mode: 'no-cors',  // retirar depois
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });      

      if (response.ok) {
        console.log('Cadastro realizado com sucesso!');
      } else {
        console.log('Erro ao realizar o cadastro.');
      }
    } catch (error) {
      console.error('Erro ao conectar com o servidor', error);
    }
  }


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

      <form className="mt-2 space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="login" className="block text-sm font-medium text-gray-900">
            Username
          </label>
          <input
            id="login"
            name="login"
            type="text"
            // autoComplete="name"
            required
            minLength={3}
            maxLength={30}
            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-devland-200 sm:text-sm sm:leading-6"
            placeholder="SeuNomeDeUsuario"
            value={formData.login}
            onChange={handleChange}
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
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="mt-4">
          <div className="flex justify-between">
            <label htmlFor="senha" className="block text-sm font-medium text-gray-900">
              Senha
            </label>
          </div>
          <input
            id="senha"
            name="senha"
            type="password"
            // autoComplete="current-password"
            required
            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-devland-200 sm:text-sm sm:leading-6"
            placeholder="Digite sua senha"
            value={formData.senha}
            onChange={handleChange}
          />
        </div>

        <div className="mt-4">
          <label htmlFor="confirmSenha" className="block text-sm font-medium text-gray-900">
            Confirmar Senha
          </label>
          <input
            id="confirmSenha"
            name="confirmSenha"
            type="password"
            // autoComplete="new-password"
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
            required
            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-devland-200 sm:text-sm sm:leading-6"
            placeholder="https://minhafoto.jpg"
            value={formData.avatar}
            onChange={handleChange}
          />
        </div>

        <div className="mt-4">
          <label htmlFor="data_nascimento" className="block text-sm font-medium text-gray-900">
            Data de Nascimento
          </label>
          <input
            id="data_nascimento"
            name="data_nascimento"
            type="date"
            required
            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-devland-200 sm:text-sm sm:leading-6"
            value={formData.data_nascimento}
            onChange={handleChange}
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
          Faça Login
        </Link>
      </p>
    </div>
  )
}
