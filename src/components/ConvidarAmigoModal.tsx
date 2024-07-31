"use client"
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaCopy } from "react-icons/fa6";

interface ConvidarAmigoModalProps {
  onClose: () => void;
}

const ConvidarAmigoModal: React.FC<ConvidarAmigoModalProps> = ({ onClose }) => {
  const [link, setLink] = useState<string>('');
  const { salaId } = useParams<{ salaId: string }>()
  useEffect(() => {
    const mesaLink = `${window.location.origin}/mesa/${salaId}`;
    setLink(mesaLink);
  }, [])



  const handleCopyLink = () => {
    navigator.clipboard.writeText(link).then(() => {
      alert('Link copiado para a área de transferência!');
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-[350px]">
        <h2 className="text-xl text-center mb-4">Convidar Amigo</h2>


        <>
          <input
            type="text"
            value={link}
            readOnly
            className="border p-2 mb-4 w-full mt-4"
          />
          <div className='flex justify-between items-end'>
            <button
              onClick={handleCopyLink}
              className="bg-blue-600 text-white px-4 py-2 rounded mr-2 hover:bg-blue-700 transition-all duration-300 flex gap-2 items-center"
            >
              Copiar Link <FaCopy />
            </button>
            <button
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 mt-4"
            >
              Fechar
            </button>
          </div>
        </>


      </div>
    </div>
  );
};

export default ConvidarAmigoModal;