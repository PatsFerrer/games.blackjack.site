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
        className="btn mt-5 bg-devland hover:bg-devland-200 text-white"
        onClick={handleSubmit}
      >
        Criar
      </button>
    </form>
  );
}

export default SalaForm;
