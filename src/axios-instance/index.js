import axios from 'axios';
import { getDomen } from 'utils';

export const axiosInstance = axios.create({
  baseURL: getDomen()
});

export const axiosCancelToken = axios.CancelToken