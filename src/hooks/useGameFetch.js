import { useState, useEffect, useRef } from 'react';
import { setFullData } from 'redux/gameReducer'
import { useSelector } from 'react-redux';
import axios from 'axios'

const useGameFetch = url => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
	const innings = useSelector(state => state.game.innings);
  const intervalRef = useRef();
  const dataRef = useRef({});

	useEffect(() => {
    error && setError(null);
		// eslint-disable-next-line
  }, [innings]);

  const getFullData =
    (firstTime = false) =>
    async dispatch => {
      try {
        firstTime && setIsLoading(true);
        const resp = await axios.get(url);
        if (JSON.stringify(dataRef.current) === JSON.stringify(resp.data)) return;
        dataRef.current = resp.data;
        dispatch(setFullData(resp.data));
      } catch (err) {
        setError(err.message);
      } finally {
        if (firstTime) {
          setIsLoading(false);
          intervalRef.current = setInterval(() => {dispatch(getFullData())}, 4000);
        }
      }
    };

  return [error, isLoading, intervalRef, getFullData];
};

export default useGameFetch;
