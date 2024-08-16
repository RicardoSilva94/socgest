import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', 
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Adicione um interceptor para incluir o token em todas as requisições
instance.interceptors.request.use(
  (config) => {
    // Apenas adicione o token se necessário
    const token = localStorage.getItem('token');
    if (token && config.url !== '/forgot-password') {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;