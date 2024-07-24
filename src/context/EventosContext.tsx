'use client'
import React, { createContext, useState, ReactNode, useContext } from 'react';

interface EventosContextType {
  eventos: string[];
  setEventos: React.Dispatch<React.SetStateAction<string[]>>;
}

export const EventosContext = createContext<EventosContextType | undefined>(undefined);

interface EventosProviderProps {
  children: ReactNode;
}

export const EventosProvider: React.FC<EventosProviderProps> = ({ children }) => {
  const [eventos, setEventos] = useState<string[]>([]);

  return (
    <EventosContext.Provider value={{ eventos, setEventos }}>
      {children}
    </EventosContext.Provider>
  );
};

export const useEventosContext = () : EventosContextType => {
  const context = useContext(EventosContext);
  return context!
}