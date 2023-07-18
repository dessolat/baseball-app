import React, { useState, useEffect, useRef } from 'react';
import ErrorLoader from 'components/UI/loaders/ErrorLoader/ErrorLoader';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { axiosInstance, axiosCancelToken } from 'axios-instance';
import Header from 'components/Stats/Header/Header';
import Content from 'components/Stats/Content/Content';
import { setStatsData } from 'redux/statsReducer';
import Loader from 'components/UI/loaders/Loader/Loader';
import { setTableType } from 'redux/playerStatsReducer';
import StatsLoadingProvider from 'context/StatsLoadingContext';

const Stats = () => {
  const [isStatsLoading, setIsStatsLoading] = useState(true);
  const [error, setError] = useState('');
  const [loadedPercents, setLoadedPercents] = useState(null);

  const firstMountRef = useRef(true);
  const cancelStatsTokenRef = useRef();

  const statsTableMode = useSelector(state => state.stats.tableMode);
  const currentYear = useSelector(state => state.shared.currentYear);

  const dispatch = useDispatch();

  useEffect(() => () => cancelStatsTokenRef.current.cancel(null), []);

  useEffect(() => {
    if (firstMountRef.current === true) return;

    dispatch(setTableType(statsTableMode === 'Pitching' ? 'Pitching' : 'Batting'));
    // eslint-disable-next-line
  }, [statsTableMode]);

  useEffect(() => {
    const refactorData = leaguesByYears => {
      return Object.entries(leaguesByYears).reduce(
        (sumByYear, [curYear, leagues]) => {
          const modifiedLeagues = Array.isArray(leagues) ? leagues : [];

          sumByYear[curYear] = modifiedLeagues.reduce((sum, { id, title, type, players, teams }) => {
            const leaguePlayersFielding = players.fielding.reduce((sum, player, index) => {
              sum.push({ ...player, ...players.running[index] });
              return sum;
            }, []);

            const leagueTeamsFielding = teams.fielding.reduce((sum, player, index) => {
              sum.push({ ...player, ...teams.running[index] });
              return sum;
            }, []);

            const resultLeague = {
              id,
              title,
              type,
              players: {
                batting: players.batting,
                pitching: players.pitching,
                'fielding / running': leaguePlayersFielding
              },
              teams: {
                batting: teams.batting,
                pitching: teams.pitching,
                'fielding / running': leagueTeamsFielding
              }
            };

            sum.push(resultLeague);

            return sum;
          }, []);

          return sumByYear;
        },

        {}
      );
    };

    const fetchStats = async () => {
      cancelStatsTokenRef.current = axiosCancelToken.source();

      try {
        setIsStatsLoading(true);
        const response = await axiosInstance.get(`/stats`, {
          cancelToken: cancelStatsTokenRef.current.token,
          // timeout: 10000,
          onDownloadProgress: ({ total, loaded }) => setLoadedPercents((loaded * 100) / total)
        });

        setError('');
        dispatch(setStatsData(refactorData(response.data)));
      } catch (err) {
        if (err.message === null) return;
        console.log(err.message);
        setError(err.message);
      } finally {
        setIsStatsLoading(false);
        setLoadedPercents(null);
      }
    };
    fetchStats();

    if (firstMountRef.current === true) {
      firstMountRef.current = false;
      return;
    }

    // eslint-disable-next-line
  }, []);
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

  const contentLoaderStyles = {
    margin: 'unset',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)'
  };

  // Error handling
  if (error !== '') return <ErrorLoader error={error} />;

  // Loader
  if (isStatsLoading)
    return (
      <>
        {/* <StatsLoadingProvider value={isStatsLoading}>
          <Header />
        </StatsLoadingProvider> */}
        <Loader styles={contentLoaderStyles} loadedPercents={loadedPercents} />
      </>
    );

  // Content
  return (
    <>
      <StatsLoadingProvider value={isStatsLoading}>
        <Header />
      </StatsLoadingProvider>
      <Content />
    </>
  );
};

export default Stats;
