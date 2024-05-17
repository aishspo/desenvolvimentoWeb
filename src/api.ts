import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true, // Para permitir o envio de cookies de sessão
});

export default api;