import { useState, useEffect, useRef } from 'react';
import { setFullData, setPlayersInfo } from 'redux/gameReducer';
import { useSelector } from 'react-redux';
import axios from 'axios';

const useGameFetch = url => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const innings = useSelector(state => state.game.innings);
  const intervalRef = useRef();
  const dataRef = useRef({});
  const cancelTokenRef = useRef();

  useEffect(() => {
    error && setError(null);
    // eslint-disable-next-line
  }, [innings]);

  const getFullData =
    (firstTime = false, innerUrl = url) =>
    async dispatch => {
      cancelTokenRef.current = axios.CancelToken.source();

      try {
        firstTime && setIsLoading(true);
        const resp = await axios.get(innerUrl, { cancelToken: cancelTokenRef.current.token });
        if (JSON.stringify(dataRef.current) === JSON.stringify(resp.data)) return;
        dataRef.current = resp.data;
        if (firstTime) {
          let newPlayersInfo = resp.data.preview.guests.players.reduce(
            (sum, player) => ({ ...sum, [player.name + ' ' + player.surname]: player.photo }),
            {}
          );
          newPlayersInfo = resp.data.preview.owners.players.reduce(
            (sum, player) => ({ ...sum, [player.name + ' ' + player.surname]: player.photo }),
            newPlayersInfo
          );
          dispatch(setPlayersInfo(newPlayersInfo));
        }

        dispatch(setFullData(resp.data));
      } catch (err) {
        setError(err.message);
      } finally {
        if (firstTime) {
          setIsLoading(false);
          intervalRef.current = setInterval(() => {
            dispatch(getFullData(false, innerUrl));
          }, 3000);
        }
      }
    };

  return [error, isLoading, cancelTokenRef, intervalRef, getFullData];
};

export default useGameFetch;
