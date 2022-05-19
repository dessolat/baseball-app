import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Content from 'components/Games/Content/Content';
import Header from 'components/Games/Header/Header';
import { useSelector, useDispatch } from 'react-redux';
import { addLeagueImage, resetTableFilters, setGamesAndLeagues, setMobileTableMode } from 'redux/gamesReducer';
import { setCurrentLeague } from 'redux/gamesReducer';
import ErrorLoader from 'components/UI/loaders/ErrorLoader/ErrorLoader';
import Loader from 'components/UI/loaders/Loader/Loader';

const Games = () => {
  // eslint-disable-next-line
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const cancelTokenRef = useRef();
  const firstMountRef = useRef(true);

  const games = useSelector(state => state.games.games);
  const leagues = useSelector(state => state.games.leagues);
  const currentLeague = useSelector(state => state.games.currentLeague);
  const currentGameType = useSelector(state => state.shared.currentGameType);
  const currentYear = useSelector(state => state.shared.currentYear);
  const leaguesImages = useSelector(state => state.games.leaguesImages);
  const dispatch = useDispatch();

	// eslint-disable-next-line
  // useEffect(() => () => dispatch(setGamesAndLeagues({ games: null, leagues: null })), []);

  useEffect(() => {
    const fetchGamesData = async () => {
      cancelTokenRef.current = axios.CancelToken.source();

      try {
        setIsLoading(true);
        const response = await axios.get(`http://51.250.71.224:3030/main/year-${currentYear}`, {
          cancelToken: cancelTokenRef.current.token,
          timeout: 5000
        });
        console.log(response.data);
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

  useEffect(() => {
    if (games === null) return;

    const fetchImage = async (id, url) => {
      try {
        const response = await axios.get(`http://51.250.71.224:3030/logo/${url}`, {
          responseType: 'arraybuffer',
          timeout: 2500
        });

        dispatch(
          addLeagueImage({
            [id]: 'data:image/jpg;base64, ' + Buffer.from(response.data, 'binary').toString('base64')
          })
        );
      } catch (err) {
        // err.message === 'Request failed with status code 523' &&
        setTimeout(() => fetchImage(id, url), 2500);
        console.log(err.message);
      }
    };

    leagues
      .filter(league => league.logo !== '' && !leaguesImages[league.id])
      .forEach(league => fetchImage(league.id, league.logo));
    // eslint-disable-next-line
  }, [games, leagues]);

  useEffect(() => {
    // if (firstMountRef.current === true) return;
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

    dispatch(setCurrentLeague({ id: -1, name: 'All' }));
		dispatch(setMobileTableMode('Calendar'))
    // eslint-disable-next-line
  }, [currentGameType, currentYear]);
  return (
    <>
      {error !== '' ? (
        <ErrorLoader error={error} />
      ) : isLoading && games === null ? (
        <Loader />
      ) : games === null ? (
        <></>
      ) : (
        <>
          <Header />
          <Content games={games} />
        </>
      )}
    </>
  );
};

export default Games;
