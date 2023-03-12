import { useState, useEffect, useRef } from 'react';
import { setCurrentGameId, setErrorMsg, setFullData, setIsVideo, setPlayersInfo } from 'redux/gameReducer';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const useGameFetch = url => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const innings = useSelector(state => state.game.innings);
  const intervalRef = useRef();
  const dataRef = useRef(0);
  const cancelTokenRef = useRef();

  const { gameId } = useParams();

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
        dispatch(setErrorMsg(null));
        error && setError(null);
        const dataLength = JSON.stringify(resp.data).length;

        intervalRef.current = setTimeout(() => {
          dispatch(getFullData(false, innerUrl));
        }, 5000);

        if (dataRef.current === dataLength) return;
        dataRef.current = dataLength;

        if (firstTime) {
          //Concat players info from fetched data
          let newPlayersInfo = {};
          newPlayersInfo = concatPlayersInfo(resp.data.preview.guests.players, newPlayersInfo);
          newPlayersInfo = concatPlayersInfo(resp.data.preview.owners.players, newPlayersInfo);

          dispatch(setPlayersInfo(newPlayersInfo));
          dispatch(
            setIsVideo(
              resp.data.preview.has_measures
              // resp.data.innings[0]['top/guests'][0].moments[0].video !== null || gameId === '958' || gameId === '1258' ? true : false
            )
          );
        }

        dispatch(setFullData(resp.data));
      } catch (err) {
        setError(err.message);
        !err.__CANCEL__ && dispatch(setErrorMsg(err.message));
        console.log(err.__CANCEL__);
        if (!err.__CANCEL__) {
          intervalRef.current = setTimeout(() => {
            dispatch(getFullData(false, innerUrl));
          }, 5000);
        }
      } finally {
        if (firstTime) {
          setIsLoading(false);
          dispatch(setCurrentGameId(gameId));
        }
      }
    };

  return [error, isLoading, cancelTokenRef, intervalRef, getFullData];
};

export default useGameFetch;
