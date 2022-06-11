import { useState, useEffect, useRef } from 'react';
import { setErrorMsg, setFullData, setIsVideo, setPlayersInfo } from 'redux/gameReducer';
import { useSelector } from 'react-redux';
import axios from 'axios';

const useGameFetch = url => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const innings = useSelector(state => state.game.innings);
  const intervalRef = useRef();
  const dataRef = useRef(0);
  const cancelTokenRef = useRef();

  useEffect(() => {
    error && setError(null);
    // eslint-disable-next-line
  }, [innings]);

  const concatPlayersInfo = (players, summary) => {
    return players
      .filter(player => player.photo !== '')
      .reduce((sum, player) => {
        sum[player.id] = player.photo;
        return sum;
      }, summary);
  };

  const getFullData =
    (firstTime = false, innerUrl = url) =>
    async dispatch => {
      cancelTokenRef.current = axios.CancelToken.source();

      try {
        firstTime && setIsLoading(true);
        const resp = await axios.get(innerUrl, { cancelToken: cancelTokenRef.current.token });
        // if (JSON.stringify(dataRef.current) === JSON.stringify(resp.data)) return;
				dispatch(setErrorMsg(null))
        error && setError(null);
        const dataLength = JSON.stringify(resp.data).length;
        if (dataRef.current === dataLength) return;
        // dataRef.current = resp.data;
        dataRef.current = dataLength;

        if (firstTime) {
          //Concat players info from fetched data
          let newPlayersInfo = {};
          newPlayersInfo = concatPlayersInfo(resp.data.preview.guests.players, newPlayersInfo);
          newPlayersInfo = concatPlayersInfo(resp.data.preview.owners.players, newPlayersInfo);

          dispatch(setPlayersInfo(newPlayersInfo));
          dispatch(
            setIsVideo(resp.data.innings[0]['top/guests'][0].moments[0].video !== null ? true : false)
          );
        }

        dispatch(setFullData(resp.data));
      } catch (err) {
        setError(err.message);
				dispatch(setErrorMsg(err.message))
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
