
import { createContext, useCallback, useContext, useState } from 'react';
import {IUser} from '../interfaces/user'

interface UserContextProps {
    user: IUser | undefined;
    setUserData: (user: IUser) => void;
    logout: () => void;
  }

const UserContext = createContext<UserContextProps | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | undefined>();
  
  const setUserData = useCallback((user: IUser) => {
    setUser(user);
  },[setUser])

  const logout = useCallback(() => {
    localStorage.removeItem('accessToken');
    setUser(undefined);
  },[setUser]);

  return (
    <UserContext.Provider value={{ user, setUserData, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};