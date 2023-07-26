import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://baseball-gametrack.ru/api'
});

export const axiosCancelToken = axios.CancelToken