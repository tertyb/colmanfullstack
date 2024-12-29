
import { createContext, useCallback, useContext, useState } from 'react';
import { IUser } from '../interfaces/user'
import { removeAuthTokens } from '../utils/functions/localstorage';
import { logout } from '../services/userService';

interface ProfileContextProps {
  userProfile: string | undefined;
  setProfileData: (user: string) => void;

}

const ProfileContext = createContext<ProfileContextProps | null>(null);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userProfile, setProfile] = useState<string | undefined>();

  const setProfileData = useCallback((user: string) => {
    setProfile(user);
  }, [setProfile])

  return (
    <ProfileContext.Provider value={{ userProfile, setProfileData }}>
      {children}
    </ProfileContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};