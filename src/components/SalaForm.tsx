// src/components/SalaForm.tsx
"use client";
import { useState } from "react";

export default function SalaForm({ onCreate, closeModal }) {
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const novaSala = {
      nome: nome,
      senha: senha,
    };

    try {
      const req = await fetch("https://66718da9e083e62ee43c1800.mockapi.io/salas-disponiveis/salas", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novaSala),
      });

      if (req.ok) {
        onCreate(await req.json());
        setNome("");
        setSenha("");
        closeModal();
      } else {
        console.error('Erro ao criar sala:', req.status, req.statusText);
        closeModal();
      }
    } catch (error) {
      console.log('Erro ao criar sala:', error);
      closeModal();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="font-bold text-lg mb-5 text-center">Criar Sala</h3>
      <label className="input input-bordered flex items-center gap-2 mb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-4 h-4 opacity-70"
        >
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
        </svg>
        <input type="text" className="grow" placeholder="Nome da sala"
          value={nome}
          onChange={(e) => setNome(e.target.value)} required />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-4 h-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5.5.5.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
            clipRule="evenodd"
          />
        </svg>
        <input type="text" className="grow" placeholder="Senha" value={senha}
          onChange={(e) => setSenha(e.target.value)} required />
      </label>
      <button type="submit" className="btn btn-success mt-5">Criar</button>
    </form>
  );
}
