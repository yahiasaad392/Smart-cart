"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UserContextType {
  userToken: string | null;
  setUserToken: (token: string | null) => void;
  userName: string | null;
  setUserName: (name: string | null) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('userToken');
      const name = localStorage.getItem('userName');
      if (token) {
        setUserToken(token);
      }
      if (name) {
        setUserName(name);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (userToken) {
        localStorage.setItem('userToken', userToken);
      } else {
        localStorage.removeItem('userToken');
      }
    }
  }, [userToken]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (userName) {
        localStorage.setItem('userName', userName);
      } else {
        localStorage.removeItem('userName');
      }
    }
  }, [userName]);

  const logout = () => {
    setUserToken(null);
    setUserName(null);
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    window.location.href = '/login';
  };

  return (
    <UserContext.Provider value={{ userToken, setUserToken, userName, setUserName, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
