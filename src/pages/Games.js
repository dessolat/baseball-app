import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Content from 'components/Games/Content/Content';
import Header from 'components/Games/Header/Header';
import { useSelector, useDispatch } from 'react-redux';
import { addLeagueImage, resetTableFilters, setCurrentLeague, setGamesAndLeagues } from 'redux/gamesReducer';
import ErrorLoader from 'components/UI/loaders/ErrorLoader/ErrorLoader';

const Games = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const cancelTokenRef = useRef();
  const firstMountRef = useRef(true);

  const games = useSelector(state => state.games.games);
  const leagues = useSelector(state => state.games.leagues);
  const currentLeague = useSelector(state => state.games.currentLeague);
  const currentGameType = useSelector(state => state.games.currentGameType);
  const currentYear = useSelector(state => state.games.currentYear);
  const leaguesImages = useSelector(state => state.games.leaguesImages);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchGamesData = async () => {
      cancelTokenRef.current = axios.CancelToken.source();

      try {
        setIsLoading(true);
        const response = await axios.get(`http://51.250.11.151:3030/main/year-${currentYear}`, {
          cancelToken: cancelTokenRef.current.token,
          timeout: 5000
        });
        console.log(response.data);
        setError('');
        dispatch(setGamesAndLeagues(response.data));

        if (games === null) {
          console.log('dispatched after fetching');
          dispatch(setCurrentLeague({ id: -1, name: 'All' }));
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
  }, [currentYear]);

  useEffect(() => {
    if (games === null) return;

    const fetchImage = async (id, url) => {
      try {
        const response = await axios.get(`http://51.250.11.151:3030/logo/${url}`, {
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
  }, [games, leagues]);

  useEffect(() => {
    if (firstMountRef.current === true) return;

    dispatch(resetTableFilters());
  }, [currentGameType, currentYear, currentLeague]);

  useEffect(() => {
    if (firstMountRef.current === true) {
      firstMountRef.current = false;
      return;
    }

    dispatch(setCurrentLeague({ id: -1, name: 'All' }));
  }, [currentGameType, currentYear]);

  return (
    <>
      {/* {isLoading ? (
        <Loader />
      ) :  */}
      {error && games === null ? (
        <ErrorLoader error={error} />
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
