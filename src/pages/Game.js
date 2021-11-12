import React, { useState, useEffect } from 'react';
import Header from 'components/Game/Header/Header';
import Filters from 'components/Game/Filters/Filters';
import Content from 'components/Game/Content/Content';
import { useSelector, useDispatch } from 'react-redux';
import Loader from 'components/UI/loaders/Loader/Loader';
import ErrorLoader from 'components/UI/loaders/ErrorLoader/ErrorLoader';
import useGameFetch from 'hooks/useGameFetch';

const Game = () => {
  const [situations, setSituations] = useState(['All']);
  const innings = useSelector(state => state.game.innings);
  const dispatch = useDispatch();
  const [error, isLoading, intervalRef, getFullData] = useGameFetch('http://84.201.172.216:3030/game_280');

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
          <Filters situations={situations} />
          <Content setSituations={setSituations} />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Game;
