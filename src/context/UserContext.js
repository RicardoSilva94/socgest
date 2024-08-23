import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../api/axios';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [entidadeId, setEntidadeId] = useState(null);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    console.log('Usuário salvo no localStorage:', savedUser);
    
    return savedUser ? JSON.parse(savedUser) : null;
  });



  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  console.log('UserProvider user state:', user);

  return (
    <UserContext.Provider value={{ user, setUser, entidadeId, setEntidadeId,logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}