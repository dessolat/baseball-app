import React, { useState, useEffect, useRef } from 'react';
import ErrorLoader from 'components/UI/loaders/ErrorLoader/ErrorLoader';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentLeague } from 'redux/gamesReducer';
import { setPlayerStatsData, setPlayerCurrentTeam as setCurrentTeam } from 'redux/playerStatsReducer';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from 'components/PlayerStats/Header/Header';
import Content from 'components/PlayerStats/Content/Content';
import Loader from 'components/UI/loaders/Loader/Loader';
import { setTableMode } from 'redux/statsReducer';
import { PlayerYearsContext } from 'context';

const PlayerStats = () => {
  // eslint-disable-next-line
  const [isStatsLoading, setIsStatsLoading] = useState(false);
  const [error, setError] = useState('');
  const currentYear = useSelector(state => state.shared.currentYear);
  const [playerYears, setPlayerYears] = useState(currentYear);
  const currentLeague = useSelector(state => state.games.currentLeague);
  const { tableType: playerTableMode, playerStatsData } = useSelector(state => state.playerStats);

  const cancelTokenRef = useRef();
  const firstMountRef = useRef(true);

  const { playerId } = useParams();

  // const playerStatsData = useSelector(state => state.playerStats.playerStatsData);
  // const games = useSelector(state => state.games.games);
  const dispatch = useDispatch();

  useEffect(
    () => () => {
      dispatch(setPlayerStatsData({}));
      dispatch(setCurrentTeam(null));
      cancelTokenRef.current.cancel(null);
    },
    // eslint-disable-next-line
    []
  );

  useEffect(() => {
    if (firstMountRef.current === true) return;

    dispatch(setTableMode(playerTableMode));
    // eslint-disable-next-line
  }, [playerTableMode]);

  useEffect(() => {
    const isLeague = leagues => leagues.find(league => league.id === currentLeague.id);

    const fetchStats = async () => {
      cancelTokenRef.current = axios.CancelToken.source();

      try {
        setIsStatsLoading(true);
        const response = await axios.get(`http://baseball-gametrack.ru/api/player?id=${playerId}`, {
          cancelToken: cancelTokenRef.current.token,
          timeout: 10000
        });
        setError('');
        console.log(response.data);
        !isLeague(response.data.leagues) && dispatch(setCurrentLeague({ id: -1, name: 'All', title: 'All' }));

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

    if (firstMountRef.current === true) {
      firstMountRef.current = false;
      return;
    }

    dispatch(setCurrentLeague({ id: -1, name: 'All', title: 'All' }));

    // eslint-disable-next-line
  }, [playerId]);
  // useEffect(() => {
  //   const fetchGamesData = async () => {
  //     cancelTokenRef.current = axios.CancelToken.source();

  //     try {
  //       setIsLoading(true);
  //       const response = await axios.get(`http://baseball-gametrack.ru/api/main/year-${currentYear}`, {
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

  function calculateTeamsArray(tableMode) {
    const selectedLeague = playerStatsData.leagues.find(league => league.id === currentLeague.id);

    return playerYears === 'All years'
      ? Array.from(
          playerStatsData.leagues
            .filter(league => league.teams.find(team => team[tableMode.toLowerCase()]))
            .reduce((sum, league) => {
              league.teams.forEach(team => sum.add(team.name));
              return sum;
            }, new Set())
        )
      : currentLeague.id === -1
      ? Array.from(
          playerStatsData.leagues
            .filter(
              league =>
                league.year === playerYears && league.teams.find(team => team[tableMode.toLowerCase()])
            )
            .reduce((sum, league) => {
              league.teams.forEach(team => sum.add(team.name));
              return sum;
            }, new Set())
        )
      : selectedLeague?.teams
      ? selectedLeague.teams.length > 1
        ? selectedLeague.teams.reduce((sum, team) => {
            sum.push(team.name);
            return sum;
          }, [])
        : [selectedLeague.teams[0].name]
      : [];
  }

  return (
    <>
      {error !== '' ? (
        <ErrorLoader error={error} />
      ) : isStatsLoading ? (
        <Loader />
      ) : Object.keys(playerStatsData).length === 0 ? (
        <></>
      ) : (
        <PlayerYearsContext.Provider value={{ playerYears, setPlayerYears, calculateTeamsArray }}>
          <Header />
          <Content />
        </PlayerYearsContext.Provider>
      )}
    </>
  );
};

export default PlayerStats;
