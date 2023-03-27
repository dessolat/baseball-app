import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Content from 'components/Games/Content/Content';
import Header from 'components/Games/Header/Header';
import { useSelector, useDispatch } from 'react-redux';
import {
  // addLeagueImage,
  resetTableFilters,
  setGamesAndLeagues,
  setMobileTableMode
} from 'redux/gamesReducer';
import { setCurrentLeague } from 'redux/gamesReducer';
import ErrorLoader from 'components/UI/loaders/ErrorLoader/ErrorLoader';
import Loader from 'components/UI/loaders/Loader/Loader';
import { getSearchParam, getYears, setSearchParam } from 'utils';
import { setCurrentGameType, setCurrentYear } from 'redux/sharedReducer';
import { GamesLoadingContext } from 'context';

const Games = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const cancelTokenRef = useRef();
  const firstMountRef = useRef(true);

  const games = useSelector(state => state.games.games);
  // const leagues = useSelector(state => state.games.leagues);
  const currentLeague = useSelector(state => state.games.currentLeague);
  const mobileTableMode = useSelector(state => state.games.mobileTableMode);
  const currentGameType = useSelector(state => state.shared.currentGameType);
  const currentYear = useSelector(state => state.shared.currentYear);
  // const leaguesImages = useSelector(state => state.games.leaguesImages);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentLeague.id !== -1) {
      const paramsArray = [
        { param: 'year', value: currentYear },
        { param: 'mode', value: mobileTableMode },
        { param: 'league_id', value: currentLeague.id }
      ];
      setSearchParam(paramsArray);
    }

    getSearchParam('mode') && dispatch(setMobileTableMode(getSearchParam('mode')));
    getSearchParam('game_type') && dispatch(setCurrentGameType(getSearchParam('game_type')));

    const fetchGamesData = async () => {
      cancelTokenRef.current = axios.CancelToken.source();

      try {
        setIsLoading(true);
        const response = await axios.get(
          `http://baseball-gametrack.ru/api/main/year-${getSearchParam('year') || currentYear}`,
          {
            cancelToken: cancelTokenRef.current.token,
            timeout: 10000
          }
        );

        setError('');
        dispatch(setGamesAndLeagues(response.data));

        if (games === null) {
          console.log('dispatched after fetching');
          // dispatch(setCurrentLeague({ id: -1, name: 'All' }));
        }

        if (getSearchParam('year')) {
          const yearsArr = getYears();
          yearsArr.includes(+getSearchParam('year')) && dispatch(setCurrentYear(+getSearchParam('year')));
        }

        if (getSearchParam('league_id')) {
          const tempLeague = response.data.leagues.find(league => league.id === +getSearchParam('league_id'));
          tempLeague && dispatch(setCurrentGameType(tempLeague.game_type));
          setTimeout(() => tempLeague && dispatch(setCurrentLeague(tempLeague)));
        }
      } catch (err) {
        if (err.message === null) return;
        console.log(err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGamesData();

    return () => {
      cancelTokenRef.current.cancel(null);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (firstMountRef.current === true) {
      return;
    }

    const fetchGamesData = async () => {
      cancelTokenRef.current = axios.CancelToken.source();

      try {
        setIsLoading(true);
        const response = await axios.get(`http://baseball-gametrack.ru/api/main/year-${currentYear}`, {
          cancelToken: cancelTokenRef.current.token,
          timeout: 10000
        });

        setError('');
        dispatch(setGamesAndLeagues(response.data));

        if (games === null) {
          console.log('dispatched after fetching');
          // dispatch(setCurrentLeague({ id: -1, name: 'All' }));
        }
      } catch (err) {
        if (err.message === null) return;
        console.log(err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGamesData();

    return () => {
      cancelTokenRef.current.cancel(null);
    };
    // eslint-disable-next-line
  }, [currentYear]);

  // useEffect(() => {
  //   if (games === null) return;

  //   const fetchImage = async (id, name, url) => {
  //     try {
  //       const response = await axios.get(`http://baseball-gametrack.ru/api/logo/${url}`, {
  //         responseType: 'arraybuffer',
  //         timeout: 2500
  //       });

  //       dispatch(
  //         addLeagueImage({
  //           [id]: 'data:image/jpg;base64, ' + Buffer.from(response.data, 'binary').toString('base64'),
  //           [name]: 'data:image/jpg;base64, ' + Buffer.from(response.data, 'binary').toString('base64')
  //         })
  //       );
  //     } catch (err) {
  //       // err.message === 'Request failed with status code 523' &&
  //       setTimeout(() => fetchImage(id, name, url), 2500);
  //       console.log(err.message);
  //     }
  //   };

  //   leagues
  //     .filter(league => league.logo !== '' && !leaguesImages[league.id])
  //     .forEach(league => league.id !== -1 && fetchImage(league.id, league.name, league.logo));
  //   // eslint-disable-next-line
  // }, [games, leagues]);

  useEffect(() => {
    if (firstMountRef.current === true) {
      return;
    }

    dispatch(resetTableFilters());
    // eslint-disable-next-line
  }, [currentGameType, currentYear, currentLeague]);

  useEffect(() => {
    if (firstMountRef.current === true) {
      firstMountRef.current = false;
      return;
    }

    // dispatch(setCurrentLeague({ id: -1, name: 'All' }));
    // dispatch(setMobileTableMode('Calendar'));
    // eslint-disable-next-line
  }, [currentGameType, currentYear]);

  const contentLoaderStyles = {
    margin: 'unset',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)'
  };

  const { Provider } = GamesLoadingContext;

  if (error !== '') return <ErrorLoader error={error} />;

  return (
    <>
      <Provider value={isLoading}>
        <Header />
      </Provider>
      {isLoading ? <Loader styles={contentLoaderStyles} /> : <Content games={games} />}
    </>
  );
};

export default Games;
