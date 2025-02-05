import React, { createContext, useState, useContext, ReactNode } from 'react';

// Définition des types des données utilisateur avec les champs supplémentaires
interface Bus {
  from?: string;
  to?: string;
  dateStart?: string;
  dateEnd?: string;
  adult?: string;
  child?: string;
  bike?: String;
}

// Crée le contexte pour l'utilisateur avec le type Bus
interface BusContextType {
  Bus: Bus;
  updateBus: (newBusData: Partial<Bus>) => void;
}
const BusContext = createContext<BusContextType | undefined>(undefined);

const useBus = (): BusContextType => {
  const context = useContext(BusContext);
  if (!context) {
    throw new Error('address must be used within a BusProvider');
  }
  return context;
};

interface BusProviderProps {
  children: ReactNode;
}

export const BusProvider: React.FC<BusProviderProps> = ({ children }) => {
  const [Bus, setBus] = useState<Bus>({});

  const updateBus = (newBusData: Partial<Bus>) => {
    setBus((prevBus) => ({ ...prevBus, ...newBusData }));
  };

  return (
    <BusContext.Provider value={{ Bus, updateBus }}>
      {children}
    </BusContext.Provider>
  );
};
export default useBus;
