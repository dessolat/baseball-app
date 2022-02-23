import React, { useState, useEffect, useRef } from 'react';
// import cl from './Games.module.scss';
import axios from 'axios';
import Content from 'components/Games/Content/Content';
import Header from 'components/Games/Header/Header';
// import Loader from 'components/UI/loaders/Loader/Loader';
import { useSelector, useDispatch } from 'react-redux';
import { addLeagueImage, setCurrentLeague, setGamesAndLeagues } from 'redux/gamesReducer';
import ErrorLoader from 'components/UI/loaders/ErrorLoader/ErrorLoader';

const LEAGUES = [
  { id: 1, name: 'All' },
  { id: 2, name: 'Pervenstvo Russian Unior (19 years)' },
  { id: 3, name: 'Russian championship' },
  { id: 4, name: 'Russian championship' },
  { id: 5, name: 'Russian championship' },
  { id: 6, name: 'Russian championship' },
  { id: 7, name: 'Russian championship' },
  { id: 8, name: 'Russian championship' },
  { id: 9, name: 'Russian championship' }
];

const Games = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const cancelTokenRef = useRef();
	
	const games = useSelector(state => state.games.games)
	const leagues = useSelector(state => state.games.leagues)
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
				setError('')
        dispatch(setGamesAndLeagues(response.data));
        // setGamesData(response.data);
        dispatch(setCurrentLeague({ id: -1, name: 'All' }));
      } catch (err) {
				if (err.message === null) return
        console.log(err.message);
				setError(err.message)
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
    if (games.length === 0) return;

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

  return (
    <>
      {/* {isLoading ? (
        <Loader />
      ) :  */}
      {error ? (
        <ErrorLoader error={error} />
      ) : games.length === 0 ? (
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
