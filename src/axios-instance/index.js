import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://baseball-gametrack.ru/api'
});

export const axiosCancelToken = axios.CancelToken