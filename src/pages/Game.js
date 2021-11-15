import React, { useEffect } from 'react';
import Header from 'components/Game/Header/Header';
import Filters from 'components/Game/Filters/Filters';
import Content from 'components/Game/Content/Content';
import { useSelector, useDispatch } from 'react-redux';
import Loader from 'components/UI/loaders/Loader/Loader';
import ErrorLoader from 'components/UI/loaders/ErrorLoader/ErrorLoader';
import useGameFetch from 'hooks/useGameFetch';

const Game = () => {
  const innings = useSelector(state => state.game.innings);
  const dispatch = useDispatch();
  // const [error, isLoading, intervalRef, getFullData] = useGameFetch('http://84.201.172.216:3030/game_280');
  // const [error, isLoading, intervalRef, getFullData] = useGameFetch('http://192.168.1.5:3001/');
  // const [error, isLoading, intervalRef, getFullData] = useGameFetch('http://localhost:3001/');
  const [error, isLoading, intervalRef, getFullData] = useGameFetch('https://fierce-harbor-71147.herokuapp.com/');

  useEffect(() => {
    const interval = intervalRef.current;
    dispatch(getFullData(true));

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
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
