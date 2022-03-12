import React, { useState, useEffect, useRef } from 'react';
import ErrorLoader from 'components/UI/loaders/ErrorLoader/ErrorLoader';
import Header from 'components/TeamGames/Header/Header';
import Content from 'components/TeamGames/Content/Content';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setGamesAndLeagues } from 'redux/gamesReducer';
import { setCurrentLeague } from 'redux/sharedReducer';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { setTeamData } from 'redux/teamGamesReducer';

const TeamGames = () => {
  // eslint-disable-next-line
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { teamName } = useParams();

  const cancelGamesTokenRef = useRef();
  const cancelTeamTokenRef = useRef();
  const firstMountRef = useRef(true);

  const games = useSelector(state => state.games.games);
  const currentYear = useSelector(state => state.shared.currentYear);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchGamesData = async () => {
      cancelTeamTokenRef.current = axios.CancelToken.source();

      try {
        setIsLoading(true);
        const response = await axios.get(`http://51.250.11.151:3030/team/${teamName}`, {
          cancelToken: cancelTeamTokenRef.current.token,
          timeout: 5000
        });
        console.log(response.data);
        setError('');
        dispatch(setTeamData(response.data));
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
      cancelTeamTokenRef.current.cancel(null);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const fetchGamesData = async () => {
      cancelGamesTokenRef.current = axios.CancelToken.source();

      try {
        setIsLoading(true);
        const response = await axios.get(`http://51.250.11.151:3030/main/year-${currentYear}`, {
          cancelToken: cancelGamesTokenRef.current.token,
          timeout: 5000
        });

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
      cancelGamesTokenRef.current.cancel(null);
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
