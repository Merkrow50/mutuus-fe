import axios from 'axios';
import {enviroment_auth_dev, enviroment_dev} from "./enviroments/Enviroments";
import * as SecureStore from "expo-secure-store";

const API_BASE_URL = 'http://api.example.com'; // Substitua com a URL da sua API de destino

const api = axios.create({
  baseURL: enviroment_dev.host,
  timeout: 5000, // Tempo limite para a requisição (opcional)
});

// Configuração dos cabeçalhos CORS
api.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
api.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';

// Função para lidar com erros de requisição
const handleRequestError = (error) => {
  console.error('Request error:', error);
  throw error; // Lança o erro para que possa ser tratado externamente
};

// Função genérica para fazer uma requisição GET
export const get = async (url, params = {}) => {
  try {
    const userToken = await SecureStore.getItemAsync('userToken');
    const {access_token} = JSON.parse(userToken);
    const response = await api.get(url, {params, headers: {"Authorization" : `Bearer ${access_token}`} });
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};

// Função genérica para fazer uma requisição POST
export const post = async (url, data = {}) => {
  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};

// Função genérica para fazer uma requisição PUT
export const put = async (url, data = {}) => {
  try {
    const response = await api.put(url, data);
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};

// Função genérica para fazer uma requisição DELETE
export const del = async (url) => {
  try {
    const response = await api.delete(url);
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};
