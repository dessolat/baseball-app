import React, { useEffect } from 'react';
import Header from 'components/Game/Header/Header';
import Filters from 'components/Game/Filters/Filters';
import Content from 'components/Game/Content/Content';
import { useSelector, useDispatch } from 'react-redux';
import Loader from 'components/UI/loaders/Loader/Loader';
import ErrorLoader from 'components/UI/loaders/ErrorLoader/ErrorLoader';
import useGameFetch from 'hooks/useGameFetch';
import GameIdForm from 'components/Game/GameIdForm/GameIdForm';
import { setCurrentCard, setSituationFilter } from 'redux/gameReducer';

const Game = () => {
  const innings = useSelector(state => state.game.innings);
  const gameId = useSelector(state => state.game.gameId);
  const dispatch = useDispatch();
  const [error, isLoading, cancelTokenRef, intervalRef, getFullData] = useGameFetch(
    'http://84.201.172.216:3030/game_279'
  );
  // const [error, isLoading, intervalRef, getFullData] = useGameFetch('http://192.168.1.3:3001/');
  // const [error, isLoading, cancelTokenRef, intervalRef, getFullData] = useGameFetch('http://localhost:3001/');
  // const [error, isLoading, intervalRef, getFullData] = useGameFetch('https://fierce-harbor-71147.herokuapp.com/');

  useEffect(() => {
    dispatch(getFullData(true));
    return () => {
      // eslint-disable-next-line
      clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (gameId === 0) return;
    typeof cancelTokenRef.current != 'undefined' && cancelTokenRef.current.cancel(null);
    dispatch(setCurrentCard({}));
    dispatch(setSituationFilter('All'));
    clearInterval(intervalRef.current);
    dispatch(getFullData(true, 'http://84.201.172.216:3030/game_' + gameId));
    // eslint-disable-next-line
  }, [gameId]);

  return (
    <>
      <GameIdForm isLoading={isLoading} />
      {error ? (
        <ErrorLoader error={error} />
      ) : isLoading ? (
        <Loader />
      ) : innings.length > 0 ? (
        <>
          <Header />
          <Filters />
          <Content />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Game;
