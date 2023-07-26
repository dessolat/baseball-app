import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentLeague } from 'redux/gamesReducer';
import { setPlayerStatsData, setPlayerCurrentTeam as setCurrentTeam } from 'redux/playerStatsReducer';
import { setTableMode } from 'redux/statsReducer';
import { useParams } from 'react-router-dom';
import Header from 'components/PlayerStats/Header/Header';
import Content from 'components/PlayerStats/Content/Content';
import ErrorLoader from 'components/UI/loaders/ErrorLoader/ErrorLoader';
import Loader from 'components/UI/loaders/Loader/Loader';
import { PlayerYearsContext } from 'context';
import useFetch from 'hooks/useFetch';

const PlayerStats = () => {
  const { playerId } = useParams();

  const currentYear = useSelector(s => s.shared.currentYear);

  const [playerYears, setPlayerYears] = useState(currentYear);
  const [pitchesData, setPitchesData] = useState(null);
  const [battingData, setBattingData] = useState(null);

  const currentLeague = useSelector(s => s.games.currentLeague);
  const playerTableMode = useSelector(s => s.playerStats.tableType);
  const playerStatsData = useSelector(s => s.playerStats.playerStatsData);

  const dispatch = useDispatch();

  const firstMountRef = useRef(true);

  const {
    fetchData: fetchStats,
    isLoading: isStatsLoading,
    error: statsError
  } = useFetch(`/player?id=${playerId}`);

  const urlPlayerYears = playerYears !== 'All years' ? playerYears : -1;

  const { fetchData: fetchPitches } = useFetch(`/pitcher_metrix?id=${playerId}&year=${urlPlayerYears}`);
  const { fetchData: fetchBatting } = useFetch(`/batting_metrix?id=${playerId}&year=${urlPlayerYears}`);

  useEffect(
    () => () => {
      dispatch(setPlayerStatsData({}));
      dispatch(setCurrentTeam(null));
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

    (async () => {
      try {
        const response = await fetchStats();

        !isLeague(response.data.leagues) && dispatch(setCurrentLeague({ id: -1, name: 'All', title: 'All' }));
        dispatch(setPlayerStatsData(response.data));
      } catch ({ message }) {
        console.warn(message);
      }
    })();

    if (firstMountRef.current === true) {
      firstMountRef.current = false;
      return;
    }

    dispatch(setCurrentLeague({ id: -1, name: 'All', title: 'All' }));

    // eslint-disable-next-line
  }, [playerId]);

  useEffect(() => {
    (async () => {
      try {
        const pitchesResponse = await fetchPitches();
        const battingResponse = await fetchBatting();

        setPitchesData(pitchesResponse.data);
        setBattingData(battingResponse.data);
      } catch ({ message }) {
        console.warn(message);
      }
    })();

    // eslint-disable-next-line
  }, [playerYears]);

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

  // Fetch error handling
  if (statsError !== '') return <ErrorLoader error={statsError} />;

  // Stats loader
  if (isStatsLoading) return <Loader />;

  // Empty stats render
  if (Object.keys(playerStatsData).length === 0) return <></>;

  // Main render
  return (
    <PlayerYearsContext.Provider value={{ playerYears, setPlayerYears, calculateTeamsArray }}>
      <Header />
      <Content pitchesData={pitchesData} battingData={battingData} />
    </PlayerYearsContext.Provider>
  );
};

export default PlayerStats;
