import React, { createContext, useState, useContext, ReactNode } from 'react';

// Définition des types des données utilisateur avec les champs supplémentaires
interface Wallet {
  firstName?: string;
  lastName?: string;
  streetName?: string;
  Optional?: string;
  postalCode?: string;
  city?: string;
  phoneNumber?: String;
  countryCode?: string;
  country?: string;
  image?: string;
  idA?: string;
}

// Crée le contexte pour l'utilisateur avec le type Wallet
interface WalletContextType {
  Wallet: Wallet;
  updateWallet: (newWalletData: Partial<Wallet>) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('address must be used within a WalletProvider');
  }
  return context;
};

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [Wallet, setWallet] = useState<Wallet>({});

  const updateWallet = (newWalletData: Partial<Wallet>) => {
    setWallet((prevWallet) => ({ ...prevWallet, ...newWalletData })); // Met à jour les données utilisateur
  };

  return (
    <WalletContext.Provider value={{ Wallet, updateWallet }}>
      {children}
    </WalletContext.Provider>
  );
};
