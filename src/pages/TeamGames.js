import React, { useState, useEffect, useRef } from 'react';
import ErrorLoader from 'components/UI/loaders/ErrorLoader/ErrorLoader';
import Header from 'components/TeamGames/Header/Header';
import Content from 'components/TeamGames/Content/Content';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setCurrentLeague, setGamesAndLeagues } from 'redux/gamesReducer';
import axios from 'axios';

const TeamGames = () => {
	// eslint-disable-next-line
	const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

	const cancelTokenRef = useRef();
	const firstMountRef = useRef(true);

	const games = useSelector(state => state.games.games);
	const currentYear = useSelector(state => state.games.currentYear);
	const dispatch = useDispatch()

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

		if (firstMountRef.current === true) {
      firstMountRef.current = false;
      return;
    }

    dispatch(setCurrentLeague({ id: -1, name: 'All' }));

    return () => {
      cancelTokenRef.current.cancel(null);
    };
		// eslint-disable-next-line
  }, [currentYear]);

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

export default TeamGames;
