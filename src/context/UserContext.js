import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../api/axios';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [entidadeId, setEntidadeId] = useState(null);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });



  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const logout = async () => {
    try {
      // Chamada ao backend para invalidar o token
      await axios.post('/logout');
    } catch (error) {
      console.error('Erro ao realizar logout no servidor:', error);
    } finally {
      // Realiza o logout localmente
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      delete axios.defaults.headers.common['Authorization'];
    }
  };
  

  return (
    <UserContext.Provider value={{ user, setUser, entidadeId, setEntidadeId,logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}