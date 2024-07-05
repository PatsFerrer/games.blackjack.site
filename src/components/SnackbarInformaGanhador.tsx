'use client';

import React, { useState } from 'react';
import SnackbarInformaGanhador from './SnackbarGanhador'; 

const App: React.FC = () => {
  const [showSnackbar, setShowSnackbar] = useState(true);

  const handleShowSnackbar = () => {
    setShowSnackbar(true);
    setTimeout(() => {
      setShowSnackbar(false);
    }, 5000); 
  };

  return (
    <div className="App">
      {/* <button onClick={handleShowSnackbar} className="btn">
        Mostrar Ganhador
      </button> */}
      
    </div>
  );
};

export default SnackbarInformaGanhador; 
