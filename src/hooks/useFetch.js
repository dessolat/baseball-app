import { useState, useRef, useEffect } from 'react';
import { axiosInstance, axiosCancelToken } from 'axios-instance';

const useFetch = url => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const cancelTokenRef = useRef();

  useEffect(
    () => () => {
      cancelTokenRef.current?.cancel(null);
    },
    []
  );

  async function fetchData() {
    cancelTokenRef.current = axiosCancelToken.source();

    try {
      setIsLoading(true);
      const response = await axiosInstance.get(url, {
        cancelToken: cancelTokenRef.current.token,
        timeout: 10000
      });
      setError('');

      return response;
    } catch (err) {
      setError(err.message);
      return err;
    } finally {
      setIsLoading(false);
    }
  }

  return { fetchData, isLoading, error };
};

export default useFetch;
