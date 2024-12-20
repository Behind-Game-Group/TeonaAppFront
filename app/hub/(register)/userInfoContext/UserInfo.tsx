import React, { createContext, useState, useContext, ReactNode } from 'react';

// Définition des types des données utilisateur avec les champs supplémentaires
interface User {
  firstName?: string;
  lastName?: string;
  gender?: string;
  email?: string;
  phoneNumber?: string;
  teonaPassenger?: boolean;
  teonaGroup?: boolean;
  country?: string;
  dateOfBirth?: string;
  language?: string;
  password?: string;
}

// Crée le contexte pour l'utilisateur avec le type User
interface UserContextType {
  user: User;
  updateUser: (newUserData: Partial<User>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({});

  const updateUser = (newUserData: Partial<User>) => {
    setUser((prevUser) => ({ ...prevUser, ...newUserData })); // Met à jour les données utilisateur
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;
