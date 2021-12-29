import React, { useEffect } from 'react';
import Header from 'components/Game/Header/Header';
import Filters from 'components/Game/Filters/Filters';
import Content from 'components/Game/Content/Content';
import { useSelector, useDispatch } from 'react-redux';
import Loader from 'components/UI/loaders/Loader/Loader';
import ErrorLoader from 'components/UI/loaders/ErrorLoader/ErrorLoader';
import useGameFetch from 'hooks/useGameFetch';
import GameIdForm from 'components/Game/GameIdForm/GameIdForm';
import { setCurrentCard, setSituationFilter, setCurrentGameId } from 'redux/gameReducer';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { StringParam, useQueryParam } from 'use-query-params';
import Skeleton from 'components/Game/Skeleton/Skeleton';

const Game = () => {
  const [tab] = useQueryParam('tab', StringParam)
  const { gameId } = useParams();
  const navigate = useNavigate();
  const innings = useSelector(state => state.game.innings);
  const currentGameId = useSelector(state => state.game.currentGameId);
  const dispatch = useDispatch();
  const [error, isLoading, cancelTokenRef, intervalRef, getFullData] = useGameFetch(
    `http://51.250.11.151:3030/game_${gameId}`
  );
  // const [error, isLoading, intervalRef, getFullData] = useGameFetch('http://192.168.1.3:3001/');
  // const [error, isLoading, cancelTokenRef, intervalRef, getFullData] = useGameFetch('http://localhost:3001/');
  // const [error, isLoading, intervalRef, getFullData] = useGameFetch('https://fierce-harbor-71147.herokuapp.com/');

  useEffect(() => {
    axios
      .get(`http://51.250.11.151:3030/game_${gameId}`, {
        timeout: 2500
      })
      .then(() => {
        dispatch(getFullData(true));
        dispatch(setCurrentGameId(gameId));
      })
      .catch(() => {
        dispatch(setCurrentGameId(gameId));
        navigate('/game/359');
      });

    return () => {
      // eslint-disable-next-line
      clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (currentGameId === null) return;

    typeof cancelTokenRef.current != 'undefined' && cancelTokenRef.current.cancel(null);
    dispatch(setCurrentCard({}));
    dispatch(setCurrentGameId(gameId));
    dispatch(setSituationFilter('All'));
    clearInterval(intervalRef.current);
    dispatch(getFullData(true, 'http://51.250.11.151:3030/game_' + gameId));
    // eslint-disable-next-line
  }, [gameId]);

  return (
    <>
      <GameIdForm isLoading={isLoading} />
      {/* <Link to='/game/350'>to game number 350</Link>
      <Link to='/game/351'>to game number 351</Link>
      <Link to='/game/359'>to game number 359</Link> */}
      {error ? (
        <ErrorLoader error={error} />
      ) : isLoading ? (
        <Loader />
				// <Skeleton />
      ) : innings.length > 0 ? (
        <>
          <Header />
          {tab !== 'lineup' && <Filters />}
          <Content />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Game;
