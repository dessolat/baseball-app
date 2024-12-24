import React, { useState, useEffect, useRef } from 'react';
import ErrorLoader from 'components/UI/loaders/ErrorLoader/ErrorLoader';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { axiosInstance, axiosCancelToken } from 'axios-instance';
import Header from 'components/Stats/Header/Header';
import Content from 'components/Stats/Content/Content';
import { setCustomStatsData, setStatsData } from 'redux/statsReducer';
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
    const refactorCustomData = customData => {
      return customData.map(statsByType => {
        const playersFielding = statsByType.players.fielding.reduce((sum, player, index) => {
          sum.push({ ...player, ...statsByType.players.running[index] });
          return sum;
        }, []);
        const teamsFielding = statsByType.teams.fielding.reduce((sum, player, index) => {
          sum.push({ ...player, ...statsByType.teams.running[index] });
          return sum;
        }, []);

        return {
          ...statsByType,
          players: {
            batting: statsByType.players.batting,
            pitching: statsByType.players.pitching,
            'fielding / running': playersFielding
          },
          teams: {
            batting: statsByType.teams.batting,
            pitching: statsByType.teams.pitching,
            'fielding / running': teamsFielding
          }
        };
      });
    };

    const fetchCustomStats = async leaguesArr => {
      cancelStatsTokenRef.current = axiosCancelToken.source();

      try {
        const response = await axiosInstance.get(`/custom_leagues_stats?leagues=${leaguesArr.join(',')}`, {
          cancelToken: cancelStatsTokenRef.current.token,
          // timeout: 10000,
          onDownloadProgress: ({ total, loaded }) => setLoadedPercents((loaded * 100) / total)
        });

        setError('');

        return response;
      } catch (err) {
        if (err.message === null) return;
        console.log(err.message);
        setError(err.message);
      }
    };

    const fetchStats = async () => {
      cancelStatsTokenRef.current = axiosCancelToken.source();

      try {
        setIsStatsLoading(true);
        const response = await axiosInstance.get(`/stats`, {
          cancelToken: cancelStatsTokenRef.current.token,
          // timeout: 10000,
          // onDownloadProgress: ({ total, loaded }) => setLoadedPercents((loaded * 100) / total)
        });

        // Get custom stats for all leagues in selected year
        const customResponse = await fetchCustomStats([0]);
        // const customResponse = await fetchCustomStats(response.data[currentYear].filter(({id}) => id !== null).map(({ id }) => id));

        const statsData = refactorData(response.data);
        const customStatsData = refactorCustomData(customResponse.data);

				console.log(customStatsData)
        setError('');
        dispatch(setStatsData(statsData));
        dispatch(setCustomStatsData(customStatsData));
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
