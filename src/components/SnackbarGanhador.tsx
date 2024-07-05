import React from 'react';

interface SnackbarGanhadorProps {
    message: string;
    show: boolean;
    onClose: () => void;
    
  }
  
  const SnackbarGanhador: React.FC<SnackbarGanhadorProps> = ({ message, show, onClose }) => {
    return (
        <div
        className={`fixed top-1/2  px-4 py-2 animate-bounce bg-gray-800 text-white rounded-lg shadow-md transition-all duration-300 ${
          show ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        
      >
        {message}
        <button className="ml-4 text-sm" onClick={onClose}>Fechar</button>
      </div>
    );
  };
  
  export default SnackbarGanhador;