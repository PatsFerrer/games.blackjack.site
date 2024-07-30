"use client";
import novaSala from "@/app/(auth)/mesa/_actions/novaSala";
import { FC, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface SalasProps {
  closeModal: any;
  onCreate: any;
}

const SalaForm: FC<SalasProps> = ({ closeModal, onCreate }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    closeModal();
  };

  return (
    <form action={novaSala}>
      <h3 className="font-bold text-lg mb-5 text-center">Criar Sala</h3>
      <div className="input input-bordered flex items-center gap-2 mb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-4 h-4 opacity-70"
        >
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
        </svg>
        <input 
          type="text" 
          className="grow" 
          placeholder="Nome da sala"
          id="nome"
          name="nome" 
          required 
        />
      </div>
      <div className="input input-bordered flex items-center gap-2 relative">
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
        <input 
          type={showPassword ? "text" : "password"} 
          className="grow" 
          placeholder="Senha" 
          id="senha"
          name="senha"  
          required 
        />
        <div
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </div>
      </div>
      <button 
        type="submit" 
        className="btn btn-success mt-5"
        onClick={handleSubmit}
      >
        Criar
      </button>
    </form>
  );
}

export default SalaForm;
