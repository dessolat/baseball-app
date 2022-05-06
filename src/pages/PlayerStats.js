import React, { useState, useEffect, useRef } from 'react';
import ErrorLoader from 'components/UI/loaders/ErrorLoader/ErrorLoader';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentLeague } from 'redux/sharedReducer';
import { setPlayerStatsData } from 'redux/playerStatsReducer';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from 'components/PlayerStats/Header/Header';
import Content from 'components/PlayerStats/Content/Content';
import Loader from 'components/UI/loaders/Loader/Loader';

const PlayerStats = () => {
  // eslint-disable-next-line
  const [isStatsLoading, setIsStatsLoading] = useState(false);
  const [error, setError] = useState('');
  const currentYear = useSelector(state => state.shared.currentYear);
  const [playerYears, setPlayerYears] = useState(currentYear);

  const cancelTokenRef = useRef();
  // const firstMountRef = useRef(true);

  const { playerId } = useParams();

  const playerStatsData = useSelector(state => state.playerStats.playerStatsData);
  // const games = useSelector(state => state.games.games);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchStats = async () => {
      cancelTokenRef.current = axios.CancelToken.source();

      try {
        setIsStatsLoading(true);
        const response = await axios.get(
          `http://51.250.71.224:3030/player?id=${playerId}`,
          {
            cancelToken: cancelTokenRef.current.token,
            timeout: 5000
          }
        );
        console.log(response.data);
        setError('');
        dispatch(setPlayerStatsData(response.data));
      } catch (err) {
        if (err.message === null) return;
        console.log(err.message);
        setError(err.message);
      } finally {
        setIsStatsLoading(false);
      }
    };
    fetchStats();

    dispatch(setCurrentLeague({ id: -1, name: 'All' }));

    return () => {
      cancelTokenRef.current.cancel(null);
    };
    // eslint-disable-next-line
  }, [playerId]);
  // useEffect(() => {
  //   const fetchGamesData = async () => {
  //     cancelTokenRef.current = axios.CancelToken.source();

  //     try {
  //       setIsLoading(true);
  //       const response = await axios.get(`http://51.250.71.224:3030/main/year-${currentYear}`, {
  //         cancelToken: cancelTokenRef.current.token,
  //         timeout: 5000
  //       });
  //       console.log(response.data);
  //       setError('');
  //       dispatch(setGamesAndLeagues(response.data));

  //       if (games === null) {
  //         console.log('dispatched after fetching');
  //         dispatch(setCurrentLeague({ id: -1, name: 'All' }));
  //       }
  //     } catch (err) {
  //       if (err.message === null) return;
  //       console.log(err.message);
  //       setError(err.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchGamesData();

  //   if (firstMountRef.current === true) {
  //     firstMountRef.current = false;
  //     return;
  //   }

  //   dispatch(setCurrentLeague({ id: -1, name: 'All' }));

  //   return () => {
  //     cancelTokenRef.current.cancel(null);
  //   };
  // 	// eslint-disable-next-line
  // }, [currentYear]);

  return (
    <>
      {error !== '' ? (
        <ErrorLoader error={error} />
      ) : isStatsLoading ? (
        <Loader />
      ) : Object.keys(playerStatsData).length === 0 ? (
        <></>
      ) : (
        <>
          <Header playerYears={playerYears} setPlayerYears={setPlayerYears} />
          <Content playerYears={playerYears} />
        </>
      )}
    </>
  );
};

export default PlayerStats;
