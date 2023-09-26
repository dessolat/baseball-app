import { useState, useEffect, useRef } from 'react';
import {
  setCurrentGameId,
  setErrorMsg,
  setFullData,
  setIsBroadcast,
  setIsVideo,
  setPlayersInfo,
	setVideoLengthMode
} from 'redux/gameReducer';
import { shallowEqual, useSelector } from 'react-redux';
import { axiosInstance, axiosCancelToken } from 'axios-instance';
import { useParams } from 'react-router-dom';
// import axios from 'axios';

const useGameFetch = url => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadedPercents, setLoadedPercents] = useState(null);
  const [error, setError] = useState(null);
  const innings = useSelector(state => state.game.innings, shallowEqual);

  const intervalRef = useRef();
  const dataRef = useRef(0);
  const cancelTokenRef = useRef();

  const { gameId } = useParams();

  useEffect(
    () => () => {
      typeof cancelTokenRef.current != 'undefined' && cancelTokenRef.current.cancel(null);
      clearTimeout(intervalRef.current);
    },
    []
  );

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
      cancelTokenRef.current = axiosCancelToken.source();

      try {
        firstTime && setIsLoading(true);
        const resp = await axiosInstance.get(innerUrl, {
        // const resp = await axios.get('http://localhost:3001', {
          cancelToken: cancelTokenRef.current.token,
          onDownloadProgress: ({ total, loaded }) => setLoadedPercents((loaded * 100) / total)
        });
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
          const { guests, owners, has_measures, camera_info } = resp.data.preview;

          let newPlayersInfo = {};
          newPlayersInfo = concatPlayersInfo(guests.players, newPlayersInfo);
          newPlayersInfo = concatPlayersInfo(owners.players, newPlayersInfo);

          dispatch(setPlayersInfo(newPlayersInfo));

          const isVideoGame = (has_measures && camera_info?.left_main_link) || camera_info?.broadcast_link;
          dispatch(setIsVideo(isVideoGame));

          const isBroadcastGame = camera_info?.broadcast_link && !camera_info?.left_main_link;
          dispatch(setIsBroadcast(isBroadcastGame));
					if (isBroadcastGame) dispatch(setVideoLengthMode('Broadcast'))
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
          setLoadedPercents(null);
          dispatch(setCurrentGameId(gameId));
        }
      }
    };

  return [error, isLoading, loadedPercents, getFullData];
};

export default useGameFetch;
